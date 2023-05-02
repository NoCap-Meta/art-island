import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'
import {MagnetBold, MagnetMedium, MagnetRegular} from 'pages/_app.js'
import {Store} from '@/utils'
import InputField from '@/components/Common/InputField'
import { DropDownInput } from '@/components/Common'
import axios from 'axios'
import { web3 } from 'pages/_app.js'
import { useContext } from '@/utils/Context';
import PhoneInput from 'react-phone-number-input'
import Autocomplete  from 'react-google-autocomplete'

const {useDeliverableModalStore, useUserStore} = Store



export default function DeliverModal({item, getItems}) {
  const {deliverableModalOpen:isOpen, setDeliverableModalOpen:setActiveModal} = useDeliverableModalStore()
  const {user} = useUserStore()
  const [buttonTitle, setButtonTitle] = useState('Order')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: null,
    apartmentNumber: '',
    phoneNumber:'',
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


  const handleSubmit = async ()=>{
    setButtonTitle('Submitting...')
    const {firstName, lastName, address, apartmentNumber, phoneNumber} = formData
    const {_id:itemId, collectionId} = item
    const {_id:userId} = user
    try{
      const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/order`, {
        firstName,
        lastName,
        address,
        apartmentNumber,
        phoneNumber,
        itemId,
        userId,
        collectionId
      },{
        headers:{
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(data.success){
        setButtonTitle('Ordered')
        const {data:updateItem} = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/items/item/${itemId}`,{
          orderStatus:'ordered',
          orderID:data.order._id
        },
        {
          headers:{
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
        )
        getItems()
        closeModal()
      }else{
        setButtonTitle('Order')
      }
    }
    catch(err){
        alert(err.response.data.message)
    }
}

let isDisabled = formData.address===null || buttonTitle === 'Submitting...' || formData.firstName === '' || formData.lastName === '' || formData.phoneNumber === '' || formData.apartmentNumber === '' || !item


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
                <Dialog.Panel className=" transform overflow-visible bg-[#F5DFC2] justify-between rounded-md flex flex-col items-center min-h-[50vh] w-[30vw] p-6 text-left align-middle shadow-xl transition-all">
                    <div className='w-[100%] overflow-visible'>
                      <div className='w-[100%] flex justify-between'>
                        <p className={`${MagnetBold.className} text-[18px] text-left`}>
                          Get your Item Delivered
                        </p>
                        <button onClick={closeModal} className='text-[20px] text-right'>
                          <img src='Images/SVG/Cross-Black.svg' alt='close' />
                        </button>
                      </div>
                      <p className={`${MagnetRegular.className} opacity-50  text-[14px] text-left`}>
                        Please fill the form to get your item delivered
                      </p>
                      <div className='w-[100%] mt-[1rem] overflow-visible'>
                       <div className='flex gap-[1rem]'>
                        <InputField value={formData.firstName} onChange={(e)=>handleChange(e, 'firstName')}  placeholder='First Name' >First Name</InputField>
                        <InputField value={formData.lastName} onChange={(e)=>handleChange(e, 'lastName')} placeholder='Last Name' >Last Name</InputField>
                       </div>
                       <div>
                          <p className={`text-[#000000] mt-[0.5rem] text-[16px] ${MagnetMedium.className}`}>Address</p>
                          <Autocomplete onPlaceSelected={e=>setFormData({...formData, address:e})} className={`w-[100%] px-[0.5rem] ${MagnetRegular.className} h-[40px] mt-[5px]  rounded-md bg-[rgb(255,255,255,0.5)] text-[#000000] text-[14px] focus:outline-none focus:border-none`} options={{
                            types:['address']
                          }} apiKey='AIzaSyBxRuUAfSrmFLFUWurlcZhAvonnMyasHmk' />
                      </div>
                      <div className='flex gap-[1rem]'>
                        <InputField width={'w-[6rem]'}  value={formData.apartmentNumber} onChange={(e)=>handleChange(e, 'apartmentNumber')} placeholder='No. 45' >Apartment No.</InputField>
                       <div>
                       <p className={`text-[#000000] mt-[1rem] text-[16px] ${MagnetMedium.className}`}>Phone Number</p>
                        <PhoneInput
                        value={formData.phoneNumber} onChange={(e)=>setFormData({...formData, phoneNumber:e})}
                              international
                              autoComplete='new-password'
                              defaultCountry="IN"
                              placeholder="Enter phone number"
                              className={`w-[16rem] px-[0.5rem] ${MagnetRegular.className} h-[40px] mt-[5px] rounded-md bg-[rgb(255,255,255,0.5)] text-[#000000] text-[14px] focus:outline-none focus:border-none`}
                              />
                      </div>
                       </div>
                      </div>
                    </div>
                    <button onClick={handleSubmit} disabled={
                      isDisabled
                    } className={`mt-[3rem] ${MagnetMedium.className} ${isDisabled && 'opacity-50'} w-[100%] h-[40px] rounded-md bg-[#000000] text-[#FFFFFF] text-[16px]`}>
                      {buttonTitle}
                    </button>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
