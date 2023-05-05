import { MagnetLight, MagnetRegular, MagnetBold } from 'pages/_app'
import { NavBar } from '../Common'

const Hero = () => {
  return (
    <>
      <div className="min-h-[100vh] bg-[#f5dfc2] w-[100vw] pb-[125px]">
        <div className='xl:h-[70vh] h-[50vh] w-[100vw] flex items-center justify-center'>
          <p className={`${MagnetLight.className} xl:text-[72px] text-[48px] xl:leading-[91px] text-center`}>
            Invest like never before with <span className={MagnetRegular.className}><i>NoCap.network</i></span>
          </p>
        </div>
        <div className='w-[100vw] flex flex-col items-center'>
          <div style={{
            backgroundImage: `url(Images/PNG/Nocap-Network_Banner.jpg)`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'

          }} className='h-[449px] w-[95vw] bg-black' />
          <div className='w-[95vw] mt-[32px] flex xl:flex-row flex-col items-center  xl:justify-between'>
            <p className={`${MagnetBold.className} text-[24px] leading-[30px] `}>
              the asset-backed token marketplace that democratizes access to high-value assets.
              <br />Diversify your portfolio, reduce risk, and enjoy hassle-free management.

            </p>
            {/* <p className={`${MagnetRegular.className} text-[24px] leading-[30px] tracking-[0.72em]`}>
              2022
            </p> */}
          </div>
          <div className='mt-[12px] w-[95vw]'>
            <p className={`${MagnetRegular.className} xl:w-[35vw] text-center xl:text-left text-[18px] leading-[23px] `}>
              <span className={MagnetBold.className}><i> Grow your Nest : </i></span> Access high entry barrier assets and make potentially strong returns with our token marketplace. Invest like a pro, without the need for a trust fund.
              <br /><br />
              <span className={MagnetBold.className}><i>Fort Knox x Concierge : </i></span>  Enjoy peace of mind with our top-notch storage and management solutions. Let us handle the nitty-gritty while you focus on investing.
              <br /><br />
              <span className={MagnetBold.className}><i>Diverse Asset Blend : </i></span>  Our platform offers a range of tokenized assets for you to choose from, enabling you to diversify your portfolio and manage your risk effectively.

            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Hero