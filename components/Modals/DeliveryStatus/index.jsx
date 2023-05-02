import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {MagnetBold, MagnetLight, MagnetMedium, MagnetRegular} from 'pages/_app.js'
import {Store} from '@/utils'
import InputField from '@/components/Common/InputField'
import {useState, useRef, useEffect} from 'react'
const {useCaptchaModalStore } = Store

export default function DeliveryStatusModal({isOpen, setIsOpen:setActiveModal, item}) {

  function closeModal() {
    setActiveModal(false)
  }

  function formatDate(date) {
    const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
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
                <Dialog.Panel className=" transform overflow-hidden bg-[#F5DFC2] justify-between rounded-md flex flex-col items-center py-[2rem] p-6 text-left align-middle shadow-xl transition-all">
                  <p className={`${MagnetMedium.className}`}>
                  Request ID: <span className={`${MagnetBold.className}`}>{item.orderID}</span><br/>
                  Request Date: {formatDate(new Date(Date.now()))}<br/><br/>
                  Hello,<br/><br/>
                  We have received your request to ship your physical asset to your specified address.<br/> We will contact you over email for further process. <br/>Meanwhile, you can email us at <span className={`${MagnetBold.className}`}>assets@nocap.network</span> or contact us at 1800-123-5221 (India Toll Free) for any queries.<br/><br/>
                  Regards,<br/>
                  NoCap Meta<br/>
                  </p>

                  <div className='flex gap-[1rem]'>
                  <button className={`
                    ${MagnetMedium.className}
                    px-[1rem] py-[0.5rem] rounded-md bg-black text-white
                  `} onClick={closeModal}>
                    Okay, I got it
                  </button>
                  <button className={`
                    ${MagnetMedium.className}
                    px-[1rem] py-[0.5rem] rounded-md bg-black text-white
                  `} onClick={
                    () => {
                      window.open(`mailto:assets@nocap.network?subject=Asset%20Delivery%20${item.orderID}`)
                    }
                  }>
                    Mail
                  </button>
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
