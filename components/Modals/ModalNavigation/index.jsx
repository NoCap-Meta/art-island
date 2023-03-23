
import { useContext } from '@/utils/Context';
import { useState } from 'react';
const ModalNavigation = () => {
  const {activeModal, setActiveModal} = useContext()

  const handleSetActiveModal = (name) => {
    const newActiveModal = {
      google: false,
      wallet:false,
      kyc:false,
    }
    newActiveModal[name] = true
    setActiveModal(newActiveModal)
  }

  return (
    <div className='w-[100%] mt-[47px] flex justify-center gap-[10px]'>
      <div onClick={()=>handleSetActiveModal('google')} className={`w-[5rem] cursor-pointer h-[2px] bg-black ${activeModal.google?'opacity-50':'opacity-10'}`}/>
      <div onClick={()=>handleSetActiveModal('wallet')} className={`w-[5rem] cursor-pointer h-[2px] bg-black ${activeModal.wallet?'opacity-50':'opacity-10'}`}/>
      <div onClick={()=>handleSetActiveModal('kyc')} className={`w-[5rem] cursor-pointer h-[2px] bg-black ${activeModal.kyc?'opacity-50':'opacity-10'}`}/>
    </div>
  )
}

export default ModalNavigation