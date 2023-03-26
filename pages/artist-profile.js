
import { ArtistHero } from 'components';
import { MagnetMedium } from 'pages/_app';

const ArtistProfile = () => {
  return (
    <div>
      <div className='pb-[125px] min-h-screen bg-[#f5dfc2]'>
        <ArtistHero showCards />
      </div>
    </div>
  )
}

export default ArtistProfile