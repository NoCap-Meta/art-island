import Toggle from 'react-toggle'
import { MagnetBold, MagnetMedium } from 'pages/_app';
import { Transition } from '@headlessui/react'
import { Store } from '@/utils';
import { useState } from 'react';

const {useTabStore} = Store


const Option = ({name, desc})=>{
  const [checked, setChecked] = useState(Math.random() < 0.5 ? true : false)
  return (
    <div className='flex w-[95%] items-center justify-between'>
      <div>
        <p className={`text-[16px] ${MagnetBold.className} text-[#000000]`}>{name}</p>
        <p className={`text-[14px] ${MagnetMedium.className} opacity-50 text-[#000000]`}>{desc}</p>
      </div>
    <div className={`${!checked && 'opacity-50'} !overflow-x-visible w-[5rem] flex justify-center`}>
      <Toggle
        defaultChecked={checked}
        className='toggle-button'
        icons={{
          checked: null,
          unchecked: null,
        }}
        onChange={
          (e)=>{
            setChecked(e.target.checked)
          }
        } />
    </div>
  </div>
  )
}


const NotificationSection = () => {
  const {selectedTab} = useTabStore()
  return (
    <Transition
    show={selectedTab === 'Notifications'}
    enter="transition-opacity z-[100] duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
  >
    <div>
      <p className={`text-[18px] ${MagnetBold.className} text-[#000000]`}>Notifications</p>
      <p className={`text-[16px] ${MagnetMedium.className} opacity-50 text-[#000000]`}>Select the kinds of notifications you’d like receive to your email and in-app notifications center</p>
    </div>

    <div className='mt-[2rem] py-[1rem] w-[100%] flex flex-col gap-[1rem] items-center border-[rgb(0,0,0,0.5)] border rounded-md'>
      <Option name={'Item Sold'} desc={'When someone purchased one of your items'}/>
      <Option name={'Bid Activity'} desc={'When someone bids on one of your items'}/>
      <Option name={'Price Change'} desc={'When an item you made an offer on changes in price'}/>
      <Option name={'Auction Expiration'} desc={'When a timed auction you created ends'}/>
      <Option name={'Outbit'} desc={'When an offer you placed is exceeded by another user'}/>
      <Option name={'Owned item Updates'} desc={'When a significant update occurs for one of the items you have purchased on OpenSea'}/>
      <Option name={'Successful Purchase'} desc={'When you successfully buy an item'}/>
      <Option name={'OpenSea Newletter'} desc={'Occasional updates from the OpenSea team'}/>
    </div>
  </Transition>
  )
}

export default NotificationSection