import { imageBackgroundOptions } from '@/components'
import { MagnetMedium } from 'pages/_app';

import { Transition } from '@headlessui/react'
import { Store } from '@/utils';
import InputField from '@/components/Common/InputField';
import { useEffect } from 'react';
import axios from 'axios';

const {useTabStore, useUserStore} = Store



const ProfileSection = () => {
  const {selectedTab} = useTabStore()
  const {user, setUser} = useUserStore()

  const handleInputChange = (e,field)=>{
    setUser({
      ...user,
      [field]: e.target.value
    })
  }

  const handleSave = async ()=>{
    const {data} = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/update/me`,{
      ...user,
      bio: user.shortBio || ''
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    if(data?.success){
      const { displayName, username, bio, walletAddress, google, socials } = data.user
      setUser({
        displayName,
        username,
        shortBio: bio,
        walletAddress,
        email: google.email,
        profilePic: google.profilePic,
        website: socials.website,
        twitter: socials.twitter,
        instagram: socials.instagram
      })
    }
  }

  

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
              backgroundImage: `url(${user?.profilePic || 'Images/WEBP/ArtistProfile.webp'})`,
              ...imageBackgroundOptions,
              boxShadow: "0px 4px 40px #000000"
          }}/>
      </div>
      <InputField onChange={(e)=>handleInputChange(e,'displayName')} value={user?.displayName} placeholder='Enter your display name' type='text'>Display Name</InputField>
      <InputField onChange={(e)=>handleInputChange(e,'username')} value={user?.username} preIcon={<img src='Images/SVG/At.svg'/>} placeholder='enter your username' type='email'>Username</InputField>
      <InputField onChange={(e)=>handleInputChange(e,'shortBio')} value={user?.bio} placeholder='Tell us about yourself in a few words...' type='text' isArea>Short Bio</InputField>
      <InputField onChange={(e)=>handleInputChange(e,'email')} value={user?.email} placeholder='email@address.com' type='email'>Email Address</InputField>
      <InputField onChange={(e)=>handleInputChange(e,'walletAddress')} placeholder={user?.walletAddress} disabledDiv={true}>Wallet Address</InputField>

      <div className='mt-[3rem]'>
        <p className={`text-[18px] ${MagnetMedium.className} text-[#000000]`}>Social Links</p>
        <p className={`text-[16px] ${MagnetMedium.className} opacity-50 text-[#000000]`}>Add your existing social links to build a stronger reputation</p>
      </div>
      <InputField onChange={(e)=>handleInputChange(e,'website')} value={user?.website}  placeholder='https://' width={'w-[60%]'} type='url'>Website URL</InputField>
      <InputField onChange={(e)=>handleInputChange(e,'twitter')} value={user?.twitter} preIcon={<img src='Images/SVG/At.svg'/>} placeholder='enter your twitter username' width={'w-[60%]'} type='text'>Twitter</InputField>
      <InputField onChange={(e)=>handleInputChange(e,'instagram')} value={user?.instagram} preIcon={<img src='Images/SVG/At.svg'/>} placeholder='enter your instagram username' width={'w-[60%]'} type='text'>Instagram</InputField>

      <button onClick={handleSave} className={`mt-[3rem] ${MagnetMedium.className} w-[10rem] h-[40px] rounded-md bg-[#000000] text-[#FFFFFF] text-[16px]`}>Save</button>

  </Transition>
  )
}

export default ProfileSection