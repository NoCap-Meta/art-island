import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import {MagnetLight, MagnetMedium} from 'pages/_app.js'
import {Inter} from 'next/font/google'
import { useContext } from '@/utils/Context'
import ModalNavigation from '../ModalNavigation'
import OtpInput from 'react18-input-otp';

//make use of Inter
export const InterFont = Inter({
  subsets: ['latin'],
  weight: ['400','600', '700'],
});
  


const KycMethod = ()=>{
  const [selected, setSelected] = useState('adhar')
  return (
    <div className='flex gap-[10px] mt-[30px]'>
      <div onClick={
        ()=>{setSelected('adhar')}
      } className={`flex ${selected==='adhar'?'opacity-100':'opacity-30'} rounded-md items-center justify-center h-[160px] w-[220px] border-2 border-black`}>
        <p className={`${MagnetMedium.className} text-[23px] leading-[29px]`}>
          AADHAR
        </p>
      </div>
      <div onClick={
        ()=>{setSelected('pan')}
      } className={`flex rounded-md ${selected==='pan'?'opacity-100':'opacity-30'} items-center justify-center h-[160px] w-[220px] border-2 border-black`}>
        <p className={`${MagnetMedium.className} text-[23px] leading-[29px]`}>
          PAN Card
        </p>
      </div>
    </div>
  )
}

const VerifyDocument = ()=>{
  const [number, setNumber] = useState('')
  function handleChange(e){
    setNumber(e)
  }

  return (
    <div className='mt-[34px]'>
      <p className={`${MagnetMedium.className} text-[16px] leading-[32px] text-[rgba(19,19,20,0.5)]`}>Enter your Aadhar number below to receive an OTP which could help us verify you.</p>
      <div className='flex justify-center mt-[24px] gap-[10px]'>
          <OtpInput value={number} isInputNum inputStyle={'h-[42px] text-center !w-[42px] bg-[#F5DFC2] border border-black rounded-md'} onChange={handleChange} numInputs={12} separator={<span>&nbsp;&nbsp;</span>} />
      </div>
    </div>
  )
}


const EnterOTP = ()=>{
  const [number, setNumber] = useState('')
  function handleChange(e){
    setNumber(e)
  }

  return (
    <div className='mt-[34px]'>
      <p className={`${MagnetMedium.className} text-[16px] leading-[32px] text-[rgba(19,19,20,0.5)]`}>Enter the OTP which you must have received on the mobile number attached with your Aadhar</p>
      <div className='flex justify-center mt-[24px] gap-[10px]'>
          <OtpInput value={number} isInputNum inputStyle={'h-[42px] text-center !w-[42px] bg-[#F5DFC2] border border-black rounded-md'} onChange={handleChange} numInputs={6} separator={<span>&nbsp;&nbsp;</span>} />
      </div>
    </div>
  )
}

const UploadDocument = ()=>{
  const [file, setFile] = useState(null)
  const ref = useRef(null)
  function handleChange(e){
    setFile(e.target.files[0])
  }
  return (
    <div>
      <div className='mt-[74px]  flex flex-col items-center'>
        <img onClick={()=>{ ref.current.click()} } src={'/Images/SVG/Upload.svg'} className='cursor-pointer' alt="upload" />
        <input ref={ref} onChange={handleChange} type="file" className='hidden' />
        <p className={`${InterFont.className} mt-[23px] font-[600] text-[18px] leading-[22px] text-center`}>
          {file?.name? file?.name:'Upload .png, .jpg, .pdf etc.'}
        </p>
        {file && <img onClick={()=>setFile(null)} src='/Images/SVG/Cross-small.svg' className='text-black cursor-pointer mt-[10px]'/>}
      </div>
    </div>
  )
}

export default function KycModal() {
  const {activeModal, setActiveModal} = useContext()
  const isOpen = activeModal.kyc
  const [step,setStep] = useState(0)
  const [content, setContent] = useState([
    {
      title: <>Know Your Customer <br/> (KYC)</>,
      buttonTitle: 'Start',
      onClick: ()=>setStep(1)
    },
    {
      title: 'Method of KYC',
      buttonTitle: 'Continue',
      onClick: ()=>setStep(2)
    },
    {
      title: 'Verify Document',
      buttonTitle: 'Continue',
      onClick: ()=>setStep(3)
    },
    {
      title: 'Enter OTP',
      buttonTitle: 'Continue',
      onClick: ()=>setStep(4)
    },
    {
      title: 'Upload Document',
      buttonTitle: 'Continue',
      onClick: ()=>{
        let copyContent = [...content]
        copyContent[4].buttonTitle = 'Submit'
        copyContent[4].onClick = ()=>{}
        setContent(copyContent)

      }
    }

  ])


  function closeModal() {
    setActiveModal({
      google: false,
      wallet: false,
      kyc: false
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
                <Dialog.Panel className=" transform overflow-hidden bg-[#F5DFC2] justify-between flex flex-col items-center h-[75vh] w-[70vw] p-6 text-left align-middle shadow-xl transition-all">
                    <div className=' flex flex-col items-center'>
                      <ModalNavigation/>
                      <div className='w-[100%] mt-[23px] flex items-center flex-col'>
                        <p className={`${MagnetLight.className} text-[72px] leading-[91px] text-center`}>
                          {
                            content[step].title
                          }
                        </p>
                      </div>
                      {
                        step === 1 && <KycMethod/>
                      }
                      {
                        step === 2 && <VerifyDocument/>
                      }
                      {
                        step === 3 && <EnterOTP/>
                      }
                      {
                        step === 4 && <UploadDocument/>
                      }
                    </div>
                    <div className='mb-[74px]'>
                    <div onClick={
                      content[step].onClick
                    } className='h-[52px] w-[247px] flex cursor-pointer items-center gap-[8px] justify-center bg-black rounded-md'>
                        <p className={`${MagnetMedium.className} text-[18px] leading-[23px] text-white`}>
                          {
                            content[step].buttonTitle
                          }
                        </p>
                      </div>
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
