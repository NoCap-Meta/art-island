import { useState, useEffect } from 'react'
import { DropDownInput, FooterCommon } from '../Common'
import TopCollectionSection, { BuyItemCard } from '../Common/TopCollectionSection/index';
import { MagnetBold, MagnetRegular } from 'pages/_app';
import {useRouter} from 'next/router';
import ItemCard from '../Common/ItemCard';
import { Filter } from '../Filter/index';
import axios from 'axios';

const SearchPageComponent = () => {
  //query
  const router = useRouter()
  const {keyword} = router.query
  const [result, setResult] = useState([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  
  const keywords = keyword && keyword.split(',');
  const [sortBy, setSortBy] = useState('Time')

  useEffect(()=>{
    const getItems = async ()=>{
      console.log(keyword)
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items/search/${keyword.replace('%7D','')}`)

      if(data.success){
        setResult(data.items)
      }
    }

    if(keyword){
      getItems()
    }
  },[keyword])

  const sort = (items, field) => {
    if(items.length <= 1){
      return items
    }
    const pivot = items[items.length-1]
    const left = []
    const right = []
    for(let i = 0; i < items.length-1; i++){
      if(items[i][field] < pivot[field]){
        left.push(items[i])
      }else{
        right.push(items[i])
      }
    }
    return [...sort(left, field), pivot, ...sort(right, field)]

  }

  useEffect(()=>{
    if(sortBy === 'Time'){
      setResult(sort(result, 'createdAt'))
    }else{
      setResult(sort(result, 'pricePerFraction'))
    }
  },[sortBy])


  return (
    <div className='mt-[3rem] min-h-[80vh] overflow-visible'>
        <div className='w-[90vw] overflow-visible justify-between flex'>
          <img src='Images/SVG/Filter.svg' onClick={()=>setIsFilterOpen(e=>!e)} className='cursor-pointer'/>
          <div className='overflow-visible flex gap-[1rem]'>
            <DropDownInput value={sortBy} onChange={(e)=>setSortBy(e)} options={['Price', 'Time']} preIcon={ <img src='Images/SVG/Refresh.svg' className='scale-75 opacity-50'/>} width='w-[15vw]' />
            <div className="flex gap-[10px]">
              <img src="Images/SVG/Grid.svg"/>
              <img className="opacity-50 " src="Images/SVG/GridH.svg"/>
            </div>
          </div>
        </div>
      <div className='flex gap-[2rem]'>
          {isFilterOpen && <Filter/>}
          <div className={`${isFilterOpen?'w-[65vw]':'w-[90vw]'}`}>
            <div className='w-[100%]'>
              <TopCollectionSection title={'Items Results'} />
            </div>

            <div className='w-[100%] mt-[3rem]'>
              <p className={`${MagnetBold.className} text-[20px] leading-[25px] font-bold`}>{result.length} Results</p>
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
                  result.map((item)=>{
                    return (
                      <BuyItemCard item={item} items={result}/>
                    )
                  }
                  )
                }
              </div>
              {
                result.length==0 && <div className='w-[100%] mt-[2rem] flex gap-[2rem] flex-wrap'>
                  <p className={`${MagnetRegular.className} text-[18px] leading-[25px]`}>No results found</p>
                </div>
              }
            </div>
          </div>
      </div>
      
    </div>
  )
}

export default SearchPageComponent