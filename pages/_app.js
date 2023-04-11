import '../styles/globals.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MetaMaskProvider } from "metamask-react";
import { ContextProvider } from 'utils/Context/index'
import localFont from 'next/font/local'
import 'rc-slider/assets/index.css';
import NavBar from 'components/Common/NavBar/index.jsx'
import "react-toggle/style.css"


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
      <MetaMaskProvider>
        <ContextProvider>
          <NavBar />
          <Component {...pageProps} />
        </ContextProvider>
      </MetaMaskProvider>
    </main>
  )
}
