import { web3, ethersProvider } from "@/pages/_app"
import { NoCapVoucher } from "@/utils/Extras/NoCapVoucher"
import axios from "axios"

export const handleBuyNFTUser = async (item, getItems, setStatus) => {
  setStatus('Deploying...')
  if (item && (item.tokenBuyed === item.fractions)) {
    setStatus('Sold Out')
    return
  }
  const accounts = await web3.eth.getAccounts()
  if (!accounts || accounts.length === 0) {
    return
  }
  const account = accounts[0]

  const voucher = item.voucher

  //get total amount
  const { data: totalAmountData } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/items/calculate-total-amount`, {
    voucher,
    isPrimary: true,
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })

  if (totalAmountData.success) {
    console.log(totalAmountData)
  } else {
    return
  }


  const { data: buyData } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/items/buy-nft`, {
    value: web3.utils.fromWei(totalAmountData.totalAmount[1], 'ether'),
    voucher,
    isPrimary: true,
    currency: '0x0000000000000000000000000000000000000001'
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })

  if (buyData.success) {
    const { txObject } = buyData
    txObject.value = `${txObject.value}`
    console.log(txObject)

    const signed = await await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txObject],
    });


    let receipt = null;
    while (receipt === null) {
      receipt = await window.ethereum.request({
        method: 'eth_getTransactionReceipt',
        params: [signed],
      });

      // Wait for 1 second before trying again
      await new Promise(resolve => setTimeout(resolve, 1000));
    }


    if (receipt) {
      const deployedItemAddress = receipt?.logs?.[3]?.address


      if (signed) {
        const { data } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/items/item/${item._id}`, {
          tokenBuyed: item.tokenBuyed + 1,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        if (data.success) {
          setStatus('Purchased')
          getItems()
        }
      }

    }

  }

}