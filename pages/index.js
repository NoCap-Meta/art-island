import { TopAndTrendingSection } from "@/components/TopAndTrendingSection"
import { Hero, Featured, Journey, Footer } from "components"

const Home = () => {
  return (
    <div>
      <div className="">
        <Hero />
        <TopAndTrendingSection />
        <Featured />
        <Journey />
        <Footer />
      </div>
    </div>
  )
}

export default Home

