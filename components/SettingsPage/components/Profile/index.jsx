import { imageBackgroundOptions } from '@/components'
import { MagnetMedium } from 'pages/_app';
import { Transition } from '@headlessui/react'
import { Store } from '@/utils';
import InputField from '@/components/Common/InputField';
import { useEffect, useState } from 'react';
import { web3 } from 'pages/_app';
import axios from 'axios';
import { useContext } from '@/utils/Context';
import { useRef } from 'react';
const {useTabStore, useUserStore} = Store



const ProfileSection = () => {
  const {selectedTab} = useTabStore()
  const {user, setUser} = useUserStore()
  const {setActiveModal:setActiveLoginModal,activeModal} = useContext()
  const [isImageHover, setisImageOver] = useState(false)
  const fileRef = useRef(null)

  const handleInputChange = (e,field)=>{
    setUser({
      ...user,
      [field]: e.target.value
    })
  }

  useEffect(()=>{
    const getAccount = async ()=>{
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts()
      setUser({
        ...user,
        walletAddress: accounts[0]
      })
    }
    getAccount()
  },[])

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(!token){
      setActiveLoginModal({
        ...activeModal,
        google: true
      })
      return
    }
    const getAccount = async ()=>{
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts()
      if(!accounts || accounts.length === 0){
        setActiveLoginModal({
          ...activeModal,
          wallet: true
        })
      }
    }
    getAccount()
  })

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
      const { displayName, username, bio, google, socials,boughtItems } = data.user
      setUser({
        displayName,
        username,
        shortBio: bio,
        boughtItems,
        email: google.email,
        profilePic: google.profilePic,
        website: socials.website,
        twitter: socials.twitter,
        instagram: socials.instagram
      })
    }
  }

  const handleFileChange = async (e)=>{
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    try {
      const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload/upload-s3`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'boundary': '----WebKitFormBoundary7MA4YWxkTrZu0gW'
        }
      })
      console.log('File uploaded successfully!', data.data)
      const profilePic =  data.data.Location
      const {data:updatedUser} = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/update/me`,{
        profilePic
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(updatedUser?.success){
        setUser()
      }
    } catch (error) {
      console.error('Error uploading file:', error)
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
          <div onMouseEnter={()=>setisImageOver(true)} onMouseLeave={()=>setisImageOver(false)} className="h-[130px] relative w-[130px] rounded-full" style={{
              backgroundImage: `url(${user?.profilePic || 'Images/WEBP/ArtistProfile.webp'})`,
              ...imageBackgroundOptions,
              boxShadow: "0px 4px 40px #000000",
          }}>
            <input onChange={handleFileChange} accept={"image/png, image/jpeg, image/jpg"} ref={fileRef} type='file' className='hidden' />
          <img onClick={()=>fileRef.current.click()} src='Images/SVG/Upload.svg' className={`absolute transition-all duration-300 ${isImageHover?'opacity-100':'opacity-0'} left-[43%] top-[45%] h-[1rem] z-[5]`}/>
            <div onClick={()=>fileRef.current.click()} className={`flex w-full transition-all duration-300 h-full ${isImageHover?'opacity-20':'opacity-0'} bg-black`}>
            </div>
          </div>
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