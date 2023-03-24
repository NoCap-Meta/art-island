import { Hero, Featured, Browse, Journey, Footer } from "components"
import { useRouter } from "next/router";
import { useContext } from 'utils/Context/index.jsx'
import { MagnetMedium } from 'pages/_app';
import jwt_decode from "jwt-decode";
import { useMetaMask } from 'metamask-react';
import axios from "axios";
import { useEffect } from "react";

const Home = () => {
  const router = useRouter()
  const { setAuthToken, setUser, setActiveModal, } = useContext()

  if (router.query?.token) {
    setAuthToken(router.query.token)
    localStorage.setItem('token', router.query.token)
    const decoded = jwt_decode(router.query.token)
    setUser(decoded?.user)
    router.push('/')
    setActiveModal({
      google: false,
      wallet: true,
      kyc: false
    })
  }


  return (

    <div>
      <div className="md:flex flex-col hidden">
        <Hero />
        <Featured />
        <Browse />
        <Journey />
        <Footer />
      </div>
      <div className="md:hidden flex items-center bg-[#f5dfc2] w-[100vw] h-[100vh] justify-center">
        <div className="w-[90vw]">
          <p className={`${MagnetMedium.className} text-[24px] text-center`}>
            This is a mobile version of the website. Please visit on a desktop
          </p>
        </div>
      </div>
    </div>
  )
}

export default Home