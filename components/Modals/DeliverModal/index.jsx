import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'
import {MagnetBold, MagnetMedium, MagnetRegular} from 'pages/_app.js'
import {Store} from '@/utils'
import InputField from '@/components/Common/InputField'
import { DropDownInput } from '@/components/Common'
import axios from 'axios'
import { web3 } from 'pages/_app.js'
import { useContext } from '@/utils/Context';

const {useDeliverableModalStore} = Store

const dropdownOptions = [{
  name: 'USDT',
  value: '0x66D9512e6Cf45ba95586a8E7E1544Cef71521f08'
},
]
const categoryOptions = [{
  name: 'Art',
  value: 'art'
},
{
  name:'Photography',
  value:'photography'
}
]


export default function DeliverModal() {
  const {deliverableModalOpen:isOpen, setDeliverableModalOpen:setActiveModal} = useDeliverableModalStore()
  const [file, setFile] = useState(null)
  const {  setActiveModal:setActiveLoginModal,activeModal } = useContext()
  const fileRef = useRef(null)
  const [previewSource, setPreviewSource] = useState('')
  const [buttonTitle, setButtonTitle] = useState('Submit for Review')
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    royalty: '',
    token: dropdownOptions[0].value,
    tokenType: 'single',
    logo:'',
    category:categoryOptions[0].value
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

  const handleUpload = async () => {
    if (!localStorage.getItem('token')) {
      setActiveLoginModal({
        ...activeModal,
        google: true
      })
      return
    }

    if(!file) return

    const formData = new FormData()
    formData.append('file', file)
    try {
      const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload/upload-s3`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'boundary': '----WebKitFormBoundary7MA4YWxkTrZu0gW'
        }
      })
      console.log('File uploaded successfully!', data.data)
      setFormData({
        ...formData,
        logo: data.data.Location
      })
      return data.data.Location
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  };

  const handleSubmit = async ()=>{
    setButtonTitle('Submitting...')
    const location = await handleUpload()
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const accounts = await web3.eth.getAccounts()
    if(!accounts || accounts.length === 0){
      setActiveLoginModal({
        ...activeModal,
        wallet: true
      })
      return
    }

    if(!location) return;

   if(formData.name.length === 0 || formData.symbol.length === 0  || formData.token.length === 0 ){
      return
    }
  
    const submitData = {...formData,createrAddress: accounts[0], logo:location}
    try {
      const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/collection/collection`,submitData ,
      {headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`}})

      if(data.success){
        setButtonTitle('Submitted')
        setTimeout(()=>{
          closeModal()
        }, 1000)
      }
  }
  catch (error) {
    console.log(error)
  }
}

let isDisabled = formData?.name?.length === 0 || formData?.symbol?.length === 0  || formData?.token?.length === 0 || file === null || buttonTitle === 'Submitting...'


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
                        <InputField  placeholder='First Name' >First Name</InputField>
                        <InputField  placeholder='Last Name' >Last Name</InputField>
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