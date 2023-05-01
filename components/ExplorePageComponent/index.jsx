import { MagnetBold, MagnetMedium, MagnetLight, MagnetRegular } from 'pages/_app';
import { useState, useEffect } from 'react';
import { imageBackgroundOptions } from 'components';
import { Featured } from 'components';
import { FooterCommon, TopCollectionSection } from '../Common';
import axios from 'axios';

const TableHeader = ()=>{
  return (
    <div className='flex gap-[1rem] w-[40vw]'>
      <div className='w-[5vw]'/>
      <p className={`${MagnetRegular.className} text-[#000000] opacity-50 w-[20vw] text-[16px]`}>ITEM</p>
      <p className={`${MagnetRegular.className} text-[#000000] opacity-50 w-[10vw] text-[16px]`}>FLOOR PRICE</p>
      <p className={`${MagnetRegular.className} text-[#000000] opacity-50 w-[5vw] text-[16px]`}>VOLUME</p>
    </div>
  )
}

const TableRow = ({item, idx})=>{
  return (
    <div className='flex gap-[1rem] mt-[1rem] items-center w-[40vw]'>
      <div className='w-[5vw]'>
        <p className={`${MagnetRegular.className} text-[#000000] text-[16px]`}>{idx+1}</p>
      </div>
      <div className='w-[20vw] flex gap-[5px] items-center'>
        <img src={item.image} className='w-[55px] rounded-md h-[55px]'/>
        <p className={`${MagnetRegular.className} text-[#000000] text-[16px]`}>
          {item.name}
        </p>
      </div>
      <p className={`${MagnetRegular.className} text-[#000000] text-[16px] w-[10vw]`}>{item.pricePerFraction} ETH</p>
      <p className={`${MagnetRegular.className} text-[#000000] text-[16px] w-[5vw]`}>{item.maxFractions}</p>
    </div>
  )
}

const ExplorePageComponent = () => {
  const [selectedTab, setSeletctedTab] = useState("Trending")
  const [deployedItems, setDeployedItems] = useState([])
  const [showingItems, setShowingItems] = useState([])
  const [selectedNavigation, setSelectedNavigation] = useState('')
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
  const [navigations, setNavigations] = useState([
    {
      name: 'All',
      isActive: true,
      value:''
    },
    {
      name: 'Art',
      isActive: false,
      value:'art'
    },
    {
      name: 'Photography',
      isActive: false,
      value:'photography'
    },
    {
      name: 'Real Estate',
      isActive: false,
      value:'real-estate'
    },
  ])

  useEffect(()=>{
      if(deployedItems.length>0){
        const newShowingItems = deployedItems.filter((item)=>{
          if(selectedNavigation === ''){
            return true
          }else{
            return item.category === selectedNavigation
          }
        })
        setShowingItems(newShowingItems)
      }
  },[deployedItems,selectedNavigation])

  useEffect(()=>{
    const getCategoies = async () => {
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category`)
      const categories = data.categories
      let newNavigations = categories.map((category)=>{
        return {
          name: category.name,
          isActive: false,
          value: category.value
        }
      })
      newNavigations = [
        {
          name: 'All',
          isActive: true,
          value:''
        },
        ...newNavigations
      ]
      
      setNavigations(newNavigations)
    }


    getCategoies()
  },[])

  const handleSelectTab = (name) => {
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

  const getItems = async () => {
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items/deployed`)
    setDeployedItems(data.items)
  }

  useEffect(()=>{
    getItems()
  }, [])

  const handleSelect = (navigation) => {
    const newNavigations = navigations.map((nav) => {
      if (nav.name === navigation.name) {
        return {
          ...nav,
          isActive: true,
        }
      } else {
        return {
          ...nav,
          isActive: false,
        }
      }
    })
    setNavigations(newNavigations)
    setSelectedNavigation(navigation.value)
  }

  return (
    <>
      <div className='overflow-visible'>
        <div className="w-[90vw] flex gap-[40px] pt-[3rem] overflow-visible">
          {
            navigations.map((navigation, index)=>{
              return <p onClick={()=>handleSelect(navigation)} className={`${MagnetBold.className} cursor-pointer overflow-visible text-[18px] whitespace-nowrap leading-[18px] transition-all duration-300 ${!navigation.isActive && 'opacity-50'} text-[#000000]`}>{navigation.name}</p>
            })
          }
        </div>
        {/* <div style={{
          ...imageBackgroundOptions,
          backgroundImage: 'url(Images/PNG/HeroImage.png)',
        }} className='w-[90vw] mt-[2rem] overflow-visible rounded-lg flex px-[2rem] items-end pb-[2rem] h-[50vh]'>
          <div className='flex overflow-visible items-end w-[100%] justify-between'>
            <div className='overflow-visible'>
              <p className={`${MagnetBold.className} overflow-visible text-[#ffffff] text-[32px]`}>Cradles Gemesis</p>
              <p className={`${MagnetRegular.className} overflow-visible text-[#ffffff] leading-[16px] text-[20px]`}>By NoCapMeta</p>
              <p className={`${MagnetRegular.className} overflow-visible text-[#ffffff] leading-[16px] mt-[2rem] text-[20px]`}>3,424 items • 27.32 ETH</p>
            </div>
            <button className='overflow-visible bg-black rounded-lg py-[1rem] px-[1.5rem]'>
              <p className={`${MagnetRegular.className} overflow-visible text-white tracking-wide text-[16px]`}>View Collection</p>
            </button>
          </div>
        </div> */}
        <div className='explore'>
          <TopCollectionSection items={showingItems} title='Available Items'/>
        </div>
        <div>
          <div className="flex items-end mt-[42px] w-[90vw]">
              <div className="flex flex-wrap items-end justify-center xl:flex-nowrap">
              {
                options.map((option, index)=>{
                  return (
                    <>
                    <div key={option.name} onClick={()=>handleSelectTab(option.name)} className="flex xl:mt-[0] mt-[1rem] cursor-pointer">
                      <div>
                        <p className={`${MagnetLight.className} whitespace-nowrap text-[20px] leading-[25px] ${option.selected?"":"opacity-50"}`}>{option.name}</p>
                        <div className={`w-full ${option.selected?"":"opacity-20"} h-[2px] mt-[15px] bg-black`}/>
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
                <div className={`w-full h-[2px] opacity-20 bg-black`}/>
              </div>
          </div>
          <div className='flex w-[90vw] mt-[2rem] gap-[5rem]'>
            <div>
              <TableHeader/>
              {
                deployedItems.map((item, index)=>{
                  if(index<4){
                    return <TableRow key={item._id} idx={index} item={item}/>
                  }
                }
                )
              }
            </div>
            {deployedItems.length>4 && <div>
              <TableHeader/>
              {
                deployedItems.map((item, index)=>{
                  if(index>=4 && index<8){
                    return <TableRow idx={index} key={item.id} item={item}/>
                  }
                }
                )
              }
            </div>}
          </div>
        </div>
      </div>
      <div className='mt-[2rem]'>
        <Featured/>
      </div>
      
     <FooterCommon/>
    </>
  )
}

export default ExplorePageComponent