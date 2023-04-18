import { MagnetLight, MagnetRegular } from 'pages/_app';
import { useState } from 'react';
import Slider from 'react-slick';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  cssEase: 'linear',
  arrows: false,
}

const Featured = () => {
  const [images, setImages] = useState([
    {
      id: 1,
      src: 'Images/PNG/Featured1.png',
    },
    {
      id: 2,
      src: 'Images/PNG/Featured2.png',
    },
    {
      id: 3,
      src: 'Images/PNG/Featured1.png',
    },
    {
      id: 4,
      src: 'Images/PNG/Featured2.png',
    },
  ])

  return (
    <div className="w-[100vw] xl:h-[100vh] flex xl:items-center xl:pt-[0] pt-[20px] justify-center bg-black">
      <div className="xl:h-[80vh] overflow-visible pb-[20px] xl:justify-between w-[95vw] xl:items-end items-center flex xl:gap-[0] gap-[1rem] xl:flex-row flex-col">
        <div className="xl:h-[80vh] overflow-y-hidden">
          <div>
            <p className={`${MagnetLight.className} text-white text-[48px] xl:text-left text-center  xl:text-[72px] xl:leading-[91px]`}>
              Featured<br /> masterpieces
            </p>
            <p className={`${MagnetLight.className} text-[16px] leading-[160%] text-white xl:w-[30vw] xl:text-left text-center italic mt-[12px]`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit.
            </p>
          </div>
          <img src='Images/PNG/Success1.png' className='xl:block hidden' />
        </div>
        <div className='w-[60vw] featured  overflow-visible'>
          <Slider {...settings}>
            {
              images.map((image) => <img src={image.src} key={image.id} className='h-[35rem] rounded-xl px-[1rem]' />
              )
            }
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default Featured