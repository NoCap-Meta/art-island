import {createContext, useState, useContext as useCon} from 'react'

const Context = createContext()

//provider
export const ContextProvider = ({children}) => {
  const [activeModal, setActiveModal] = useState({
    google: false,
    wallet:false,
    kyc:false,
  })
  return (
    <Context.Provider value={{
      activeModal,
      setActiveModal
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

