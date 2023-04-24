import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import {MagnetBold, MagnetLight, MagnetMedium, MagnetRegular} from 'pages/_app.js'
import {Store} from '@/utils'
import InputField from '@/components/Common/InputField'

const {useItemStatsModalStore, useItemModalStore} = Store

let inDevEnvironment = false;


const Field = ({onDelete, index, onTypeChange, onNameChange, typeValue, nameValue, onMaxChange, maxValue})=>{
  return (
    <div className='flex w-[100%] items-center justify-between'>
      <div className='flex items-end gap-[1rem]'>
        <img onClick={()=>onDelete(index)} src='Images/SVG/Cross-Black.svg' className='h-[18px] cursor-pointer mb-[0.8rem] w-[18px]' alt='plus' />
        <InputField onChange={(e)=>onNameChange(e)} value={nameValue} width={'w-[11rem]'} placeholder='Speed' >Name</InputField>
      </div>
      <InputField onChange={(e)=>onTypeChange(e)} value={typeValue} width={'w-[3rem]'} placeholder='0' >Value</InputField>
      <p className={`${MagnetMedium.className} opacity-50 text-[16px] `}><br/><br/>of</p>
      <InputField onChange={(e)=>onMaxChange(e)} value={maxValue} width={'w-[3rem]'} placeholder='0' ><br /></InputField>
    </div>
  )
}

export default function AddStatsModal() {
  const {itemStatsModalOpen:isOpen,
    setItemStatsModalOpen:setActiveModal} = useItemStatsModalStore()
    const {itemModalData,setItemModalData} = useItemModalStore()


  const handleDeleteField = (index)=>{
    const newArray = itemModalData.stats.filter((item,i)=>{
      return i!==index
    }
    )

    setItemModalData({
      ...itemModalData,
      stats:newArray
    })
  }

  if (process && process.env.NODE_ENV === 'development') {
    inDevEnvironment = true;
  }


  function closeModal() {
    setActiveModal(false)
  }

  const handleAddField = ()=>{
    const newArray = [...itemModalData.stats, {
      name:'',
      value:0,
      max:0
    }]

    setItemModalData({
      ...itemModalData,
      stats:newArray
    })

  }

  const onTypeChange = (e, index)=>{
    const newArray = itemModalData.stats.map((item,i)=>{
      if(i===index){
        return {
          ...item,
          value:e.target.value
        }
      }
      return item
    })

    setItemModalData({
      ...itemModalData,
      stats:newArray
    })
  }

  const onNameChange = (e, index)=>{
    const newArray = itemModalData.stats.map((item,i)=>{
      if(i===index){
        return {
          ...item,
          name:e.target.value
        }
      }
      return item
    })

    setItemModalData({
      ...itemModalData,
      stats:newArray
    })
  }

  const onMaxChange = (e, index)=>{
    const newArray = itemModalData.stats.map((item,i)=>{
      if(i===index){
        return {
          ...item,
          max:e.target.value
        }
      }
      return item
    })

    setItemModalData({
      ...itemModalData,
      stats:newArray
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
                <Dialog.Panel className=" transform overflow-hidden bg-[#F5DFC2] justify-between rounded-md flex flex-col items-center min-h-[50vh] w-[30vw] p-6 text-left align-middle shadow-xl transition-all">
                    <div className='w-[100%]'>
                      <div className='w-[100%] flex justify-between'>
                        <p className={`${MagnetBold.className} text-[18px] text-left`}>
                          Add Stats
                        </p>
                        <button onClick={closeModal} className='text-[20px] text-right'>
                          <img src='Images/SVG/Cross-Black.svg' alt='close' />
                        </button>
                      </div>
                      <p className={`${MagnetRegular.className} opacity-50 mt-[1.5rem] text-[14px] text-left`}>
                      Stats show up underneath your item, are clickable, and can be filtered in your collection's sidebar.
                      </p>
                      <div className='w-[100%]'>
                        {
                          itemModalData.stats.map((item,index)=>{
                            return <Field maxValue={item.max} onMaxChange={e=>onMaxChange(e, index)} onTypeChange={(e)=>onTypeChange(e, index)} typeValue={item.value} onNameChange={e=>onNameChange(e, index)} nameValue={item.name} index={index} onDelete={()=>handleDeleteField(index)} key={index} />
                          })
                        }
                      </div>
                      <div className='w-[100%]'>
                        <button onClick={()=>handleAddField()} className={`mt-[1rem] ${MagnetMedium.className} w-[6rem] h-[40px] rounded-md border border-black text-[16px]`}>Add more</button>
                      </div>
                    </div>
                    <button onClick={()=>{
                      setActiveModal(false)
                    }} className={`mt-[3rem] ${MagnetMedium.className} w-[100%] h-[40px] rounded-md bg-[#000000] text-[#FFFFFF] text-[16px]`}>Save</button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
