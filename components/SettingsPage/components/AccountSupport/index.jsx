import Toggle from 'react-toggle'
import { MagnetBold, MagnetMedium } from 'pages/_app';
import { Transition } from '@headlessui/react'
import { Store } from '@/utils';
import { useState } from 'react';

const {useTabStore} = Store

const DropDown = ({ques, desc})=>{
  const [open, setOpen] = useState(false)
  return (
    <div className='min-h-auto transition-all duration-300 w-[50%] border-b flex flex-col border-[rgb(0,0,0,0.5)]'>
      <div className=' flex pt-[2rem] pb-[1.5rem] justify-between'>
        <p className={`text-[16px] ${MagnetBold.className} text-[#000000]`}>{ques}</p>
        <img onClick={()=>setOpen(!open)} className={`${
          open ? 'transform rotate-180' : ''
        } cursor-pointer transition-all duration-300`} src='Images/SVG/Chevron-small-down.svg' alt='arrow' />
      </div>
      <Transition
        show={open}
        enter="transition-opacity z-[100] duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
      >
        <p className={`text-[16px] pb-[1rem] ${MagnetMedium.className} opacity-50 text-[#000000]`}>{desc}</p>
      </Transition>
    </div>
  )
}

const AccountSupportSection = () => {
  const {selectedTab} = useTabStore()
  return (
    <Transition
    show={selectedTab === 'Account Support'}
    enter="transition-opacity z-[100] duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
  >
    <div>
      <p className={`text-[18px] ${MagnetBold.className} text-[#000000]`}>Account Support</p>
      <p className={`text-[16px] ${MagnetMedium.className} opacity-50 text-[#000000]`}>If you need help related to your account, we can help you.</p>
    </div>
    <div className='mt-[2rem]'>
     <DropDown ques={'General Help'} desc='Visit our help center to learn how to get started with buying, selling, and creating.'/>
     <DropDown ques={'Contact Support'} desc='Visit our help center to learn how to get started with buying, selling, and creating.'/>
     <DropDown ques={'Cancel all Ethereum listings & offers'} desc='Visit our help center to learn how to get started with buying, selling, and creating.'/>
    </div>
    </Transition>
  )
}

export default AccountSupportSection