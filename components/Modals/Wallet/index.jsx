import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import {MagnetLight, MagnetMedium} from 'pages/_app.js'
import { useContext } from '@/utils/Context'
import ModalNavigation from '../ModalNavigation'
import { useEffect } from 'react';
import { web3 } from 'pages/_app.js'
import { Store } from '@/utils'

const {useWalletStore} = Store

export default function Wallet() {
  const {activeModal, setActiveModal, user} = useContext()
  const isOpen = activeModal.wallet
  const {walletAddress, setWalletAddress} = useWalletStore()
  const [connectionStatus, setConnectionStatus] = useState('unavailable')


  function closeModal() {
    setActiveModal({
      google: false,
      wallet: false,
      kyc: false
    })
  }

  useEffect(()=>{
    setConnectionStatus(window.ethereum ? 'notConnected' : 'unavailable')
  },[])

  const connectToMetamask = async () => {
    try {
      if (!window.ethereum) {
        setConnectionStatus('unavailable'); 
        return;
      }
      setConnectionStatus('connecting'); 
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      await window.ethereum.enable();
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
        setTimeout(()=>{
          setActiveModal({
            google: false,
            wallet: false,
            kyc: true
          })
        },1000)
        setConnectionStatus('connected'); 
      } else {
        setConnectionStatus('unavailable'); 
      }
    } catch (error) {
      console.error(error);
      setConnectionStatus('unavailable');
    }
  };
  

  const handleClick = () => {
    if (connectionStatus === 'notConnected') {
      connectToMetamask();
    }
    if(connectionStatus ==='unavailable'){
      window.open('https://metamask.io/download.html', '_blank');
    }

  };



  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" transform overflow-hidden bg-[#F5DFC2] justify-between flex flex-col items-center h-[75vh] w-[70vw] p-6 text-left align-middle shadow-xl transition-all">
                    <div className='flex flex-col items-center '>
                      <ModalNavigation/>
                      <div className='w-[80%] mt-[23px] flex items-center flex-col'>
                        <p className={`${MagnetLight.className} text-[72px] leading-[91px] text-center`}>
                          Connect Your Wallet with us
                        </p>
                      </div>
                    </div>
                    <div className='mb-[74px]'>
                    <div onClick={handleClick} className='h-[52px] cursor-pointer w-[247px] flex items-center gap-[8px] justify-center bg-black rounded-xl'>
                        {connectionStatus==='notConnected'&&<img className='h-[32px] w-[32px]' src='Images/SVG/Plus.svg' />}
                        <p className={`${MagnetMedium.className} text-[18px] leading-[23px] text-white`}>
                          {
                            connectionStatus === 'connected' && walletAddress?.slice(0, 8) + '...' + walletAddress?.slice(-4)
                          }
                          {
                            connectionStatus === 'notConnected' && 'Connect Wallet'
                          }
                          {
                            connectionStatus === 'connecting' && 'Connecting...'
                          }
                          {
                            connectionStatus === 'unavailable' && 'Install Metamask'
                          }
                          {
                            connectionStatus === 'initializing' && 'Please wait...'
                          }
                        </p>
                      </div>
                    </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
