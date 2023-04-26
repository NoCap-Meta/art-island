import '../styles/globals.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MetaMaskProvider } from "metamask-react";
import { ContextProvider } from 'utils/Context/index'
import localFont from 'next/font/local'
import 'rc-slider/assets/index.css';
import NavBar from 'components/Common/NavBar/index.jsx'
import "react-toggle/style.css"
import AuthChecker from '../components/AuthChecker/index';
import Web3 from 'web3';
import { ethers } from 'ethers';
import { SEO } from '@/components';

export let web3;
export let ethersProvider;
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  web3 = new Web3(window.ethereum);
  ethersProvider = new ethers.providers.Web3Provider(window.ethereum);
} else {
  // We are on the server *OR* the user is not running metamask
}


export const MagnetRegular = localFont({
  src: '../public/fonts/Magnat-HeadRegular.woff2',

})

export const MagnetLight = localFont({
  src: '../public/fonts/Magnat-HeadLight.woff2',
})

export const MagnetBold = localFont({
  src: '../public/fonts/Magnat-HeadBold.woff2',

})

export const MagnetMedium = localFont({
  src: '../public/fonts/Magnat-HeadMedium.woff2',
})

export default function App({ Component, pageProps }) {


  return (
    <main>
      <SEO title='NoCap.Network - Antique NFT Marketplace' />
      <MetaMaskProvider>
        <ContextProvider>
          <AuthChecker>
            <NavBar />
            <Component {...pageProps} />
          </AuthChecker>
        </ContextProvider>
      </MetaMaskProvider>
    </main>
  )
}
