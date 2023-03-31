import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import {MagnetLight, MagnetMedium} from 'pages/_app.js'
import { useContext } from '@/utils/Context'
import ModalNavigation from '../ModalNavigation'
import { useMetaMask } from "metamask-react";
import { useEffect } from 'react';
import axios from 'axios'

export default function Wallet() {
  const {activeModal, setActiveModal, user} = useContext()
  const isOpen = activeModal.wallet
  const {account,connect,status} = useMetaMask();
  const [walletAddress, setWalletAddress] = useState(null)


  function closeModal() {
    setActiveModal({
      google: false,
      wallet: false,
      kyc: false
    })
  }

  const handleClick = () => {
    if (status === 'notConnected') {
      connect();
    }
    if(status ==='unavailable'){
      window.open('https://metamask.io/download.html', '_blank');
    }

  };

  useEffect(() => {
    (
      async () => {
        try {
          if (account && user) {
            const { data } = await axios.post('https://nocapnetwork-api.vercel.app/wallet/create', { walletAddress: account, email: user.google.email })
            if (data?.success) {
              setWalletAddress(account)
            }
          }
        }
        catch (err) {

        }
      }
    )()
  }, [account, user])

  useEffect(()=>{
    if(walletAddress){
      setActiveModal({
        google: false,
        wallet: false,
        kyc: true
      })
    }
  },[walletAddress])


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
            <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                    <div className=' flex flex-col items-center'>
                      <ModalNavigation/>
                      <div className='w-[80%] mt-[23px] flex items-center flex-col'>
                        <p className={`${MagnetLight.className} text-[72px] leading-[91px] text-center`}>
                          Connect Your Wallet with us
                        </p>
                      </div>
                    </div>
                    <div className='mb-[74px]'>
                    <div onClick={handleClick} className='h-[52px] cursor-pointer w-[247px] flex items-center gap-[8px] justify-center bg-black rounded-xl'>
                        {status==='notConnected'&&<img className='h-[32px] w-[32px]' src='Images/SVG/Plus.svg' />}
                        <p className={`${MagnetMedium.className} text-[18px] leading-[23px] text-white`}>
                          {
                            status === 'connected' && account?.slice(0, 8) + '...' + account?.slice(-4)
                          }
                          {
                            status === 'notConnected' && 'Connect Wallet'
                          }
                          {
                            status === 'connecting' && 'Connecting...'
                          }
                          {
                            status === 'unavailable' && 'Install Metamask'
                          }
                          {
                            status === 'initializing' && 'Please wait...'
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