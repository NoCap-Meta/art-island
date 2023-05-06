import {useState, useEffect} from 'react'
import { MagnetBold, MagnetLight, MagnetMedium } from 'pages/_app';
import { DropDownInput } from '../Common';
import axios from 'axios';


const Table = ({data=[]})=>{
  return (
    <>
      <div className='w-[100%] justify-between flex'>
        <div className='w-[5%]'>
          <p className={`${MagnetMedium.className} text-[14px] leading-[18px] opacity-50 text-right text-[#000000]`}>#</p>
        </div>
        <div className='w-[25%]'>
          <p className={`${MagnetMedium.className} text-[14px] leading-[18px] opacity-50 text-[#000000]`}>COLLECTION</p>
        </div>
        <div className='w-[10%]'>
          <p className={`${MagnetMedium.className} text-[14px] leading-[18px] opacity-50 text-right text-[#000000]`}>VOLUME</p>
        </div>
        <div className='w-[10%]'>
          <p className={`${MagnetMedium.className} text-[14px] leading-[18px] opacity-50 text-right text-[#000000]`}>COLLECTION</p>
        </div>
        <div className='w-[10%]'>
          <p className={`${MagnetMedium.className} text-[14px] leading-[18px] opacity-50 text-right text-[#000000]`}>FLOOR PRICE</p>
        </div>
        <div className='w-[10%]'>
          <p className={`${MagnetMedium.className} text-[14px] leading-[18px] opacity-50 text-right text-[#000000]`}>SALES</p>
        </div>
        <div className='w-[10%]'>
          <p className={`${MagnetMedium.className} text-[14px] leading-[18px] opacity-50 text-right text-[#000000]`}>SALE TYPE</p>
        </div>
      </div>
      <div className='w-[100%] flex flex-col gap-[20px] mt-[20px]'>
        {
          data.map((item, index)=>{
            return (
              <TableRow key={index} index={index} item={item}/>
            )
          })
        }
      </div>
    </>
  )
}

const TableRow = ({item, index})=>{
  return (
    <div className='w-[100%] justify-between items-center flex'>
        <div className='w-[5%]'>
          <p className={`${MagnetBold.className} text-right text-[14px] leading-[18px]  text-[#000000]`}>{index+1}</p>
        </div>
        <div className='w-[25%] flex gap-[1rem] items-center'>
          <img src={item?.image} className='w-[55px] rounded-md h-[55px]'/>
          <p className={`${MagnetBold.className} text-right text-[14px] leading-[18px]  text-[#000000]`}>
            {item?.name}
          </p>
        </div>
        <div className='w-[10%]'>
          <p className={`${MagnetBold.className} text-right text-[14px] leading-[18px]  text-[#000000]`}>
            {item?.volume}
          </p>
        </div>
        <div className='w-[10%]'>
          <p className={`${MagnetBold.className} text-right text-[14px] leading-[18px] 
          `}>
            {item?.collection}
          </p>
        </div>
        <div className='w-[10%]'>
          <p className={`${MagnetBold.className} text-right text-[14px] leading-[18px]  text-[#000000]`}>
            {item?.price}
          </p>
        </div>
        <div className='w-[10%]'>
          <p className={`${MagnetBold.className} text-right text-[14px] leading-[18px]  text-[#000000]`}>
            {item?.sales}
          </p>
        </div>
        <div className='w-[10%] mr-[1rem]'>
          <p className={`${MagnetMedium.className} text-[14px] leading-[18px] opacity-50 text-right text-[#000000]`}>{item?.saleType}</p>
        </div>
    </div>
  )
}

