import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import {MagnetBold, MagnetLight, MagnetMedium, MagnetRegular} from 'pages/_app.js'
import {Store} from '@/utils'
import InputField from '@/components/Common/InputField'
import {useState, useRef, useEffect} from 'react'
import Autocomplete from 'react-google-autocomplete';
const {useItemModalStore } = Store

export default function RealEstateModal({isOpen, setIsOpen:setActiveModal}) {

  function closeModal() {
    setActiveModal(false)
  }

  const [metaData, setMetaData] = useState({})

  const {itemModalData, setItemModalData} = useItemModalStore()

  const handleSubmit = ()=>{
    setItemModalData({
      ...itemModalData,
      metaData
    })
    closeModal()
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
                <Dialog.Panel className=" transform overflow-hidden w-[40vw] bg-[#F5DFC2] justify-between rounded-md flex flex-col items-center py-[2rem] p-6 text-left align-middle shadow-xl transition-all">

                <div className='w-[35vw]'>
                  <p className={`text-[#000000] mt-[0.5rem] text-[16px] ${MagnetMedium.className}`}>Address</p>
                  <Autocomplete onPlaceSelected={e=>{
                    setMetaData({
                      ...metaData,
                      address:e.formatted_address,
                      lat:e.geometry.location.lat(),
                      lng:e.geometry.location.lng(),
                    })
                  }} className={`w-[100%] px-[0.5rem] ${MagnetRegular.className} h-[40px] mt-[5px]  rounded-md bg-[rgb(255,255,255,0.5)] text-[#000000] text-[14px] focus:outline-none focus:border-none`} options={{
                            types:['address']
                          }} apiKey={process.env.NEXT_PUBLIC_PLACES_KEY} />
                </div>
                  <div className='flex mt-[1rem] gap-[1rem]'>
                  <button disabled={!metaData.lat || !metaData.address} className={`
                    ${MagnetMedium.className}
                    px-[1rem] ${(!metaData.lat || !metaData.address) && 'opacity-50'} py-[0.5rem] rounded-md bg-black text-white
                  `} onClick={handleSubmit}>
                    Submit
                  </button>
                  <button className={`
                    ${MagnetMedium.className}
                    px-[1rem] py-[0.5rem] rounded-md bg-black text-white
                  `} onClick={closeModal}>
                    Skip
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
