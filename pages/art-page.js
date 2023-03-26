import { ArtPageHero, Details, ItemActivity } from 'components'
import { MagnetMedium } from 'pages/_app';

const ArtPage = () => {
  return (
    <div>
      <div className='pb-[125px] bg-[#f5dfc2]'>
        <ArtPageHero />
        <Details />
        <ItemActivity />
      </div>
    </div>
  )
}

export default ArtPage