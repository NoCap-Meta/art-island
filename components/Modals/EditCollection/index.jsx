import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState, useEffect } from 'react'
import {MagnetBold, MagnetMedium, MagnetRegular} from 'pages/_app.js'
import {Store} from '@/utils'
import InputField from '@/components/Common/InputField'
import { DropDownInput } from '@/components/Common'
import axios from 'axios'
import { web3 } from 'pages/_app.js'
import { useContext } from '@/utils/Context';

const {useCollectionModalStore} = Store

const dropdownOptions = [{
  name: 'MATIC',
  value: '0x0000000000000000000000000000000000001'
},
]



export default function UpdateCollectionModal({isOpen, setActiveModal, collection}) {
  const [file, setFile] = useState(null)
  const [bannerFile, setBannerFile] = useState(null)
  const {  setActiveModal:setActiveLoginModal,activeModal } = useContext()
  const fileRef = useRef(null)
  const bannerFileRef = useRef(null)
  const [previewSource, setPreviewSource] = useState('')
  const [bannerPreviewSource, setBannerPreviewSource] = useState('')
  const [buttonTitle, setButtonTitle] = useState('Save Changes')
  const [categoryOptions, setCategoryOptions] = useState([{
    name:'Select Category',
    value:null
  }])
  const [formData, setFormData] = useState({
    name: collection?.name,
    symbol: collection?.symbol,
    token: dropdownOptions[0].value,
    logo:collection?.logo,
    banner:collection?.banner,
    desc: collection?.desc,
    sponseredBy: collection?.sponseredBy
  })

  function closeModal() {
    setActiveModal(false)
  }

  useEffect(()=>{
    setFormData({
      name: collection?.name,
      symbol: collection?.symbol,
    token: dropdownOptions[0].value,
    logo:collection?.logo,
    banner:collection?.banner,
    desc: collection?.desc,
    sponseredBy: collection?.sponseredBy
    })
  },[collection])

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

  const getCategories = async ()=>{
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category`)

    if(data.success){
      if(data.categories.length>0){
        let options = data.categories.map((category)=>{
          if(category.isActive){
            return category
          }
        })

        options = options.filter((option)=>option!==undefined)

        setCategoryOptions(options)
      }else{
        setCategoryOptions([{
          name:'Not Available',
          value:null
        }])
      }
    }
  }

  const handleUpload = async (file) => {
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
    let location = ''
    if(file){
      location = await handleUpload(file)
    }
    else{
      location = formData.logo
    }

    let bannerLocation = ''

    if(bannerFile){
      bannerLocation = await handleUpload(bannerFile)
    }else{
      bannerLocation = formData.banner
    }

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
  
    const submitData = {...formData,createrAddress: accounts[0], logo:location, banner:bannerLocation}
    try {
      const {data} = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/collection/collection/${collection._id}`,submitData ,
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

let isDisabled = formData?.name?.length === 0 || formData?.symbol?.length === 0  || formData?.token?.length === 0 || buttonTitle === 'Submitting...'

useEffect(()=>{
  getCategories()
},[])

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
                <Dialog.Panel className=" transform overflow-visible bg-[#F5DFC2] justify-between rounded-md flex flex-col items-center min-h-[50vh] w-[60vw] p-6 text-left align-middle shadow-xl transition-all">
                    <div className='w-[100%] overflow-visible'>
                      <div className='w-[100%] flex justify-between'>
                        <p className={`${MagnetBold.className} text-[18px] text-left`}>
                          Edit a Drop
                        </p>
                        <button onClick={closeModal} className='text-[20px] text-right'>
                          <img src='Images/SVG/Cross-Black.svg' alt='close' />
                        </button>
                      </div>
                      <p className={`${MagnetRegular.className} opacity-50  text-[14px] text-left`}>
                      Deploying your own contract requires uploading your metadata outside of OpenSea.
                      </p>
                      <div className='w-[100%] mt-[1rem] overflow-visible'>
                        <div className='flex gap-[1rem]'>
                          <div className='w-[50%]'>
                            <input accept='image/png,image/jpeg,image/jpg,image/gif,image/svg,image/svg+xml,image/webp,' type='file' ref={fileRef} onChange={(e) => {
                              const File = e.target.files[0]
                              setFile(File)
                              const reader = new FileReader()
                              reader.readAsDataURL(File)
                              reader.onloadend = () => {
                                setPreviewSource(reader.result)
                              }
                            }} className='hidden' />
                            <p className={`${MagnetMedium.className} text-[16px] text-left`}>
                              Logo Image
                            </p>
                            <div onClick={()=>{fileRef.current.click()}} className='w-[100%] cursor-pointer h-[8rem] mt-[0.5rem] border border-[rgb(0,0,0,0.2)] rounded-md flex items-center justify-center'>
                              <div className='h-[4rem] w-[4rem] border border-[rgb(0,0,0,0.2)] rounded-md flex items-center justify-center'>
                                {previewSource==='' && <img src='Images/SVG/Plus-Black.svg' alt='plus' />}
                                {
                                  previewSource!=='' && <img src={previewSource} alt='preview' className='w-[4rem] overflow-hidden' />
                                }
                              </div>
                            </div>
                          </div>
                          <div className='w-[50%]'>
                            <input accept='image/png,image/jpeg,image/jpg,image/gif,image/svg,image/svg+xml,image/webp,' type='file' ref={bannerFileRef} onChange={(e) => {
                              const File = e.target.files[0]
                              setBannerFile(File)
                              const reader = new FileReader()
                              reader.readAsDataURL(File)
                              reader.onloadend = () => {
                                setBannerPreviewSource(reader.result)
                              }
                            }} className='hidden' />
                            <p className={`${MagnetMedium.className} text-[16px] text-left`}>
                              Banner Image
                            </p>
                            <div onClick={()=>{bannerFileRef.current.click()}} className='w-[100%] overflow-hidden cursor-pointer h-[8rem] mt-[0.5rem] border border-[rgb(0,0,0,0.2)] rounded-md flex items-center justify-center'>
                              {bannerPreviewSource==='' &&<div className='h-[4rem] w-[4rem] border border-[rgb(0,0,0,0.2)] rounded-md flex items-center justify-center'>
                                {bannerPreviewSource==='' && <img src='Images/SVG/Plus-Black.svg' alt='plus' />}
                             
                              </div>}
                              {
                                  bannerPreviewSource!=='' && <img src={bannerPreviewSource} alt='preview' className='w-[100%] overflow-hidden' />
                                }
                            </div>
                          </div>
                        </div>
                        <div className='flex w-[100%] overflow-visible gap-[1rem]'>
                          <InputField value={formData.name} onChange={(e)=>handleChange(e,'name')} width={'w-[25rem]'} placeholder='My Drop Name' >Name</InputField>
                          {/* <InputField value={formData.symbol} onChange={(e)=>handleChange(e,'symbol')} width={'w-[100%]'} desc='The token symbol is shown on the block explorer when others view your smart contract.' placeholder='MCN' >Token Symbol</InputField> */}
                          <div className="mt-[1rem] overflow-visible">
                              <p className={`${MagnetMedium.className} mb-[5px] text-[16px] text-left`}>
                                Select Token
                              </p>
                              <DropDownInput setValue={(value)=>handleChange(value, 'token', true)} width={'w-[400%]'} options={dropdownOptions}>Category</DropDownInput>
                          </div>
                        </div>
                        <InputField isArea={true}  value={formData.desc} onChange={(e)=>handleChange(e,'desc')} width={'w-[100%]'} placeholder='My Drop Desccription'>Description</InputField>
                        <InputField value={formData.sponseredBy} onChange={(e)=>handleChange(e,'sponseredBy')} width={'w-[100%]'} placeholder='Drop Sponsorer (if any)'>Sponsorer</InputField>
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
