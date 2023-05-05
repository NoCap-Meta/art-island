import { web3, ethersProvider } from "@/pages/_app"
import { NoCapVoucher } from "@/utils/Extras/NoCapVoucher"
import axios from "axios"
import { verifyUser } from './verifyUser';

export const buyRelistToken = async (item, getItems, setStatus, setUser, user, voucher, value) => {
  setStatus('Buying...')
  console.log(item, item.is)

  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const accounts = await web3.eth.getAccounts()
  if (!accounts || accounts.length === 0) {
    return
  }
  const account = accounts[0]
  console.log(item.vouchers)

  await verifyUser(account)

  //get total amount
  const { data: totalAmountData } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/items/calculate-total-amount`, {
    voucher,
    isPrimary: false,
    fractions: 1,
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
    fractions: 1,
    isPrimary: false,
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
          transaction: {
            transactionHash: signed,
            price: item.pricePerFraction,
            to: item.deployedCollectionAddress,
            type: 'Secondary Market Purchase',
            date: new Date().toISOString(),
            from: accounts[0]
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
            type: 'Secondary Market Purchase',
            date: new Date().toISOString(),
            from: accounts[0],
          }
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        const { data: removeData } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/remove-bought-item`, {
          itemId: item._id,
          id: value?.[0]?.createrId
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        const { data: deleteRelist } = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/relist/${value?.[0]?._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        const { data: deleteVoucher } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/items/remove-voucher/${item._id}`, {
          signature: value?.[0]?.voucherId,
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        if (data.success) {
          setStatus('Complete')
          getItems()
        }
      }

    }

  }

}