import { MagnetBold } from '@/pages/_app'
import React, { useState } from 'react'

const DropDownInput = ({options, width, preIcon, setValue})=>{
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState(options[0])
  return (
    <>
      {options && typeof options[0]=='string' && <div className='relative overflow-visible'>
        {preIcon && <div className='absolute z-[5] top-[20%] left-[10px]'>
          {preIcon}
          </div>}
        <div className={`${width?width:'w-[13rem]'} h-[2.5rem] ${preIcon && 'pl-[2rem]'}  flex items-center relative justify-start rounded-md pr-[3rem] bg-[rgba(255,255,255,0.5)]`}>
            <p className={`${MagnetBold.className} text-[14px] leading-[18px] ml-[1rem] text-[#000000]`}>{selected}</p>
            <img onClick={()=>setIsOpen(e=>!e)} src="Images/SVG/Chevron-small-down.svg" className='absolute cursor-pointer right-[10px]' alt="total sales"/>
        </div>
        <div className={`${width?width:'w-[13rem]'} ${isOpen? 'scale-y-100':'scale-y-0'} transition-all absolute origin-top  flex flex-col items-start left-0 z-[3] top-[3rem]  justify-center rounded-md pr-[3rem] bg-[#faefe1]`}>
            {
              options.map((option, index)=>{
                return (
                  <p onClick={()=>{
                    setSelected(option)
                    setIsOpen(false)
                  }} key={index} className={`${MagnetBold.className} w-[100%] cursor-pointer text-[14px] h-[2.5rem] flex items-center leading-[18px] ml-[1rem] text-[#000000]`}>{option}</p>
                )
              }
              )
            }
        </div>
      </div>}
      {options && typeof options[0]=='object' && <div className='relative overflow-visible'>
        {preIcon && <div className='absolute z-[5] top-[20%] left-[10px]'>
          {preIcon}
          </div>}
        <div className={`${width?width:'w-[13rem]'} h-[2.5rem] ${preIcon && 'pl-[2rem]'}  flex items-center relative justify-start rounded-md pr-[3rem] bg-[rgba(255,255,255,0.5)]`}>
            <p className={`${MagnetBold.className} text-[14px] leading-[18px] ml-[1rem] text-[#000000]`}>{selected.name}</p>
            <img onClick={()=>setIsOpen(e=>!e)} src="Images/SVG/Chevron-small-down.svg" className='absolute cursor-pointer right-[10px]' alt="total sales"/>
        </div>
        <div className={`${width?width:'w-[13rem]'} ${isOpen? 'scale-y-100':'scale-y-0'} transition-all absolute origin-top  flex flex-col items-start left-0 z-[3] top-[3rem]  justify-center rounded-md pr-[3rem] bg-[#faefe1]`}>
            {
              options.map((option, index)=>{
                return (
                  <p onClick={()=>{
                    setSelected(option)
                    setValue(option.value)
                    setIsOpen(false)
                  }} key={index} className={`${MagnetBold.className} w-[100%] cursor-pointer text-[14px] h-[2.5rem] flex items-center leading-[18px] ml-[1rem] text-[#000000]`}>{option.name}</p>
                )
              }
              )
            }
        </div>
      </div>}
    </>
  )
}

export default DropDownInput