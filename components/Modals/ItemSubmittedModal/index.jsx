import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {MagnetBold, MagnetLight, MagnetMedium, MagnetRegular} from 'pages/_app.js'
import {Store} from '@/utils'
import Reaptcha from 'reaptcha';
import {useState, useRef, useEffect} from 'react'
const {useItemSubmittedModal } = Store

export default function ItemSubmittedModal({image}) {
  const {itemSubmittedModalOpen:isOpen,
    setItemSubmittedModalOpen:setActiveModal} = useItemSubmittedModal()


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
                  <img src={image} className="w-[10rem] h-[10rem] object-cover" />
                  <h1 className={`${MagnetMedium.className} text-center text-[1.5rem] font-bold`}>Item Submitted!</h1>
                  <p className={`${MagnetMedium.className} text-center opacity-50 text-[1rem] font-medium`}>Your item has been submitted for review. You will be notified when it is approved.</p>
                  <button onClick={()=>{
                    //reload window
                    window.location.reload()
                  }} className={`bg-black  text-white ${MagnetBold.className} text-[1rem] font-medium py-[0.5rem] px-[1rem] rounded-md mt-[1rem]`}>Create New Item</button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
