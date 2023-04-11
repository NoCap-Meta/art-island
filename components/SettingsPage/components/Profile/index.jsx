import { imageBackgroundOptions } from '@/components'
import { MagnetMedium } from 'pages/_app';
import { MagnetRegular } from '../../../../pages/_app';
import { Transition } from '@headlessui/react'
import { Store } from '@/utils';

const {useTabStore} = Store

const InputField = ({placeholder, children, type, isArea, width, preIcon, disabledDiv}) => {
  return (
    <div className='mt-[1rem] relative'>
      {preIcon && <div className='absolute left-[0.8rem] bottom-[0.8rem]'>{preIcon}</div>}
      <p className={`text-[#000000] text-[16px] ${MagnetMedium.className}`}>{children}</p>
      {disabledDiv && <div className={`${width?width:'w-[100%]'} ${MagnetRegular.className} flex items-center relative h-[40px] mt-[5px]  rounded-md border-[1px] border-[#000] text-[#000000] text-[14px] focus:outline-none focus:border-none`}>
        <p className='opacity-50 text-[14px] ml-[1rem]'>{placeholder}</p>
        <img src='Images/SVG/Copy.svg' className='absolute cursor-pointer right-[0.8rem] bottom-[0.5rem]'/>
      </div>}
      {!isArea && !disabledDiv && <input autoComplete="new-password" className={`${width?width:'w-[100%]'} ${MagnetRegular.className} h-[40px] mt-[5px]  rounded-md bg-[rgb(255,255,255,0.5)] ${preIcon ? 'pl-[3rem] pr-[1rem]':'px-[1rem]'} text-[#000000] text-[14px] focus:outline-none focus:border-none`} type={type||'text'} placeholder={placeholder}/>}
      {isArea && !disabledDiv && <textarea autoComplete="new-password" className={`${width?width:'w-[100%]'} ${MagnetRegular.className} h-[100px] mt-[5px] pt-[10px]  rounded-md bg-[rgb(255,255,255,0.5)] ${preIcon ? 'pl-[3rem] pr-[1rem]':'px-[1rem]'} text-[#000000] text-[14px] focus:outline-none focus:border-none`} type={type||'text'} placeholder={placeholder}/>}
    </div>
  )
}

const ProfileSection = () => {
  const {selectedTab} = useTabStore()
  return (
    <Transition
    show={selectedTab === 'Profile'}
    enter="transition-opacity z-[100] duration-300"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    
    
  >
       
      <div className="w-[100%] h-[35vh] flex justify-center items-center rounded-md" style={{
          backgroundImage: `url(${'Images/WEBP/hero.webp'})`,
          ...imageBackgroundOptions
        }}>
          <div className="h-[130px] w-[130px] rounded-full" style={{
              backgroundImage: `url(${'Images/WEBP/ArtistProfile.webp'})`,
              ...imageBackgroundOptions,
              boxShadow: "0px 4px 40px #000000"
          }}/>
      </div>
      <InputField placeholder='Enter your display name' type='text'>Display Name</InputField>
      <InputField preIcon={<img src='Images/SVG/At.svg'/>} placeholder='enter your username' type='email'>Username</InputField>
      <InputField placeholder='Tell us about yourself in a few words...' type='text' isArea>Short Bio</InputField>
      <InputField placeholder='email@address.com' type='email'>Email Address</InputField>
      <InputField placeholder={'0x9c5e31928780dfa4534fewvewf6743580ec4f94780a6a541'} disabledDiv={true}>Wallet Address</InputField>

      <div className='mt-[3rem]'>
        <p className={`text-[18px] ${MagnetMedium.className} text-[#000000]`}>Social Links</p>
        <p className={`text-[16px] ${MagnetMedium.className} opacity-50 text-[#000000]`}>Add your existing social links to build a stronger reputation</p>
      </div>
      <InputField  placeholder='https://' width={'w-[60%]'} type='url'>Website URL</InputField>
      <InputField preIcon={<img src='Images/SVG/At.svg'/>} placeholder='enter your twitter username' width={'w-[60%]'} type='text'>Twitter</InputField>
      <InputField preIcon={<img src='Images/SVG/At.svg'/>} placeholder='enter your instagram username' width={'w-[60%]'} type='text'>Instagram</InputField>

      <button className={`mt-[3rem] ${MagnetMedium.className} w-[10rem] h-[40px] rounded-md bg-[#000000] text-[#FFFFFF] text-[16px]`}>Save</button>

  </Transition>
  )
}

export default ProfileSection