const CollectionStatsComponent = () => {
  const [selectedTab, setSeletctedTab] = useState("Trending")
  const [categories, setCategories] = useState(['All'])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [visibleData, setVisibleData] = useState([])
  const [data, setData] = useState([])
  const [options, setOptions] = useState([
    {
      name: "Trending",
      selected:true,
    },
    {
      name: "Top",
      selected:false,
    },
  ])

  const [timePeriod, setTimePeriod] = useState([
    {
      name:"24H",
      selected:true
    },
    {
      name:"7D",
      selected:false
    }
  ])

  useEffect(()=>{
    if(data.length > 0){
      let newData = data.filter((item)=>{
        if(selectedCategory === 'All'){
          return true
        }else{
          return item.category === selectedCategory.toLowerCase()
        }
      })
      newData = newData.filter(item=>item!==null)
      setVisibleData(newData)
    }
  },[selectedCategory, data])

  const handleSelect = (name) => {
    const newOptions = options.map((option)=>{
      if(option.name === name){
        return {
          ...option,
          selected: true
        }
      }else{
        return {
          ...option,
          selected: false
        }
      }
    })
    setSeletctedTab(name)
    setOptions(newOptions)
  }

  const handleSelectTimePeriod = (obj)=>{
    const newTimePeriod = timePeriod.map((option)=>{
      if(option.name === obj.name){
        return {
          ...option,
          selected: true
        }
      }else{
        return {
          ...option,
          selected: false
        }
      }
    })
    setTimePeriod(newTimePeriod)

  }

  useEffect(()=>{
    const getCollections = async ()=>{
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items`)
      const {items} = data
      const newData = items.map((item, index)=>{
        if(!item?.isDeployed) return null
        return {
          id:index+1,
          collection:item.name,
          volume:item.maxFractions,
          collection:item.collection.name,
          price:`${item.pricePerFraction} MATIC`,
          sales:item.transactionHistory.length-1,
          image: item.image,
          category:item.collection.category,
          name:item.name,
          saleType: item.fully_subscribed?'Secondary':'Primary'
        }
      })
      setData(newData)

      let categories = [...new Set(items.map((item)=>item?.collection?.category))]
      categories = categories.map((item)=>item?.charAt(0).toUpperCase() + item?.slice(1))
      categories =categories.filter((item)=>item!==null && item!==undefined && item!=='')
      categories.unshift('All')
      setCategories(categories)
    }

    //

    getCollections()
  },[])
  return (
    <div className='w-[90vw]'>
      <div className='mt-[3rem] w-[100%]'>
        <p className={`text-[40px] ${MagnetBold.className} h-[3rem] leading-[41px] text-[#000000]`}>Collection Stats</p>
      </div>
      <div className="flex items-end mt-[42px] w-[90vw]">
          <div className="flex flex-wrap items-end justify-center xl:flex-nowrap">
          {
            options.map((option, index)=>{
              return (
                <>
                <div key={option?.name} onClick={()=>handleSelect(option?.name)} className="flex xl:mt-[0] mt-[1rem] cursor-pointer">
                  <div>
                    <p className={`${MagnetLight.className} whitespace-nowrap text-[20px] leading-[25px] ${option.selected?"":"opacity-50"}`}>{option.name}</p>
                    <div className={`w-full ${option?.selected?"":"opacity-20"} h-[2px] mt-[15px] bg-black`}/>
                  </div>
                </div>
                {
                  index !== options.length-1 && <div className={`w-[40px] h-[2px] opacity-20 mt-[5px] bg-black`}/>
                }
                </>
              )
            })
          }
          </div>
          <div className="w-[80vw]">
            <div className={`w-full h-[2px] opacity-20 mt-[15px] bg-black`}/>
          </div>
      </div>
      <div className='mt-[20px] justify-between flex w-[100%] overflow-visible'>
          <div className='flex gap-[20px] overflow-visible'>
            <DropDownInput onChange={(e)=>setSelectedCategory(e)} options={categories}/>
            
            <DropDownInput width={'w-[30rem]'} options={[
              'All Chains',
              'Polygon',
            ]}/>
          </div>
          <div className='flex overflow-hidden rounded-md'>
            {
              timePeriod.map((e)=>{
                return (
                  <div onClick={()=>handleSelectTimePeriod(e)} className={`h-[2.5rem] transition-all duration-300 w-[3.5rem] cursor-pointer flex items-center relative justify-center  ${e.selected?'bg-black':'bg-[rgba(255,255,255,0.5)]'}`}>
                    <p className={`${MagnetBold.className} text-[14px] leading-[18px] ${e.selected?'text-white':'text-[#000000]'}`}>{e.name}</p>
                  </div>
                )
              })
            }
            
          </div>
      </div>
     {data.length>0 && visibleData.length>0 && <div className='mt-[42px]  w-[100%]'>
        <Table data={visibleData}/>
      </div>
      }
      {
        data.length===0 && <div className='mt-[42px]  w-[100%]'>
          <p className={`${MagnetBold.className} text-[20px] leading-[25px] text-[#000000]`}>No Data</p>
        </div>
      }
      {
        visibleData.length===0 && data.length>0 && <div className='mt-[42px]  w-[100%]'>
          <p className={`${MagnetBold.className} text-[20px] leading-[25px] text-[#000000]`}>No Data for Selected Category</p>
        </div>
      }
    </div>
  )
}

export default CollectionStatsComponent