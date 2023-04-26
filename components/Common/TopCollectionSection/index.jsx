import React, { useState } from 'react'
import { MagnetBold } from 'pages/_app';
import ItemCard from '../ItemCard';
import Slider from 'react-slick';
import { handleBuyNFTUser } from '@/utils/Extras/buyNFTUser';

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

const BuyItemCard = ({item, items})=>{
  const [status, setStatus] = useState('Buy')
  return (
    <ItemCard collectionStatus={status} onItemBuy={()=>handleBuyNFTUser(item, ()=>{}, setStatus)} item={item} isItem={items && items.length>0}/>
  )
}

const TopCollectionSection = ({title, items})=>{
  if(items && items.length<4){
    settings.slidesToShow = items.length
  }
  return (
    <div className='w-[90vw] mt-[3rem]'>
      <p className={`${MagnetBold.className} text-[#000000]  text-[24px]`}>{title}</p>
      <div className='w-[90vw] mt-[5px]'>
      <Slider {...settings}>
        {
          ((items && items.length)>0?items:[1,2,3,4,5,6,7,8,9,10]).map((item)=>{  
            return (
              <BuyItemCard item={item} items={items}/>
            )
          } 
          )
        }
      </Slider>
      </div>
    </div>
  )
}

export default TopCollectionSection