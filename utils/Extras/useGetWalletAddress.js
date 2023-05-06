import { useEffect, useState, useCallback } from 'react';
import { web3 } from '../../pages/_app';
import { useContext } from '../Context'
import { changeToMumbaiPolygonTestnet } from '@/utils/Extras/checkChain';

export const useGetWalletAddress = () => {
    const { activeModal, setActiveModal } = useContext()
    const [walletAddress, setWalletAddress] = useState(null)

    //using useMemo in getWalletAddress
    const getWalletAddress = useCallback(async () => {
        if (!window.ethereum) {
            setActiveModal({
                ...activeModal,
                wallet: true
            })
            return
        }
        await changeToMumbaiPolygonTestnet()
        await window.ethereum.request({ method: 'eth_requestAccounts' });
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

//check windows.ethereum
export const useCheckMetamask = () => {
    const { activeModal, setActiveModal } = useContext()

    // useEffect(() => {
    //     if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    //         setIsMetamask(true)
    //         setActiveModal({
    //             ...activeModal,
    //             wallet: true
    //         })
    //     }
    // }, [])

    const checkMetamask = async () => {
        if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
            return true
        }
        setActiveModal({
            ...activeModal,
            wallet: true
        })
        return false

    }



    return { checkMetamask }
}
