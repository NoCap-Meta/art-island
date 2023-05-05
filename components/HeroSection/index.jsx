import { MagnetLight, MagnetRegular, MagnetBold } from 'pages/_app'
import { NavBar } from '../Common'

const Hero = () => {
  return (
    <>
      <div className="min-h-[100vh] bg-[#f5dfc2] w-[100vw] pb-[125px]">
        <div className='xl:h-[25vh] h-[30vh] w-[100vw] flex flex-col items-center justify-center'>
          <p className={`${MagnetLight.className} xl:text-[50px] text-[48px] xl:leading-[91px] text-center`}>
            Invest like never before with <span className={MagnetRegular.className}><i>NoCap.network</i></span>
          </p>
          <p className={`${MagnetLight.className} text-center text-[24px] leading-[30px] `}>
              The asset-backed token marketplace that democratizes access to high-value assets.
              <br />Diversify your portfolio, reduce risk, and enjoy hassle-free management.

            </p>
        </div>
        <div className='w-[100vw] flex flex-col items-center'>
          <div style={{
            backgroundImage: `url(Images/PNG/Nocap-Network_Banner.jpg)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'

          }} className='h-[450px] w-[75vw] bg-black' />
          <div className='w-[95vw] mt-[32px] flex xl:flex-row flex-col items-center  xl:justify-between'>
            
            {/* <p className={`${MagnetRegular.className} text-[24px] leading-[30px] tracking-[0.72em]`}>
              2022
            </p> */}
          </div>
          
        </div>
      </div>
    </>
  )
}

export default Hero