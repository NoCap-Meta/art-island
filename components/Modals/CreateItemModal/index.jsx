import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import {MagnetBold, MagnetLight, MagnetMedium, MagnetRegular} from 'pages/_app.js'
import {Store} from '@/utils'
import InputField from '@/components/Common/InputField'

const {useCreateItemStore} = Store

let inDevEnvironment = false;


const Field = ({onDelete, index})=>{
  return (
    <div className='flex w-[100%] justify-between'>
      <div className='flex items-end gap-[1rem]'>
        <img onClick={()=>onDelete(index)} src='Images/SVG/Cross-Black.svg' className='h-[18px] cursor-pointer mb-[0.8rem] w-[18px]' alt='plus' />
        <InputField width={'w-[11rem]'} placeholder='Character' >Type</InputField>
      </div>
      <InputField width={'w-[11rem]'} placeholder='Male' >Name</InputField>
    </div>
  )
}

export default function CreateItemModal() {
  const {createItemModalState:isOpen,
    setCreateItemModalState:setActiveModal} = useCreateItemStore()
    const [fieldArray,setFieldArray] = useState([0])


  const handleDeleteField = (index)=>{
    const newArray = fieldArray.filter((item,i)=>i!==index)
    setFieldArray(newArray)
  }

  if (process && process.env.NODE_ENV === 'development') {
    inDevEnvironment = true;
  }


  function closeModal() {
    setActiveModal(false)
  }

  const handleAddField = ()=>{
    setFieldArray([...fieldArray,0])
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
                <Dialog.Panel className=" transform overflow-hidden bg-[#F5DFC2] justify-between rounded-md flex flex-col items-center min-h-[50vh] w-[30vw] p-6 text-left align-middle shadow-xl transition-all">
                    <div className='w-[100%]'>
                      <div className='w-[100%] flex justify-between'>
                        <p className={`${MagnetBold.className} text-[18px] text-left`}>
                          Add Properties
                        </p>
                        <button onClick={closeModal} className='text-[20px] text-right'>
                          <img src='Images/SVG/Cross-Black.svg' alt='close' />
                        </button>
                      </div>
                      <p className={`${MagnetRegular.className} opacity-50 mt-[1.5rem] text-[14px] text-left`}>
                      Properties show up underneath your item, are clickable, and can be filtered in your collection's sidebar.
                      </p>
                      <div className='w-[100%]'>
                        {
                          fieldArray.map((item,index)=>{
                            return <Field index={index} onDelete={()=>handleDeleteField(index)} key={index} />
                          })
                        }
                      </div>
                      <div className='w-[100%]'>
                        <button onClick={()=>handleAddField()} className={`mt-[1rem] ${MagnetMedium.className} w-[6rem] h-[40px] rounded-md border border-black text-[16px]`}>Add more</button>
                      </div>
                    </div>
                    <button className={`mt-[3rem] ${MagnetMedium.className} w-[100%] h-[40px] rounded-md bg-[#000000] text-[#FFFFFF] text-[16px]`}>Save</button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
