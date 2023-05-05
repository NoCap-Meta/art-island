
import { MagnetBold, MagnetMedium } from 'pages/_app';
import { useState } from 'react';

const RightContent = ({ title, content, image, time }) => {
  return (
    <div className="w-[100vw] flex xl:flex-row flex-col xl:items-center xl:gap-[170px] xl:justify-start items-center">
      <div className="flex xl:w-[40vw] w-[90%] gap-[20px]">
        <div className="w-[143px] xl:flex hidden h-[2px] bg-black" />
        <div className='mt-[-8px]'>
          <p className={`${MagnetMedium.className} text-[18px] xl:text-left text-center tracking-[0.64em] leading-[160%]`}>{time}</p>
          <p className={`${MagnetMedium.className} xl:text-[72px] text-[48px]  xl:text-left text-center leading-[91px]`}>{title}</p>
          <p className={`${MagnetMedium.className} text-[16px] xl:text-justify text-center xl:w-[30vw] italic xl:leading-[160%]`}>
            {content}
          </p>
        </div>
      </div>
      <img src={image} className='xl:ml-[5rem] xl:w-auto w-[80%] xl:mt-[0] mt-[2rem]' />
    </div>
  )
}

const LeftContent = ({ title, content, image, time }) => {
  return (
    <div className="w-[100vw] flex items-center gap-[170px] justify-end">
      <img src={image} className='mr-[10rem]' />
      <div className="flex w-[40vw] gap-[20px]">
        <div className='mt-[-8px] mr-[-1rem]'>
          <p className={`${MagnetMedium.className} text-[18px] text-right tracking-[0.64em] leading-[160%]`}>{time}</p>
          <p className={`${MagnetMedium.className} text-[72px] w-[30vw] text-right leading-[91px]`}>{title}</p>
          <p className={`${MagnetMedium.className} text-[16px] text-right w-[30vw] italic leading-[160%]`}>
            {content}
          </p>
        </div>
        <div className="w-[143px] h-[2px] bg-black" />
      </div>
    </div>
  )
}


const Journey = () => {
  const [data, setData] = useState([
    {
      title: 'Grow your Nest',
      content: 'Access high entry barrier assets and make potentially strong returns with our token marketplace. Invest like a pro, without the need for a trust fund.',
      image: 'Images/PNG/Journey1.png',
      time: 2019
    },
    {
      title: 'Fort Knox x Concierge',
      content: 'Enjoy peace of mind with our top-notch storage and management solutions. Let us handle the nitty-gritty while you focus on investing.',
      image: 'Images/PNG/Journey2.png',
      time: 2020
    },
    {
      title: 'Diverse Asset Blend',
      content: 'Our platform offers a range of tokenized assets for you to choose from, enabling you to diversify your portfolio and manage your risk effectively.',
      image: 'Images/PNG/Journey3.png',
      time: 2022
    }
  ])
  return (
    <div className="min-h-[100vh] pb-[172px] pt-[50px] bg-[#f5dfc2] flex flex-col gap-[128px] w-[100vw]">
      {data.map((item, index) => {
        return (
          <div key={index}>
            {index % 2 === 0 ? <RightContent image={item.image} content={item.content} title={item.title} time={item.time} /> : <div>
              <div className='hidden xl:block'>
                <LeftContent image={item.image} content={item.content} title={item.title} time={item.time} />
              </div>
              <div className='xl:hidden block'>
                <RightContent image={item.image} content={item.content} title={item.title} time={item.time} />
              </div>
            </div> }
            </div>
        )
      })}

    </div>
  )
}

export default Journey