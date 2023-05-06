import { web3, ethersProvider } from "@/pages/_app"
import { NoCapVoucher } from "@/utils/Extras/NoCapVoucher"
import axios from "axios"
import { verifyUser } from './verifyUser';
import { changeToMumbaiPolygonTestnet } from '@/utils/Extras/checkChain';

export const handleReList = async (item, getItems, setStatus, fractionsToList) => {
  setStatus('Deploying...')
  if (!item.vouchers[0]) {
    return
  }

  item.voucher = item.vouchers[0]



  await changeToMumbaiPolygonTestnet()
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const accounts = await web3.eth.getAccounts()
  if (!accounts || accounts.length === 0) {
    return
  }
  const account = accounts[0]

  await verifyUser(account)

  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items/get-contract-instance`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })

  let contract = null

  if (data.success) {
    contract = data.noCapFactoryContract
  }

  const signer = await ethersProvider.getSigner()

  const newVoucher = new NoCapVoucher({
    _contract: contract,
    _signer: signer
  })





  const voucher = await newVoucher.createVoucher(account, item.voucher.NFTAddress, item.voucher.tokenId, 1, +fractionsToList * (10 ** 18), false, item.voucher.royaltyKeeper, +item.voucher.royaltyFees, item.voucher.tokenURI)

  const { data: verifyData } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/items/verify-voucher`, {
    voucher
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })

  if (verifyData.success && verifyData.isValid !== account) {
    return
  }


  const { data: alreadyBuyer } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/relist/buy/price/${fractionsToList}/${item._id}`, {})
  if (alreadyBuyer.success) {
    if (alreadyBuyer.relists.length > 0) {
      const relists = alreadyBuyer.relists
      const { data: bid } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/items/bid-transfer`, {
        voucher,
        bidder: alreadyBuyer.relists[0].bidderAddress,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }

      })

      if (!bid.success) {
        return
      }

      const { txObject } = bid

      const signed = await await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [txObject],
      });

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
        id: relists?.[0]?.createrId
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      const { data: deleteRelist } = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/relist/${relists?.[0]?._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

    }
  }



  const { data: relistData } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/items/item/${item._id}`, {
    voucher
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })

  const { data: addRelist } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/relist`, {
    itemId: item._id,
    voucherId: voucher.signature,
    tokenId: voucher.tokenId,
    price: +fractionsToList,
    status: 0,
    transactionType: 'sell'
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })

  const { data: updateTransaction } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/update/me`, {
    transaction: {
      transactionHash: voucher.signature,
      price: item.pricePerFraction,
      to: item.deployedCollectionAddress,
      type: 'Secondary Market Listing',
      date: new Date().toISOString(),
      from: accounts[0],
    }
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })

  if (relistData.success) {
    getItems()
  }



}
