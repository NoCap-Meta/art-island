import { web3, ethersProvider } from "@/pages/_app"
import { NoCapVoucher } from "@/utils/Extras/NoCapVoucher"
import axios from "axios"
import { verifyUser } from './verifyUser';

export const handleBuyNFTUser = async (item, getItems, setStatus, setUser, user, fractions) => {
  setStatus('Deploying...')
  console.log(item, item.is)
  if (item && (item.tokenBuyed === item.fractions)) {
    setStatus('Sold Out')
    return
  }
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const accounts = await web3.eth.getAccounts()
  if (!accounts || accounts.length === 0) {
    return
  }
  const account = accounts[0]
  const voucher = item.voucher

  await verifyUser(account)

  //get total amount
  const { data: totalAmountData } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/items/calculate-total-amount`, {
    voucher,
    isPrimary: item.isRelist ? false : true,
    fractions
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
    fractions,
    isPrimary: item.isRelist ? false : true,
    currency: '0x0000000000000000000000000000000000000001',
    buyer: account
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
          transaction: {
            transactionHash: signed,
            price: item.pricePerFraction,
            to: item.deployedCollectionAddress,
            type: 'Buy Item',
            date: new Date().toISOString(),
            from: accounts[0],
          }
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        console.log(user)
        const { data: updatedUser } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/update/me`, {
          boughtItems: [...user.boughtItems, item._id]
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (updatedUser?.success) {
          setUser()
        }

        const { data: updateTransaction } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/update/me`, {
          transaction: {
            transactionHash: signed,
            price: item.pricePerFraction,
            to: item.deployedCollectionAddress,
            type: 'Buy Item',
            date: new Date().toISOString(),
            from: accounts[0],
          }
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