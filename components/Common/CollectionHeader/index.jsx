import { imageBackgroundOptions } from 'components';
import { MagnetBold, MagnetLight } from 'pages/_app';
import { Store, useGetWalletAddress } from '@/utils';

const CollectionHeader = ({ collection }) => {
  console.log(collection)
  return (
    <>
      <div className="w-[90vw] h-[50vh] mt-[2rem] flex justify-center items-end rounded-lg" style={{
        backgroundImage: `url(${collection?.[0].banner || 'Images/WEBP/hero.webp'})`,
        ...imageBackgroundOptions
      }}>
        <div style={{
          "background": "linear-gradient(180deg, rgba(0, 0, 0, 0) 50.11%, #000000 100%)"
        }} className="flex items-end justify-center w-full h-full">
          <div className="mb-[10px] flex flex-col gap-[10px] items-center">
            <div className="h-[150px] w-[150px] rounded-full" style={{
              backgroundImage: `url(${collection?.[0].logo || 'Images/WEBP/ArtistProfile.webp'})`,
              ...imageBackgroundOptions,
            }} />
            <div className="flex flex-col items-center">
              <p className={`${MagnetBold.className} text-[32px] leading-[41px] text-white`}>{collection?.[0].name || ''}</p>
              {/* <p className={`${MagnetLight.className} text-[14px] leading-[18px] opacity-50 text-white`}>{collection?.[0].desc || ''}</p> */}
            </div>
          </div>
        </div>
      </div>
      <div className="w-[90vw] border-b border-black pb-[1rem] flex flex-col mt-[20px] gap-[10px] items-center justify-center">
          <p className={`text-center ${MagnetLight.className} text-[20px] leading-[25px]`}>
          {collection?.[0].desc || ''}
          </p>
         {collection?.[0].sponseredBy && <p className={`text-center ${MagnetLight.className} text-[20px] leading-[25px]`}>
            Sponsored By: {collection?.[0].sponseredBy || ''}
          </p>}
         
        </div>
    </>
  )
}

export default CollectionHeader