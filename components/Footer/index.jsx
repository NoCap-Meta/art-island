
import { MagnetLight, MagnetRegular } from 'pages/_app';
import { useState } from 'react';
import Slider from 'react-slick';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  cssEase: 'linear',
  arrows: false,
}

const Footer = () => {
  const [images, setImages] = useState([
    {
      id: 1,
      src: 'Images/PNG/Footer1.png',
    },
    {
      id: 2,
      src: 'Images/PNG/Footer2.png',
    },
    {
      id: 3,
      src: 'Images/PNG/Footer3.png',
    },
    {
      id: 4,
      src: 'Images/PNG/Footer1.png',
    },
    {
      id: 5,
      src: 'Images/PNG/Footer2.png',
    },
  ])


  return (
    <>
      <div className="xl:h-[60vh] xl:pb-[0] pb-[2rem] flex xl:flex-row flex-col xl:justify-between overflow-y-hidden xl:items-center bg-black w-[100vw]">
        <div className='overflow-y-hidden pt-[56px]'>
          <div className="overflow-y-hidden ml-[1rem]">
            <div>
              <p className={`${MagnetLight.className} text-white xl:text-left text-center text-[48px] xl:text-[72px] xl:leading-[91px]`}>
                Other Collections
              </p>
              <p className={`${MagnetLight.className} text-[16px] xl:leading-[160%] text-white xl:w-[30vw] italic xl:text-left text-center xl:mt-[12px]`}>
                Still curated by us ; with love.
              </p>
            </div>
            <img src='Images/PNG/Success1.png' className='mt-[-4rem] xl:block hidden' />
          </div>
        </div>
        <div className='flex xl:flex-nowrap w-[70vw] xl:mt-[0] mt-[1rem] flex-wrap xl:justify-start justify-center gap-[1rem] xl:mr-[-15rem]'>
          <Slider {...settings}>
            {
              images.map((image) => <img src={image.src} key={image.id} className='xl:h-[300px] px-[1rem] xl:rounded-none rounded-xl h-[150px] w-[150px] xl:w-[300px]' />
              )
            }
          </Slider>
        </div>
      </div>
      <div className="h-[60px] bg-[#f5dfc2] flex items-center justify-center w-[100vw]">
        <p className={`${MagnetRegular.className} text-[16px] leading-[160%] text-black`}>
          All Rights Reserved • 2022
        </p>
      </div>
    </>
  )
}

export default Footer