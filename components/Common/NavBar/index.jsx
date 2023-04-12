import { SignIn, Wallet,KycModal, Cart } from "@/components"
import { useContext } from "@/utils/Context"
import { MagnetBold, MagnetLight, MagnetRegular } from "pages/_app"
import { useState } from 'react';
import { Store } from "@/utils";
import { useRouter } from 'next/router';

const {useCartStore} = Store

const NavBar = ({isLogined}) => {
  const {activeModal, setActiveModal, user, setUser} = useContext()
  const [isClicked, setIsClicked] = useState(false)
  const {cartOpen,setCartOpen} = useCartStore()
  const router = useRouter()

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
  return (
    <>
      <SignIn/>
      <Wallet/>
      <KycModal/>
      <div className="w-[100vw] bg-[#f5dfc2] relative overflow-visible flex justify-center">
        <div className="w-[90vw] h-[70px] justify-between flex items-center">
          <div className="flex gap-[10px] h-[70px]  items-center">
            <img src='Images/SVG/Star.svg' />
            <p className={`${MagnetBold.className} text-[24px] overflow-hidden leading-[29px] text-black`}>
              ART ISLAND RODEO CLUB
            </p>

          </div>
          <div className='xl:flex hidden gap-[5px] h-[70px]  items-center'>
            <img className='opacity-50' src='Images/SVG/Search.svg' />
            <p className={`text-[18px] leading-[23px] opacity-50 ${MagnetLight.className}`}>
              Search NFTs, Collections...
            </p>
          </div>
          <div className='xl:flex hidden gap-[50px] h-[70px]  items-center'>
            <p className={`text-[18px] leading-[23px] opacity-50 ${MagnetLight.className}`}>
              Explore
            </p>
            <p className={`text-[18px] leading-[23px] opacity-50 ${MagnetLight.className}`}>
              Stats
            </p>
            <p className={`text-[18px] leading-[23px] opacity-50 ${MagnetLight.className}`}>
              Create
            </p>
            <div className="flex items-center gap-[10px]">
               <img onClick={handleClickProfile} src='Images/SVG/User.svg' />
              <img onClick={()=> setCartOpen(!cartOpen)} src='Images/SVG/Menu.svg' />
            </div>
          </div>
        </div>
        <div style={dropDownStyle} className={`min-h-[5rem] ${isClicked ? ' scale-1 opacity-100':'scale-0  opacity-0'} flex origin-top-right transition-all duration-300 w-[15rem] rounded-xl items-center justify-center z-[100] absolute right-[7rem] top-[4rem]`}>
            <div onClick={handleSetActiveModal} className={`w-[80%] cursor-pointer h-[2.5rem] ${isLogined ?'hidden': 'flex'} flex-col items-center justify-center bg-black rounded-lg`}>
              <p className={`text-white ${MagnetRegular.className}`}>Connect Wallet</p>
            </div>
            <div className={`w-[80%] ${!isLogined &&'hidden'} pt-[0.5rem]`}>
              <div className="h-[2.5rem] mt-[0.5rem] cursor-pointer border-b border-[rgba(0,0,0,0.25)]">
                <p className={`text-black text-[17px] ${MagnetRegular.className}`}>My Profile</p>
              </div>
              <div className="h-[2.5rem] mt-[0.5rem] cursor-pointer border-b border-[rgba(0,0,0,0.25)]">
                <p className={`text-black text-[17px] ${MagnetRegular.className}`}>Favourites</p>
              </div>
              <div className="h-[2.5rem] mt-[0.5rem] cursor-pointer border-b border-[rgba(0,0,0,0.25)]">
                <p className={`text-black text-[17px] ${MagnetRegular.className}`}>Transaction History</p>
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
        <Cart/>
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