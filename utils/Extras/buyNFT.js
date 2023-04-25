import { web3, ethersProvider } from "@/pages/_app"
import { NoCapVoucher } from "@/utils/Extras/NoCapVoucher"
import axios from "axios"

export const handleBuyPrimaryNFT = async (item, getItems, setStatus) => {
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



  const voucher = await newVoucher.createVoucher(account, item.deployedCollectionAddress, 12, item.maxFractions, item.fractions, item.pricePerFraction * (10 ** 18), true, account, +item.royalty * 100, item.ipfsLink || item.ipfsLink || ipfsLink.url)

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

  //get total amount
  const { data: totalAmountData } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/items/calculate-total-amount`, {
    voucher,
    isPrimary: item.tokenBuyed ? false : true,
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
    isPrimary: item.tokenBuyed ? false : true,
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
          deployedItemAddress,
          isDeployed: true,
          tokenBuyed: 1,
          ipfsLink: item.ipfsLink || ipfsLink.url
        }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })

        if (data.success) {
          setStatus('Deployed')
          getItems()
        }
      }

    }

  }

}