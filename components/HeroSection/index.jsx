import { MagnetLight, MagnetRegular, MagnetBold } from 'pages/_app'

const Hero = () => {
  return (
    <div className="min-h-[100vh] bg-[#f5dfc2] w-[100vw] pb-[125px]">
      <div className="h-[60px] flex justify-center w-[100vw] items-center">
        <div className="w-[95%] flex justify-between items-center">
          <img src="Images/SVG/Star.svg" />
          <p className={`${MagnetBold.className} text-[24px] leading-[30px]`}>ART ISLAND RODEO CLUB</p>
          <img src="Images/SVG/Menu.svg" />
        </div>
      </div>
      <div className='h-[70vh] w-[100vw] flex items-center justify-center'>
        <p className={`${MagnetLight.className} text-[72px] leading-[91px] text-center`}>
          Thou art can and <span className={MagnetRegular.className}><i>will</i></span> save us ; it’s <br /> only a matter of time.
        </p>
      </div>
      <div className='w-[100vw] flex flex-col items-center'>
        <div style={{
          backgroundImage: `url(Images/PNG/HeroImage.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center'

        }} className='h-[449px] w-[95vw] bg-black' />
        <div className='w-[95vw] mt-[32px] flex justify-between'>
          <p className={`${MagnetBold.className} text-[24px] leading-[30px] tracking-[0.72em]`}>
            MUNTAXIR
          </p>
          <p className={`${MagnetRegular.className} text-[24px] leading-[30px] tracking-[0.72em]`}>
            2022
          </p>
        </div>
        <div className='mt-[12px] w-[95vw]'>
          <p className={`${MagnetRegular.className} w-[35vw] text-[18px] leading-[23px] italic`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim,
            metus nec fringilla accumsan, risus sem sollicitudin lacus,
            ut interdum tellus elit sed risus. Maecenas eget condimentum velit.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Etiam eu turpis molestie, dictum est a, mattis tellus.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Hero