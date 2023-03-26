import { ArtPageHero, Details, ItemActivity } from 'components'
import { MagnetMedium } from 'pages/_app';

const ArtPage = () => {
  return (
    <div>
      <div className='pb-[125px] bg-[#f5dfc2] xl:flex flex-col hidden'>
        <ArtPageHero />
        <Details />
        <ItemActivity />
      </div>
      <div className="xl:hidden flex items-center bg-[#f5dfc2] w-[100vw] h-[100vh] justify-center">
        <div className="w-[90vw]">
          <p className={`${MagnetMedium.className} text-[24px] text-center`}>
            This is a mobile version of the website. Please visit on a desktop
          </p>
        </div>
      </div>
    </div>
  )
}

export default ArtPage