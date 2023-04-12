import { useRouter } from "next/router";
import { useContext } from 'utils/Context/index.jsx'
import jwt_decode from "jwt-decode";
import { useEffect } from 'react';
import { Store } from "@/utils";

const {useWalletStore, useUserStore} = Store

const AuthChecker = ({children}) => {
  const router = useRouter()
  const {setWalletAddress} = useWalletStore()
  const { setAuthToken, setUser, setActiveModal, } = useContext()
  const {setUser:setSettingsUser} = useUserStore()

  if (router.query?.token) {
    setAuthToken(router.query.token)
    localStorage.setItem('token', router.query.token)
    const decoded = jwt_decode(router.query.token)
    setUser(decoded?.user)
    router.push('/')
    setActiveModal({
      google: false,
      wallet: true,
      kyc: false
    })
    setSettingsUser()
  }

  useEffect(()=>{
    if (localStorage.getItem('token')) {
      const decoded = jwt_decode(localStorage.getItem('token'))
      setWalletAddress()
      //check the expiry date
      if (decoded.exp < Date.now() / 1000) {
        localStorage.removeItem('token')
        setAuthToken(null)
        setUser(null)
      }else{
        setSettingsUser()
      }
    }
  },[])

  return (
    <>
    {children}
    </>
  )
}

export default AuthChecker