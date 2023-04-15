import { MagnetBold, MagnetLight } from '@/pages/_app'
import Slider from 'rc-slider'
import React, { useState } from 'react'

export const Title = ({title, hide}) => {
  return (
    <div className="flex justify-between">
        <p className={`${MagnetBold.className} text-[18px] leading-[25px]`}>
          {title}
        </p>
        <img className={`${hide&&'opacity-0'}`} src="Images/SVG/Chevron-small-down.svg"/>
      </div>
  )
}

export const RadioButton = ({name}) => {
  const [selected, setSelected] = useState(false)
  return (
    <div onClick={
      ()=>{
        setSelected(e=>!e)
      }
    } className="flex items-center cursor-pointer gap-[8px]">
          <div className="h-[16px] w-[16px] rounded-[4px] flex items-center justify-center border border-black">
            {selected && <div className="h-[10px] w-[10px] rounded-[4px]" style={{
              background: "#000000"
            }}/>}

          </div>
          <p className={`${MagnetLight.className} text-[16px]`}>
            {name}
          </p>
        </div>
  )
}

export const Filter = ()=>{
  return <div className="pb-[20px] h-fit hidden md:flex justify-center w-[295px] mt-[42px] " style={{
    background: 'linear-gradient(142.9deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.1) 100%)',
    border: '1px solid #000000',
    backdropFilter: 'blur(15px)',
    borderRadius: '6px',
  }}>
    <div className="w-[90%]">
    <div className=" pt-[20px]">
      <Title title="Listing Type"/>
      <div className="mt-[5px] flex flex-col gap-[8px] ml-[10px]">
        <RadioButton name="Buy Now"/>
        <RadioButton name="Auction"/>
      </div>
    </div>
    <div className="pt-[20px]">
      <Title title="Pricing" hide/>
      <div>
        <Slider max={5000} style={{
          height: '20px',
          paddingTop: '10px',
          paddingLeft: '10px',
        }} handleStyle={{
          backgroundColor: "#000000",
          opacity: 1,
          border: "none",
          bottom: "1px",
          height: "15px",
          width: "15px",
        }} trackStyle={{
          backgroundColor: "#000000",
          height:'2px'
        }} railStyle={{
          background: 'rgba(0, 0, 0, 0.25)',
          height:'2px',
        }} range allowCross={false} onChange={
          (e)=>{
            console.log(e)
          }
        } defaultValue={[200, 600]}  />
      </div>
    </div>
    <div className=" pt-[20px]">
      <Title title="Collection"/>
      <div className="mt-[5px] flex flex-col gap-[8px] ml-[10px]">
        <RadioButton name="Freeway Collection"/>
        <RadioButton name="Horn Break Collection"/>
        <RadioButton name="Brown Birds Collection"/>
      </div>
    </div>
    <div className=" pt-[20px]">
      <Title title="Chains"/>
      <div className="mt-[5px] flex flex-col gap-[8px] ml-[10px]">
        <RadioButton name="Etherum"/>
        <RadioButton name="Polygon"/>
        <RadioButton name="Solana"/>
      </div>
    </div>
    <div className=" pt-[20px]">
      <Title title="Category"/>
      <div className="mt-[5px] flex flex-col gap-[8px] ml-[10px]">
        <RadioButton name="Art"/>
        <RadioButton name="Celebrity"/>
        <RadioButton name="Music"/>
        <RadioButton name="Sports"/>
        <RadioButton name="Gaming"/>
        <RadioButton name="Crypto"/>
      </div>
    </div>
    </div>
  </div>
}