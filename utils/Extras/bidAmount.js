import { web3, ethersProvider } from "@/pages/_app"
import { NoCapVoucher } from "@/utils/Extras/NoCapVoucher"
import axios from "axios"
import { verifyUser } from './verifyUser';
import { changeToMumbaiPolygonTestnet } from '@/utils/Extras/checkChain';

export const bidAmount = async (setStatus, amount, closeModal, item) => {

  setStatus('Bidding...')
  await changeToMumbaiPolygonTestnet()
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  const accounts = await web3.eth.getAccounts()
  if (!accounts || accounts.length === 0) {
    return
  }
  const account = accounts[0]

  await verifyUser(account)

  const { data: deposit } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/items/deposit-amount`, {
    amount: (amount).toFixed(6),
    account
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })

  if (!deposit.success) {
    alert('Deposit failed')
    return
  }

  const { txObject } = deposit

  //send
  const signed = await await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [txObject],
  });

  const { data: approve } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/items/approve-amount`, {
    account,
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })

  if (!approve.success) {
    alert('Approve failed')
    return
  }

  const { txObject: approveTxObject } = approve

  //send
  const signedApprove = await await window.ethereum.request({
    method: 'eth_sendTransaction',
    params: [approveTxObject],
  });

  //reciept of transactions
  let depositReceipt = null
  while (depositReceipt === null) {
    depositReceipt = await web3.eth.getTransactionReceipt(signed)
  }

  let approveReceipt = null
  while (approveReceipt === null) {
    approveReceipt = await web3.eth.getTransactionReceipt(signedApprove)
  }

  console.log(depositReceipt, approveReceipt)

  setStatus('Bidded successfully')

  const { data: addRelist } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/relist`, {
    itemId: item._id,
    price: amount,
    status: 0,
    transactionType: 'buy',
    bidderAddress: account
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })

  setTimeout(() => {
    closeModal()
  }
    , 1000)

}