import {createContext, useState, useContext as useCon, useEffect} from 'react'
import jwt_decode from "jwt-decode";
const Context = createContext()

//provider
export const ContextProvider = ({children}) => {
  const [activeModal, setActiveModal] = useState({
    google: false,
    wallet:false,
    kyc:false,
  })

  const [authToken, setAuthToken] = useState('')
  const [user, setUser] = useState({})

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(token){
      setAuthToken(token)
      const decoded = jwt_decode(token)
      setUser(decoded?.user)
    }
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

