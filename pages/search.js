import { SearchPageComponent } from "@/components"
import { FooterCommon } from "@/components/Common"

const SearchPage = () => {
  return (
    <div className="overflow-visible">
      <div className=' flex flex-col items-center  bg-[#f5dfc2]'>
        <SearchPageComponent />
        <FooterCommon />
      </div>

    </div>
  )
}

export default SearchPage