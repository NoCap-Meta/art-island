import { web3, ethersProvider } from "@/pages/_app"
import { NoCapVoucher } from "@/utils/Extras/NoCapVoucher"
import axios from "axios"
import { verifyUser } from './verifyUser';
import { changeToMumbaiPolygonTestnet } from '@/utils/Extras/checkChain';

export const handleBuyPrimaryNFT = async (item, getItems, setStatus) => {
  setStatus('Deploying...')
  if (item && (item.tokenBuyed === item.maxFractions)) {
    setStatus('Sold Out')
    return
  }
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

  let ipfsLink = null

  if (!item.ipfsLink) {
    const { data: ipfs } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload/upload-s3-to-ipfs`, {
      imageUrl: item.image
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    if (!ipfs.url) {
      return
    } else {
      ipfsLink = ipfs
    }
  }



  const voucher = await newVoucher.createVoucher(account, item.deployedCollectionAddress, +item.tokenId, item.maxFractions, item.pricePerFraction * (10 ** 18), true, item.royaltyKeeper, +item.royalty * 100, item.ipfsLink || ipfsLink.url)

  console.log(voucher)

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

  const { data: signedItem } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/items/item/${item._id}`, {
    isDeployed: true,
    ipfsLink: item.ipfsLink || ipfsLink.url,
    voucher,
    signature: voucher.signature,
    tokenBuyed: 0,
    transaction: {
      price: item.pricePerFraction,
      to: item.deployedCollectionAddress,
      type: 'Sign Primary NFT',
      date: new Date().toISOString(),
      from: accounts[0],
    }
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })

  const { data: updateTransaction } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/update/me`, {
    transaction: {
      price: item.pricePerFraction,
      to: item.deployedCollectionAddress,
      type: 'Sign Item',
      date: new Date().toISOString(),
      from: accounts[0],
    }
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })

  if (signedItem.success) {
    setStatus('Deployed')
    getItems()
  }



}
