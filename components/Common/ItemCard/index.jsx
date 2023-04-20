import { MagnetBold, MagnetLight } from '@/pages/_app'
import React, { useEffect, useState } from 'react'

const ItemCard = ({isCollection,onCollectionClick,collectionStatus})=>{
  const [image, setImage] = useState(null)
  useEffect(()=>{
    const getRandomImage = async ()=>{
      const response = await fetch("https://source.unsplash.com/random/300x300/?3drenders")
      const data = await response.blob()
      setImage(URL.createObjectURL(data))
    }
    getRandomImage()
  },[])

  return (
    <div style={{
      background: "rgba(255,255,255,0.5)"
    }} className="rounded-lg w-[295px]  overflow-hidden">
      <img src={image} className='h-auto  rounded-lg w-[295px]'/>
      <div className="h-auto pb-[1rem] w-[295px]">
        <p className={`${MagnetLight.className} mt-[12px] text-[14px] leading-[18px] ml-[12px]`}>
          Deranged Music
        </p>
        <p className={`${MagnetBold.className} text-[16px] leading-[20px] ml-[12px]`}>
          Musical Birds Freeway Collection
        </p>
        {!isCollection && <>
          <p className={`${MagnetBold.className} text-[16px] leading-[20px] mt-[12px] ml-[12px]`}>
          15.2 ETH
          </p>
          <p className={`${MagnetLight.className} opacity-50 text-[14px] leading-[18px] ml-[12px]`}>
            Best Offer : 14.1 ETH
          </p>
        </>}
        <div className='flex w-[100%] justify-center'>

        {
          isCollection && (
            <button onClick={onCollectionClick} className="w-[90%] h-[40px] rounded-md bg-[#000000] text-[#FFFFFF] text-[16px] font-bold mt-[12px]">
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