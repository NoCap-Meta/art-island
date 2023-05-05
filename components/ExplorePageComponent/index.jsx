import { MagnetBold, MagnetMedium } from 'pages/_app';
import { useState, useEffect } from 'react';
import { imageBackgroundOptions } from 'components';
import { Featured } from 'components';
import { FooterCommon, TopCollectionSection } from '../Common';
import axios from 'axios';

const ExplorePageComponent = () => {
  const [selectedTab, setSeletctedTab] = useState("Trending")
  const [deployedItems, setDeployedItems] = useState([])
  const [showingItems, setShowingItems] = useState([])
  const [selectedNavigation, setSelectedNavigation] = useState('')
  const [options, setOptions] = useState([
    {
      name: "Trending",
      selected: true,
    },
    {
      name: "Top",
      selected: false,
    },
  ])
  const [navigations, setNavigations] = useState([])

  useEffect(() => {
    if (deployedItems.length > 0) {
      const newShowingItems = deployedItems.filter((item) => {
        if (selectedNavigation === '') {
          return true
        } else {
          return item.category === selectedNavigation
        }
      })
      setShowingItems(newShowingItems)
    }
  }, [deployedItems, selectedNavigation])

  useEffect(() => {
    const getCategoies = async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category`)
      const categories = data.categories
      let newNavigations = categories.map((category) => {
        return {
          name: category.name,
          isActive: false,
          value: category.value,
          isHided: category.isHided
        }
      })
      newNavigations = [
        {
          name: 'All',
          isActive: true,
          value: '',
          isHided: false
        },
        ...newNavigations
      ]

      setNavigations(newNavigations)
    }


    getCategoies()
  }, [])

  const handleSelectTab = (name) => {
    const newOptions = options.map((option) => {
      if (option.name === name) {
        return {
          ...option,
          selected: true
        }
      } else {
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
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items/deployed`)
    setDeployedItems(data.items)
  }

  useEffect(() => {
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
            navigations.map((navigation, index) => {
              if (navigation.isHided) {
                return
              }
              return <p onClick={() => handleSelect(navigation)} className={`${MagnetBold.className} cursor-pointer overflow-visible text-[18px] whitespace-nowrap leading-[18px] transition-all duration-300 ${!navigation.isActive && 'opacity-50'} text-[#000000]`}>{navigation.name}</p>
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
          <TopCollectionSection items={showingItems.filter(e=>!e.fully_subscribed)} title='Primary Token Offering' />
          <TopCollectionSection items={showingItems.filter(e=>e.fully_subscribed)} title='Secondary Sale' />
        </div>

      </div>
      <div className='mt-[2rem]'>
        <Featured />
      </div>

      <FooterCommon />
    </>
  )
}


export default ExplorePageComponent