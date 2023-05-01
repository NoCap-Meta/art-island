import { MagnetBold, MagnetLight, web3 } from '@/pages/_app'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

const ItemCard = ({isCollection,onCollectionClick,relistHandler,collectionStatus,isDeliverable,isBoughtItem, item, isDisabled, isItem, onItemBuy})=>{
  const [image, setImage] = useState('/Images/PNG/Gallery1.png')
  const router = useRouter()

  return (
    <div style={{
      background: "rgba(255,255,255,0.5)"
    }} className="rounded-lg w-[295px] relative  overflow-hidden">
      {
        isBoughtItem && <div className='h-[5rem] absolute w-[5rem] bg-[#faefe1] top-[-2rem] right-[-2rem] rounded-full '>
          <div className='h-[100%] w-[100%] relative'>
            <p className={`${MagnetBold.className} absolute bottom-[1rem] left-[0.5rem] text-[20px] overflow-hidden leading-[20px] mt-[12px] ml-[12px]`}>
             {item?.frequency}
            </p>
          </div>
        </div>
      }
      <img src={(item && (item.logo || item.image)) || image} className='h-[295px]  rounded-lg w-[295px]'/>
      <div className="h-[auto] pb-[1rem] w-[295px]">
        <p className={`${MagnetLight.className} mt-[12px] text-[14px] leading-[18px] ml-[12px]`}>
          {(item && item.name) || 'Deranged Music'}
        </p>
        <p className={`${MagnetBold.className} text-[16px] leading-[20px] ml-[12px]`}>
          {(item && (item.symbol||item.externalLink))|| 'Musical Birds Freeway Collection'}
        </p>
        {!isCollection && isItem && <>
          <p className={`${MagnetBold.className} text-[16px] leading-[20px] mt-[12px] ml-[12px]`}>
          {isItem && item  && `${(item.pricePerFraction).toFixed(10)}`.replace(/0+$/, "") +  ' ETH'||'15.2 ETH'}
          </p>
          <p className={`${MagnetLight.className} opacity-50 text-[14px] leading-[18px] ml-[12px]`}>
            {(isItem && item && `Available ${item.maxFractions-item.tokenBuyed} of ${item.maxFractions}`)||'Available 20 of 100'}
          </p>
        </>}
        <div className='flex w-[100%] justify-center'>

        {
          isCollection && (
            <div className='w-[100%] flex justify-center gap-[1rem]'>
            <button disabled={isDisabled} onClick={onCollectionClick} className={`${MagnetBold.className} ${isDisabled && 'opacity-50'} w-[90%] h-[40px] rounded-md border border-black text-[16px] font-bold mt-[12px]`}>
              {collectionStatus}
            </button>
            {/* <button onClick={()=>router.push(`/art-page?id=${item._id}`)} className={`${MagnetBold.className} w-[40%] h-[40px] rounded-md border border-black text-[16px] font-bold mt-[12px]`}>
              View
            </button> */}
            </div>
          )
        }
        {
          isItem && (
            <div className='w-[100%] flex flex-col items-center'>
              <button disabled={isDisabled} onClick={onItemBuy} className={`${MagnetBold.className} ${isDisabled && 'opacity-50'} w-[90%] h-[40px] rounded-md border border-black text-[16px] font-bold mt-[12px]`}>
              {collectionStatus}
            </button>
              <button onClick={()=>router.push(`/art-page?id=${item._id}`)} className={`${MagnetBold.className} w-[90%] h-[40px] rounded-md border border-black text-[16px] font-bold mt-[12px]`}>
              View
            </button>
            </div>
          )
        }
         {
          isBoughtItem && (
            <div className='w-[100%] flex justify-center gap-[1rem]'>
            {isDeliverable && <button disabled={isDisabled} onClick={onItemBuy} className={`${MagnetBold.className} ${isDisabled && 'opacity-50'} w-[40%] h-[40px] rounded-md border border-black text-[16px] font-bold mt-[12px]`}>
              {collectionStatus}
            </button>}
              <button onClick={relistHandler} className={`${MagnetBold.className} ${isDeliverable ?'w-[40%]':'w-[90%]'} h-[40px] rounded-md border border-black text-[16px] font-bold mt-[12px]`}>
              Relist
            </button>
            </div>
          )
        }
        </div>
      </div>
    </div>
  )
}

export default ItemCard