import { MagnetLight, MagnetRegular } from 'pages/_app';

const Featured = () => {
  return (
    <div className="w-[100vw] xl:h-[100vh] flex xl:items-center xl:pt-[0] pt-[20px] justify-center bg-black">
      <div className="xl:h-[80vh] pb-[20px] xl:justify-between w-[95vw] xl:items-end items-center flex xl:gap-[0] gap-[1rem] xl:flex-row flex-col">
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
        <img src='Images/PNG/Featured1.png' className='xl:h-[100%] h-[20rem] xl:w-auto w-auto' />
        <img src='Images/PNG/Featured2.png' className='xl:h-[512px] xl:w-auto h-[20rem] w-auto' />
      </div>
    </div>
  )
}

export default Featured