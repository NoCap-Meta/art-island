
import { MagnetBold, MagnetMedium } from 'pages/_app';

const RightContent = ({ title, content, image, time }) => {
  return (
    <div className="w-[100vw] flex items-center gap-[170px] justify-start">
      <div className="flex w-[40vw] gap-[20px]">
        <div className="w-[143px] h-[2px] bg-black" />
        <div className='mt-[-8px]'>
          <p className={`${MagnetMedium.className} text-[18px] tracking-[0.64em] leading-[160%]`}>{time}</p>
          <p className={`${MagnetMedium.className} text-[72px] leading-[91px]`}>{title}</p>
          <p className={`${MagnetMedium.className} text-[16px] text-justify w-[30vw] italic leading-[160%]`}>
            {content}
          </p>
        </div>
      </div>
      <img src={image} className='ml-[5rem]' />
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
  const demoContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit.'
  return (
    <div className="min-h-[100vh] pb-[172px] pt-[50px] bg-[#f5dfc2] flex flex-col gap-[128px] w-[100vw]">
      <RightContent image={'Images/PNG/Journey1.png'} content={demoContent} title={'Our beginning'} time={2019} />
      <LeftContent image={'Images/PNG/Journey2.png'} content={demoContent} title={'How it all worked out?'} time={2020} />
      <RightContent image={'Images/PNG/Journey3.png'} content={demoContent} title={'The final nail.'} time={2022} />
    </div>
  )
}

export default Journey