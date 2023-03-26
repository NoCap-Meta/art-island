
import { MagnetLight, MagnetRegular } from 'pages/_app';
const Footer = () => {
  return (
    <>
      <div className="h-[60vh] flex xl:flex-row flex-col xl:justify-between overflow-y-hidden xl:items-center bg-black w-[100vw]">
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
        <div className='flex xl:flex-nowrap xl:mt-[0] mt-[1rem] flex-wrap xl:justify-start justify-center gap-[1rem] xl:mr-[-15rem]'>
          <img src='Images/PNG/Footer1.png' className='xl:h-[300px] xl:rounded-none rounded-xl h-[150px] w-[150px] xl:w-[300px]' />
          <img src='Images/PNG/Footer2.png' className='xl:h-[300px] xl:rounded-none rounded-xl h-[150px] w-[150px] xl:w-[300px]' />
          <img src='Images/PNG/Footer3.png' className='xl:h-[300px] xl:rounded-none rounded-xl h-[150px] w-[150px] xl:w-[300px]' />
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