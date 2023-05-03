import { web3, ethersProvider } from "@/pages/_app"
import { NoCapVoucher } from "@/utils/Extras/NoCapVoucher"
import axios from "axios"

export const handleReList = async (item, getItems, setStatus, fractionsToList) => {
  setStatus('Deploying...')
  if (!item.voucher) {
    return
  }




  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const accounts = await web3.eth.getAccounts()
  if (!accounts || accounts.length === 0) {
    return
  }
  const account = accounts[0]
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





  const voucher = await newVoucher.createVoucher(account, item.voucher.NFTAddress, item.voucher.tokenId, +fractionsToList, item.pricePerFraction * (10 ** 18), false, item.voucher.royaltyKeeper, +item.voucher.royaltyFees, item.voucher.tokenURI)

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

  const { data: relistData } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/items/item`, {
    ...item,
    isRelist: true,
    isDeployed: true,
    isApproved: true,
    maxFractions: +fractionsToList,
    voucher,
    transaction: {
      transactionHash: voucher.signature,
      price: item.pricePerFraction,
      to: item.deployedCollectionAddress,
      type: 'Relist Item',
      date: new Date().toISOString(),
      from: accounts[0],

    }
  },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

  const { data: updateTransaction } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/update/me`, {
    transaction: {
      transactionHash: voucher.signature,
      price: item.pricePerFraction,
      to: item.deployedCollectionAddress,
      type: 'Relist Item',
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
