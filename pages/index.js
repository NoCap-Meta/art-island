import { Hero, Featured, Browse, Journey, Footer } from "components"
import { MagnetMedium } from 'pages/_app';

const Home = () => {
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