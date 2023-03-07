import React from 'react'
import { imageBackgroundOptions } from 'components';
import { MagnetBold, MagnetLight } from 'pages/_app';

const ArtistHeader = () => {
  return (
    <div className="w-[90vw] h-[50vh] mt-[2rem] flex justify-center items-end rounded-lg" style={{
      backgroundImage: `url(${'Images/WEBP/hero.webp'})`,
      ...imageBackgroundOptions
    }}>
    <div style={{
      "background": "linear-gradient(180deg, rgba(0, 0, 0, 0) 50.11%, #000000 100%)"
    }} className="h-full w-full flex justify-center items-end">
        <div className="mb-[10px] flex flex-col gap-[10px] items-center">
      <div className="h-[150px] w-[150px] rounded-full" style={{
          backgroundImage: `url(${'Images/WEBP/ArtistProfile.webp'})`,
          ...imageBackgroundOptions,
          boxShadow: "0px 4px 40px #000000"
      }}/>
      <div className="flex flex-col items-center">
        <p className={`${MagnetBold.className} text-[32px] leading-[41px] text-white`}>Healing Hippies</p>
        <p className={`${MagnetLight.className} text-[14px] leading-[18px] opacity-50 text-white`}>Joined May 2023</p>
      </div>
    </div>
    </div>
  </div>
  )
}

export default ArtistHeader