import {createContext, useState, useContext as useCon, useEffect} from 'react'
import { web3 } from '@/pages/_app';
import jwt_decode from "jwt-decode";
import { useCheckMetamask } from '@/utils/Extras/useGetWalletAddress';
import { changeToMumbaiPolygonTestnet } from '@/utils/Extras/checkChain';
const Context = createContext()

//provider
export const ContextProvider = ({children}) => {
  const [activeModal, setActiveModal] = useState({
    google: false,
    wallet:false,
    kyc:false,
  })

  const [authToken, setAuthToken] = useState('')
  const [user, setUser] = useState(null)

  useEffect(()=>{
   
    const check = async()=>{
      const token = localStorage.getItem('token')
      if(token){
        setAuthToken(token)
        const decoded = jwt_decode(token)
        setUser(decoded?.user)
        if(window && window.ethereum){
          await changeToMumbaiPolygonTestnet()
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const accounts = await web3.eth.getAccounts()
          //if no accounts
          if(!accounts || accounts.length === 0){
            setActiveModal({
              ...activeModal,
              wallet: true
            })
          }else if(accounts.length>0){
            //localstore get kyc
            const kyc = localStorage.getItem('kyc')
            if(!kyc){
              setActiveModal({
                ...activeModal,
                kyc: true
              })
            }
          }
        }
      }
      
    }

    check()

  },[])

  return (
    <Context.Provider value={{
      activeModal,
      setActiveModal,
      authToken,
      setAuthToken,
      user,
      setUser
    }}>
      {children}
    </Context.Provider>
  )
}

//hook to use context
export const useContext = () => {
  return useCon(Context)
}


export default Context

