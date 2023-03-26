import { SignIn, Wallet,KycModal } from "@/components"
import { useContext } from "@/utils/Context"
import { MagnetBold, MagnetLight } from "pages/_app"

const NavBar = ({isLogined}) => {
  const {activeModal, setActiveModal} = useContext()

  const handleSetActiveModal = () => {
    setActiveModal({
      ...activeModal,
      google: true
    })
  }
  return (
    <>
      <SignIn/>
      <Wallet/>
      <KycModal/>
      <div className="w-[100vw] flex justify-center">
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
            {isLogined && <img onClick={handleSetActiveModal} src='Images/SVG/User.svg' />}
            <img src='Images/SVG/Menu.svg' />
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default NavBar