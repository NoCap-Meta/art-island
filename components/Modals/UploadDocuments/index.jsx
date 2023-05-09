import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState, useEffect } from 'react'
import {MagnetBold, MagnetMedium, MagnetRegular} from 'pages/_app.js'
import {Store} from '@/utils'
import InputField from '@/components/Common/InputField'
import { DropDownInput } from '@/components/Common'
import axios from 'axios'
import { web3 } from 'pages/_app.js'
import { useContext } from '@/utils/Context';
import { useCheckMetamask } from '@/utils/Extras/useGetWalletAddress';
import { changeToMumbaiPolygonTestnet } from '@/utils/Extras/checkChain'

const {useCollectionModalStore} = Store

const dropdownOptions = [{
  name: 'MATIC',
  value: '0x0000000000000000000000000000000000001'
},
]



export default function UploadDocuments({isOpen, setIsOpen:setActiveModal, item}) {
  const [files, setFiles] = useState([])
  const fileRef = useRef(null)
  const [buttonTitle, setButtonTitle] = useState('Submit for Review')
  const [formData, setFormData] = useState({
    name: '',
    symbol: process.env.NEXT_PUBLIC_NOCAP_SYMBOL,
    royalty: '',
    token: dropdownOptions[0].value,
    tokenType: 'single',
    logo:'',
    category:''
  })

  function closeModal() {
    setActiveModal(false)
  }

  const handleAllFileUpload = async () => {

    if(!files) return

    const formData = new FormData()

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])
    }

    try {
      const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload/upload-s3-multiple`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'boundary': '----WebKitFormBoundary7MA4YWxkTrZu0gW'
        }
      })
      console.log('File uploaded successfully!', data.data)
      let fileLinks = data.data.map((item)=>item.Location)
      //each link with id, upload timestamp, status default pending, verifytimestamp default null, verified by id default null 
      const documents = fileLinks.map((item, index)=>{
        return {
          link: item,
          status: 'pending',
          timstamp: Date.now(),
          verifiedBy: null,
          verifyTimestamp: null,
          id: index,
          name: files[index].name,
          type: files[index].type
        }
      })

      const {data:uploadedDocuments} = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/items/item/${item._id}`, {
        documentsInfo:documents
      },{
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        }
      })

      if(uploadedDocuments.success){
        setButtonTitle('Submitted')
        setFiles([])
        setTimeout(()=>{
          closeModal()
        }, 1000)
      }
     
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  };

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
    
  }

let isDisabled = files.length<1


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
                          Upload Documents
                        </p>
                        <button onClick={closeModal} className='text-[20px] text-right'>
                          <img src='Images/SVG/Cross-Black.svg' alt='close' />
                        </button>
                      </div>
                      {/* <p className={`${MagnetRegular.className} opacity-50  text-[14px] text-left`}>
                      Deploying your own contract requires uploading your metadata outside of OpenSea.
                      </p> */}
                      <div className='w-[100%] mt-[1rem] overflow-visible'>
                        <div className='w-[100%]'>
                          <input multiple accept={
                            //pdf and doc
                            '.pdf,.doc,.docx'
                          } type='file' ref={fileRef} onChange={(e) => {
                            const files = e.target.files
                            setFiles(files)

                          }} className='hidden' />
                        
                          {files.length<1 &&<div onClick={()=>{fileRef.current.click()}} className='w-[100%] cursor-pointer h-[8rem] mt-[0.5rem] border border-[rgb(0,0,0,0.2)] rounded-md flex items-center justify-center'>
                              <div className='flex flex-col items-center justify-center'>
                                <img className='h-[1rem]' src={'/Images/SVG/Upload.svg'}/>
                                <p className={`${MagnetMedium.className} text-[16px] text-[#000000]`}>
                                Upload Documents
                                </p>
                              </div>
                          </div>}
                          {
                            files.length>0 && <div className='w-[100%] h-[8rem] py-[0.5rem] mt-[0.5rem] border border-[rgb(0,0,0,0.2)] rounded-md flex flex-col px-[1rem]'>
                              {
                                [...files].map((file, index)=>{
                                  return <div key={index} className='w-[100%] opacity-50 flex justify-between items-center'>
                                    <p className={`${MagnetMedium.className} text-[16px] text-[#000000]`}>
                                      {file.name}
                                    </p>
                                    <button onClick={()=>{
                                      const newFiles = [...files].filter((item, i)=>i!==index)
                                      setFiles(newFiles)
                                    }} className='text-[20px] text-right'>
                                      <img className='h-[1rem]' src='Images/SVG/Cross-Black.svg' alt='close' />
                                    </button>
                                  </div>
                                })
                              }
                              <div onClick={()=>{fileRef.current.click()}} className='w-[100%] cursor-pointer flex justify-between items-center'>
                                <p className={`${MagnetMedium.className} text-[16px] flex gap-[0.5rem] items-center text-[#000000]`}>
                                  <img src={'/Images/SVG/Plus-Black.svg'} className='h-[1rem]'/>
                                  Upload More
                                </p>
                               
                                </div>

                            </div>
                          }

                          <div className='w-[100%] mt-[1rem]'>
                            <p className={`${MagnetMedium.className} text-[16px] text-[#000000]`}>
                              {item.name}
                            </p>
                            <p className={`${MagnetBold.className} text-[16px] text-[#000000]`}>
                              {item.shortDesc}
                            </p>
                          
                          </div>
                        </div>
                      </div>
                    </div>
                    <button disabled={isDisabled} onClick={handleAllFileUpload} className={`mt-[3rem] ${MagnetMedium.className} ${isDisabled && 'opacity-50'} w-[100%] h-[40px] rounded-md bg-[#000000] text-[#FFFFFF] text-[16px]`}>
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
