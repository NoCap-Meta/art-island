import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState, useEffect } from 'react'
import {MagnetBold, MagnetMedium, MagnetRegular, web3} from 'pages/_app.js'
import InputField from '@/components/Common/InputField'
import { handleReList } from '@/utils/Extras/relistNFT'
import axios from 'axios'
import { buyRelistToken } from '../../../utils/Extras/buyRelistToken';
import { useUserStore } from '@/utils/Zustand';
import { bidAmount } from '../../../utils/Extras/bidAmount';

export default function BidModal({item, isOpen, setIsOpen:setActiveModal, value}) {
  const [buttonTitle, setButtonTitle] = useState('Bid')
  const {user} = useUserStore()
  const [formData, setFormData] = useState({
    fractionsToList: '',
  })

  function closeModal() {
    setActiveModal(false)
  }

  const handleChange = (e, key, isDropDown)=>{
    if(isDropDown){
      setFormData({
        ...formData,
        [key]: e
      })
      return
    }
    setFormData({
      ...formData,
      [key]: e.target.value
    })
  }

  useEffect(()=>{
    if(value){
      setFormData({
        ...formData,
        fractionsToList: value[0]?.price
      })
    }
  },[value])


  const handleSubmit = async ()=>{
   if((+formData.fractionsToList<+value?.[0]?.price || !value[0])){
    const amount = (+formData.fractionsToList)+ (0.2*(+formData.fractionsToList)) + (((+item.royalty)/100)*(+formData.fractionsToList))
    bidAmount(setButtonTitle,amount, closeModal, item)
    return
   }else{
    //get voucher with the same signature as the value[0].signature
    const voucher = item.vouchers.find(v=>v.signature===value[0].voucherId)
    if(!voucher){
      alert('No voucher found')
      return
    }
    buyRelistToken(item, closeModal, setButtonTitle, ()=>{}, user, voucher, value)
   }
  }

let isDisabled = false

const handleDecicalInput = (e, type)=>{
  e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
  handleChange(e, type)
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
                <Dialog.Panel className=" transform overflow-visible bg-[#F5DFC2] justify-between rounded-md flex flex-col items-center min-h-[10vh] w-[30vw] p-6 text-left align-middle shadow-xl transition-all">
                    <div className='w-[100%] overflow-visible'>
                      <div className='w-[100%] flex justify-between'>
                        <p className={`${MagnetBold.className} text-[18px] text-left`}>
                          Amount
                        </p>
                        <button onClick={closeModal} className='text-[20px] text-right'>
                          <img src='Images/SVG/Cross-Black.svg' alt='close' />
                        </button>
                      </div>
                      <p className={`${MagnetRegular.className} opacity-50  text-[14px] text-left`}>
                        {item?.name}
                      </p>
                      <div className='w-[100%] mt-[1rem] overflow-visible'>
                      <InputField tyle={'number'} value={formData.fractionsToList} onChange={(e)=>handleDecicalInput(e, 'fractionsToList')} placeholder={`Price`} >
                        Price
                      </InputField>
                    </div>
                    <div className='w-[100%] mt-[1rem] overflow-visible'>
                      <p className={`${MagnetRegular.className} opacity-50  text-[14px] text-left`}>
                        {item &&+formData.fractionsToList<+value?.[0]?.price && `Transaction Amount: ${(+formData.fractionsToList)+ (0.2*(+formData.fractionsToList)) + (((+item.royalty)/100)*(+formData.fractionsToList))  }`}
                      </p>
                      </div>
                    <button onClick={handleSubmit} disabled={
                      isDisabled
                    } className={`mt-[3rem] ${MagnetMedium.className} ${isDisabled && 'opacity-50'} w-[100%] h-[40px] rounded-md bg-[#000000] text-[#FFFFFF] text-[16px]`}>
                      {buttonTitle}
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
