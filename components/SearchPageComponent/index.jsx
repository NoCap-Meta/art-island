import { useState } from 'react'
import { DropDownInput, FooterCommon } from '../Common'
import TopCollectionSection from '../Common/TopCollectionSection/index';
import { MagnetBold, MagnetRegular } from 'pages/_app';
import {useRouter} from 'next/router';
import ItemCard from '../Common/ItemCard';
import { Filter } from '../Filter/index';

const SearchPageComponent = () => {
  //query
  const router = useRouter()
  const {keyword} = router.query
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  const keywords = keyword && keyword.split(',');


  return (
    <div className='mt-[3rem] overflow-visible'>
        <div className='w-[90vw] overflow-visible justify-between flex'>
          <img src='Images/SVG/Filter.svg' onClick={()=>setIsFilterOpen(e=>!e)} className='cursor-pointer'/>
          <div className='overflow-visible flex gap-[1rem]'>
            <DropDownInput options={['Sort By', 'Price', 'Time']} preIcon={ <img src='Images/SVG/Refresh.svg' className='scale-75 opacity-50'/>} width='w-[15vw]' />
            <div className="flex gap-[10px]">
              <img src="Images/SVG/Grid.svg"/>
              <img className=" opacity-50" src="Images/SVG/GridH.svg"/>
            </div>
          </div>
        </div>
      <div className='flex gap-[2rem]'>
          {isFilterOpen && <Filter/>}
          <div className={`${isFilterOpen?'w-[65vw]':'w-[90vw]'}`}>
            <div className='w-[100%]'>
              <TopCollectionSection title={'Collection Results'} />
            </div>

            <div className='w-[100%] mt-[3rem]'>
              <p className={`${MagnetBold.className} text-[20px] leading-[25px] font-bold`}>2324 Results</p>
              <div className='mt-[1rem] flex gap-[1rem]'>
                {
                  keywords && keywords.length>0 && keywords.map((keyword)=>{
                    return (
                      <div className='pl-[1rem] flex items-center py-[0.1rem] rounded-md gap-[0.5rem] bg-white'>
                        <p className={`${MagnetRegular.className} text-[18px] leading-[25px]`}>{keyword}</p>
                        <img src='Images/SVG/Cross-small.svg' className='pr-[10px]'/>
                      </div>
                    )
                  })
                }

                <p className={`${MagnetRegular.className} text-[18px] leading-[25px]`}>Clear All</p>
              </div>

              <div className='w-[100%] mt-[2rem] flex gap-[2rem] flex-wrap'>
                {
                  [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((item)=>{
                    return (
                      <ItemCard/>
                    )
                  }
                  )
                }
              </div>
            </div>
          </div>
      </div>
      <FooterCommon/>
    </div>
  )
}

export default SearchPageComponent