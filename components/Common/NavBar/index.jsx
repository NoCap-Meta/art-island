import { SignIn, Wallet,KycModal } from "@/components"
import { useContext } from "@/utils/Context"
import { MagnetBold, MagnetLight, MagnetRegular } from "pages/_app"
import { useState } from 'react';
import { Store } from "@/utils";
import { useRouter } from 'next/router';

const {useCartStore, useSelectedArtistProfileTab, useArtistProfileOptionsStore} = Store

const NavBar = ({isLogined}) => {
  const {activeModal, setActiveModal, user, setUser} = useContext()
  const [isClicked, setIsClicked] = useState(false)
  const {cartOpen,setCartOpen} = useCartStore()
  const [searchInput, setSearchInput] = useState('')
  const router = useRouter()
  const {artistProfileOptions, setArtistProfileOptions} = useArtistProfileOptionsStore()
  const {selectedArtistProfileTab,setSelectedArtistProfileTab} = useSelectedArtistProfileTab()

  isLogined = user

  const handleSetActiveModal = () => {
   if(!isLogined){
    setActiveModal({
      ...activeModal,
      google: true
    })
    setIsClicked(false)
   }
  }

  const handleLogout = ()=>{
    localStorage.removeItem('token')
    setUser(null)
    setIsClicked(false)
    router.push('/')
  }

  const handleClickProfile = () => {
    setIsClicked(!isClicked)
  }

  const handleGoToProfile = (name)=>{
    setSelectedArtistProfileTab(name)
    
    let newArtistProfileOptions = artistProfileOptions.map((item)=>{
      if(item.name === name){
        return {
          ...item,
          selected: true
        }
      }else{
        return {
          ...item,
          selected: false
        }
      }
    })
    setArtistProfileOptions(newArtistProfileOptions)
    router.push('/artist-profile')
    setIsClicked(false)
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    let keyword = searchInput.split(' ').join(',')
    router.push(`/search?keyword=${keyword}`)
  }

  return (
    <>
      <SignIn/>
      <Wallet/>
      <KycModal/>
      <div className="w-[100vw] bg-[#f5dfc2] relative overflow-visible flex justify-center">
        <div className="w-[90vw] h-[70px] justify-between flex items-center">
          <div className="flex gap-[10px] h-[70px]  items-center">
            <img src='Images/PNG/NoCap.png' className='h-[3rem]' />
            <p onClick={()=>router.push('/')} className={`${MagnetBold.className} text-[24px] cursor-pointer overflow-hidden leading-[29px] text-black`}>
              NoCap.Network
            </p>
          </div>
          <div className='xl:flex hidden gap-[5px] h-[70px]  items-center'>
            <img onClick={(e)=>handleSubmit(e)} className='opacity-50 cursor-pointer' src='Images/SVG/Search.svg' />
            <form onSubmit={(e)=>handleSubmit(e)}>
              <input value={searchInput} onChange={(e)=>setSearchInput(e.target.value)} autoComplete="new-password" className={`w-[15rem] bg-[#f5dfc2] px-[10px]  h-[2.5rem] ${MagnetRegular.className} text-[17px] focus:outline-none focus:border-none text-black opacity-50`} placeholder='Search NFTs, Collections...' />
            </form>
          </div>
          <div className='xl:flex hidden gap-[50px] h-[70px]  items-center'>
            <p onClick={()=>router.push('/explore')} className={`text-[18px] leading-[23px] cursor-pointer opacity-50 ${MagnetLight.className}`}>
              Explore
            </p>
            <p onClick={()=>router.push('/collectionstats')}  className={`text-[18px] cursor-pointer leading-[23px] opacity-50 ${MagnetLight.className}`}>
              Stats
            </p>
            <p onClick={()=>router.push('/my-collections')} className={`text-[18px] cursor-pointer leading-[23px] opacity-50 ${MagnetLight.className}`}>
              Create
            </p>
            <div className="flex items-center gap-[10px]">
              <img onClick={handleClickProfile} src='Images/SVG/User.svg' />
              {/* <img onClick={()=> setCartOpen(!cartOpen)} src='Images/SVG/Menu.svg' /> */}
            </div>
          </div>
        </div>
        <div style={dropDownStyle} className={`min-h-[5rem] ${isClicked ? ' scale-1 opacity-100':'scale-0  opacity-0'} flex origin-top-right transition-all duration-300 w-[15rem] rounded-xl items-center justify-center z-[100] absolute right-[7rem] top-[4rem]`}>
            <div onClick={handleSetActiveModal} className={`w-[80%] cursor-pointer h-[2.5rem] ${isLogined ?'hidden': 'flex'} flex-col items-center justify-center bg-black rounded-lg`}>
              <p className={`text-white ${MagnetRegular.className}`}>Connect Wallet</p>
            </div>
            <div className={`w-[80%] ${!isLogined &&'hidden'} pt-[0.5rem]`}>
              <div onClick={()=>handleGoToProfile('Featured')}className="h-[2.5rem] mt-[0.5rem] cursor-pointer border-b border-[rgba(0,0,0,0.25)]">
                <p className={`text-black text-[17px] ${MagnetRegular.className}`}>My Profile</p>
              </div>
              <div  className="h-[2.5rem] mt-[0.5rem] cursor-pointer border-b border-[rgba(0,0,0,0.25)]">
                <p className={`text-black text-[17px] ${MagnetRegular.className}`}>Favourites</p>
              </div>
              <div onClick={()=>handleGoToProfile('Transaction History')} className="h-[2.5rem] mt-[0.5rem] cursor-pointer border-b border-[rgba(0,0,0,0.25)]">
                <p className={`text-black text-[17px] ${MagnetRegular.className}`}>Transaction History</p>
              </div>
              <div onClick={()=>{
                router.push('/my-collections')
                setIsClicked(false)
              }} className="h-[2.5rem] mt-[0.5rem] cursor-pointer border-b border-[rgba(0,0,0,0.25)]">
                <p className={`text-black text-[17px] ${MagnetRegular.className}`}>My Collections</p>
              </div>
              <div onClick={()=>{
                router.push('/settings')
                setIsClicked(false)
              }} className="h-[2.5rem] mt-[0.5rem] cursor-pointer border-b border-[rgba(0,0,0,0.25)]">
                <p className={`text-black text-[17px] ${MagnetRegular.className}`}>Settings</p>
              </div>
              <div onClick={handleLogout} className="h-[2.5rem] my-[0.5rem] cursor-pointer flex items-center  gap-[1rem]">
                <img src='Images/SVG/Logout.svg' className="h-[20px]" />
                <p className={`text-black text-[17px] opacity-50 ${MagnetRegular.className}`}>Log out</p>
              </div>
            </div>
        </div> 
        {/* <Cart/> */}
      </div>
    </>
  )
}

const dropDownStyle = {
  background: 'linear-gradient(142.9deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.1) 100%)',
  border: '1px solid #000000',
  backdropFilter: 'blur(15px)',
  borderRadius: '6px'
}

export default NavBar