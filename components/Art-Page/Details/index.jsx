
import { useSelectedItemStore } from '@/utils/Zustand';
import { MagnetBold, MagnetMedium, MagnetLight } from 'pages/_app';
import parse from 'html-react-parser'
import dynamic from "next/dynamic"
const { MapContainer, Marker, Popup, TileLayer } = dynamic(() => import('react-leaflet'), { ssr: false })

const demoContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, ris us sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.'

const Content = ({ content, title }) => {
  return (
    <div className='w-[50vw]'>
      <p className={`text-[24px] ${MagnetBold.className} leading-[30px] xl:text-left text-center tracking-[0.2em] `}>
        {title}
      </p>
      <p className={`text-[18px] mt-[12px] ${MagnetMedium.className} xl:text-left text-center leading-[23px] xl:w-[40vw] `}>
        {content}
      </p>
    </div>
  )
}

const Details = () => {
  const {selectedItem:item, setSelectedItem} = useSelectedItemStore()

  

  return (
    <div className="pb-[72px] flex justify-center w-[100vw] pt-[20px]">
      <div className='w-[90vw] xl:mt-[0] mt-[1rem] flex flex-col gap-[90px]'>
        <div className='flex gap-[1rem]'>
          <Content content={parse(item?.desc || '')} title={'ABOUT THIS LISTING'} />
          <Content content={item?.collection?.desc} title={'ABOUT THE DROP'} />
        </div>
        <div className='flex gap-[1rem]'>
          <Content content={''} title={''} />
          <div className={`w-[100%] ${MagnetMedium.className} w-[50vw] rounded-xl bg-[rgba(255,255,255,0.5)] p-[12px] border mt-[1rem] border-[rgba(0,0,0,0.5)]`}>
              <p className={`text-[24px] ${MagnetBold.className} leading-[30px] xl:text-left text-center tracking-[0.2em] `}>
                IMPORT TOKEN
              </p>
              <>
              <p>Token ID: {item?.tokenId}</p>
              <p>Token Address: {item?.itemTokenAddress}</p>
              </>
            </div>
        </div>
        {item?.metaData && item?.metaData?.address && <>
          <p className={`text-[24px] ${MagnetBold.className} leading-[30px] xl:text-left text-center tracking-[0.2em] `}>
          Property's Neightbourhood
              </p>
          <iframe className='h-[30vw] mt-[-4rem]' src = {"https://maps.google.com/maps?q=" + item.metaData.lat+','+item.metaData.lng+"&hl=es;z=14&output=embed"}></iframe>
        </>}
      </div>
    </div>
  )
}

export default Details