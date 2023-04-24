import { useEffect, useState, useCallback } from 'react';
import { web3 } from '../../pages/_app';
import { useContext } from '../Context'

export const useGetWalletAddress = () => {
    const { activeModal, setActiveModal } = useContext()
    const [walletAddress, setWalletAddress] = useState(null)

    //using useMemo in getWalletAddress
    const getWalletAddress = useCallback(async () => {
        const accounts = await web3.eth.getAccounts()
        const authToken = localStorage.getItem('token')
        if (!authToken) {
            setActiveModal({
                ...activeModal,
                google: true
            })
            return
        }
        if (!accounts || accounts.length === 0) {
            setActiveModal({
                ...activeModal,
                wallet: true
            })
        } else {
            setWalletAddress(accounts[0])
        }
    }, [])


    useEffect(() => {
        getWalletAddress()
    })

    return { walletAddress }

}
