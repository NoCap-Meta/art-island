import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {MagnetLight, MagnetMedium} from 'pages/_app.js'
import { useContext } from '@/utils/Context'
import ModalNavigation from '../ModalNavigation'

export default function SignIn() {
  const {activeModal, setActiveModal} = useContext()
  const isOpen = activeModal.google

  let inDevEnvironment = false;

  if (process && process.env.NODE_ENV === 'development') {
    inDevEnvironment = true;
  }


  function closeModal() {
    setActiveModal({
      google: false,
      wallet: false,
      kyc: false
    })
  }

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
                          Let’s set you up in just a few seconds
                        </p>
                      </div>
                    </div>
                    <div className='mb-[74px]'>
                    <div onClick={()=>{
                      if (inDevEnvironment) {
                        console.log(
                          'inDevEnvironment: ', inDevEnvironment, 'localhost:3000'
                        )
                        window.location.href = 'http://localhost:3000/auth/google'
                        return
                      }
                      window.location.href = 'https://nocapnetwork-api.vercel.app/auth/google'
                    }} className='h-[52px] cursor-pointer w-[247px] flex items-center gap-[8px] justify-center bg-black rounded-xl'>
                        <img className='h-[32px] w-[32px]' src='Images/SVG/Google.svg' />
                        <p className={`${MagnetMedium.className} text-[18px] leading-[23px] text-white`}>
                          Sign in with Google
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
