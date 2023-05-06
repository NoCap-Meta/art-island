import React, { useState } from 'react'
import { MagnetBold, MagnetMedium } from 'pages/_app';
import ItemCard from '../ItemCard';
import Slider from 'react-slick';
import { handleBuyNFTUser } from '@/utils/Extras/buyNFTUser';
import { Store } from '@/utils';
import { useCheckMetamask } from '@/utils/Extras/useGetWalletAddress';

const {useUserStore} = Store

const settings = {
  // infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  cssEase: "linear",
  centerMode: true,
  //custom left dot
  // centerPadding: '5%',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

export const BuyItemCard = ({item, items})=>{
  const {user, setUser} = useUserStore()
  const [status, setStatus] = useState('Buy')
  const {checkMetamask} = useCheckMetamask()
  return (
    <ItemCard collectionStatus={status} onItemBuy={async ()=>{
      const hasMetaMask =await checkMetamask()
      if(!hasMetaMask){
        return
      }
      handleBuyNFTUser(item, ()=>{}, setStatus, setUser, user, 1)
    }} item={item} isItem={items && items.length>0}/>
  )
}

const TopCollectionSection = ({title, items})=>{
  if(items && items.length<4){
    settings.slidesToShow = items.length
  }else{
    settings.slidesToShow = 4
  }
  return (
    <div className='w-[90vw] mt-[3rem]'>
      <p className={`${MagnetBold.className} text-[#000000]  text-[24px]`}>{title}</p>
      {items && items.length>4 && <div className='w-[90vw] mt-[5px]'>
      <Slider {...settings}>
        {
          items.map((item)=>{  
            return (
              <BuyItemCard item={item} items={items}/>
            )
          } 
          )
        }
      </Slider>
      </div>}
      {items && (items.length<=4 && items.length>0) && <div className='w-[90vw] mt-[5px] flex gap-[2rem]'>
        {
          items.map((item)=>{  
            return (
              <BuyItemCard item={item} items={items}/>
            )
          } 
          )
        }
      </div>}
      {
        !items || items.length<1 && <div className={`w-[100%] text-[rgb(0,0,0,0.5)] ${MagnetMedium.className} rounded-xl bg-[rgba(255,255,255,0.5)] p-[12px] border mt-[1rem] border-[rgba(0,0,0,0.5)]`}>
         No Items Found
        </div>
      }
    </div>
  )
}

export default TopCollectionSection