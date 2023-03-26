
import { MagnetBold, MagnetMedium, MagnetLight } from 'pages/_app';

const demoContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, ris us sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus.'

const Content = ({ content, title }) => {
  return (
    <div>
      <p className={`text-[24px] ${MagnetBold.className} leading-[30px] xl:text-left text-center tracking-[0.72em] `}>
        {title}
      </p>
      <p className={`text-[18px] mt-[12px] ${MagnetMedium.className} xl:text-left text-center leading-[23px] xl:w-[40vw] `}>
        {content}
      </p>
    </div>
  )
}

const Details = () => {
  return (
    <div className="pb-[72px] flex justify-center w-[100vw] pt-[20px]">
      <div className='w-[90vw] xl:mt-[0] mt-[1rem] flex flex-col gap-[90px]'>
        <Content content={demoContent} title={'ARTIST'} />
        <Content content={demoContent} title={'COLLECTION'} />
      </div>
    </div>
  )
}

export default Details