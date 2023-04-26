import { MagnetBold, MagnetLight, web3 } from '@/pages/_app'
import React, { useEffect, useState } from 'react'

const ItemCard = ({isCollection,onCollectionClick,collectionStatus, item, isDisabled, isItem, onItemBuy})=>{
  const [image, setImage] = useState('/Images/PNG/Gallery1.png')

  return (
    <div style={{
      background: "rgba(255,255,255,0.5)"
    }} className="rounded-lg w-[295px]  overflow-hidden">
      <img src={(item && (item.logo || item.image)) || image} className='h-[295px]  rounded-lg w-[295px]'/>
      <div className="h-[auto] pb-[1rem] w-[295px]">
        <p className={`${MagnetLight.className} mt-[12px] text-[14px] leading-[18px] ml-[12px]`}>
          {(item && item.name) || 'Deranged Music'}
        </p>
        <p className={`${MagnetBold.className} text-[16px] leading-[20px] ml-[12px]`}>
          {(item && (item.symbol||item.externalLink))|| 'Musical Birds Freeway Collection'}
        </p>
        {!isCollection && <>
          <p className={`${MagnetBold.className} text-[16px] leading-[20px] mt-[12px] ml-[12px]`}>
          {isItem && item  && (item.pricePerFraction).toFixed(10) +  ' ETH'||'15.2 ETH'}
          </p>
          <p className={`${MagnetLight.className} opacity-50 text-[14px] leading-[18px] ml-[12px]`}>
            {(isItem && item && `Available ${item.fractions-item.tokenBuyed} of ${item.fractions}`)||'Available 20 of 100'}
          </p>
        </>}
        <div className='flex w-[100%] justify-center'>

        {
          isCollection && (
            <button disabled={isDisabled} onClick={onCollectionClick} className={`${MagnetBold.className} ${isDisabled && 'opacity-50'} w-[90%] h-[40px] rounded-md border border-black text-[16px] font-bold mt-[12px]`}>
              {collectionStatus}
            </button>
          )
        }
        {
          isItem && (
            <button disabled={isDisabled} onClick={onItemBuy} className={`${MagnetBold.className} ${isDisabled && 'opacity-50'} w-[90%] h-[40px] rounded-md border border-black text-[16px] font-bold mt-[12px]`}>
              {collectionStatus}
            </button>
          )
        }
        </div>
      </div>
    </div>
  )
}

export default ItemCard