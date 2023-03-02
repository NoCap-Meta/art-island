
import { MagnetLight, MagnetRegular } from 'pages/_app';
const Footer = () => {
  return (
    <>
      <div className="h-[60vh] flex justify-between overflow-y-hidden items-center bg-black w-[100vw]">
        <div className='overflow-y-hidden pt-[56px]'>
          <div className="overflow-y-hidden ml-[1rem]">
            <div>
              <p className={`${MagnetLight.className} text-white text-[72px] leading-[91px]`}>
                Other Collections.
              </p>
              <p className={`${MagnetLight.className} text-[16px] leading-[160%] text-white w-[30vw] italic mt-[12px]`}>
                Still curated by us ; with love.
              </p>
            </div>
            <img src='Images/PNG/Success1.png' className='mt-[-4rem]' />
          </div>
        </div>
        <div className='flex gap-[1rem] mr-[-15rem]'>
          <img src='Images/PNG/Footer1.png' className='h-[300px] w-[300px]' />
          <img src='Images/PNG/Footer2.png' className='h-[300px] w-[300px]' />
          <img src='Images/PNG/Footer3.png' className='h-[300px] w-[300px]' />
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