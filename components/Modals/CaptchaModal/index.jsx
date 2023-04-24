import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {MagnetBold, MagnetLight, MagnetMedium, MagnetRegular} from 'pages/_app.js'
import {Store} from '@/utils'
import InputField from '@/components/Common/InputField'
import Reaptcha from 'reaptcha';
import {useState, useRef, useEffect} from 'react'
const {useCaptchaModalStore } = Store

export default function CaptchaModal({onVerify}) {
  const {captchaModalOpen:isOpen,
    setCaptchaModalOpen:setActiveModal} = useCaptchaModalStore()
    const [captchaReady, setCaptchaReady] = useState(false)
    const captchaRef = useRef(null)

    useEffect(()=>{
      if(captchaReady){
        captchaRef.current.renderExplicitly()
      }
    },[captchaReady])


  function closeModal() {
    setActiveModal(false)
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
                <Dialog.Panel className=" transform overflow-hidden bg-[#F5DFC2] justify-between rounded-md flex flex-col items-center py-[2rem] w-[30vw] p-6 text-left align-middle shadow-xl transition-all">
                <Reaptcha ref={captchaRef} onLoad={()=>setCaptchaReady(true)} explicit sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY} onVerify={onVerify} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
