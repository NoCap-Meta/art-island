import { web3, ethersProvider } from "@/pages/_app"
import axios from "axios"

export const verifyUser = async (address) => {
  const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user/verify-identity`, {
    address
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })

  if (data.success) {
    if (data.isVerified) {
      return true
    } else {
      const { txObject } = data
      const signed = await await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [txObject],
      });
      return true
    }
  }
}