import { ArtistHeader, TableCell, Filter } from "components"
import { MagnetBold, MagnetLight, MagnetMedium } from 'pages/_app';
import { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import {Store} from "utils";
import DropDownInput from '../../Common/DropDownInput/index';
import ItemCard from "@/components/Common/ItemCard";
import axios from "axios";
import { handleBuyPrimaryNFT } from "@/utils/Extras/buyNFT";

const {useArtistProfileOptionsStore, useSelectedArtistProfileTab, useUserStore} = Store



const SearchBar = ({setFilterOpen}) => {
  return (
    <div className="w-[90vw] overflow-visible gap-[1rem] flex mt-[36px]">
      <img onClick={()=>{
        setFilterOpen(e=>!e)
      }} src='Images/SVG/Filter.svg' className='mr-[12px] cursor-pointer'/>
      <div className="relative">
        <input placeholder="Search Items..." className="h-[2.5rem] bg-[rgba(255,255,255,0.5)] rounded-lg w-[60vw] outline-none pl-[3rem]"/>
        <img src='Images/SVG/Search.svg' className='absolute top-[50%] left-[12px] transform -translate-y-1/2'/>
      </div>
      <DropDownInput preIcon={ <img src='Images/SVG/Refresh.svg' className='scale-75 opacity-50'/>} options={['Sort by', 'Price', 'Time']} width='w-[15vw]'/>
    </div>
  )
}

const DeployItemCard = ({item, handleDeployItem}) => {
  const [status, setStatus] = useState(item.isDeployed? 'Deployed': item.collectionApproved ? item.isApproved? item.deployedCollectionAddress? 'Deploy': 'Collection not deployed': 'Pending Item Approval': 'Pending Collection Approval')
  let isDisabled = (status === 'Deployed' || status === 'Pending Item Approval' || status === 'Pending Collection Approval' || status==='Deploying...')
  return <div>
    <ItemCard onCollectionClick={!isDisabled?()=>handleDeployItem(item, setStatus):()=>{}} isDisabled={isDisabled} item={item} isCollection collectionStatus={status}  />
  </div>
} 

const ArtistHero = () => {
  const {artistProfileOptions:options, setArtistProfileOptions:setOptions} = useArtistProfileOptionsStore()
  const {selectedArtistProfileTab:selectedTab,setSelectedArtistProfileTab:setSeletctedTab} = useSelectedArtistProfileTab()
  const [filterOpen, setFilterOpen] = useState(false)
  const [myItems, setMyItems] = useState([])
  const [boughtItems, setBoughtItems] = useState([])
  const [likedItems, setLikedItems] = useState([])
  const {user, setUser} = useUserStore()

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

  const getItems = async ()=>{
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    const {data:likedItems} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items/liked-items`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    const {data: boughtData} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/items/get-items-by-ids`,{
      ids: user.boughtItems
    })

    setLikedItems(likedItems.items)

    setBoughtItems(boughtData.items)

    if(data.success){
      setMyItems(data.items)
    }
  }


  useEffect(()=>{

    getItems()
  },[])

  const handleDeployItem = async (item, setStatus) => {
    await handleBuyPrimaryNFT(item, getItems, setStatus)
  }

  return (
    <div>
      <div className="flex flex-col items-center w-screen">
        <ArtistHeader/>
      
        <div className="flex items-end mt-[42px] w-[90vw]  ">
          <div className="flex flex-wrap items-end justify-center xl:flex-nowrap">
          {
            options.map((option, index)=>{
              return (
                <>
                <div key={option.name} onClick={()=>handleSelect(option.name)} className="flex xl:mt-[0] mt-[1rem] cursor-pointer">
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
          <div className="w-[calc(90vw-774px)]">
            <div className="pl-[40px] w-full flex justify-between">
              <div className="flex">
                <p className={`${MagnetLight.className} opacity-50 whitespace-nowrap text-[20px] leading-[25px]`}>More</p>
                <img className="opacity-50 " src="Images/SVG/Chevron-small-down.svg"/>
              </div>
              <div className="flex gap-[10px]">
                <img src="Images/SVG/Grid.svg"/>
                <img className="opacity-50 " src="Images/SVG/GridH.svg"/>
              </div>
            </div>
            <div className={`w-full h-[2px] opacity-20 mt-[15px] bg-black`}/>
          </div>
        </div>

        <SearchBar setFilterOpen={setFilterOpen}/>

      <div className="flex md:flex-row flex-col md:w-[90vw] md:items-start items-center gap-[2rem] md:justify-between">
        {filterOpen && <Filter/>}
        {selectedTab==="Featured" && <div className={`${filterOpen? 'w-[70vw] md:w-[70vw]':'w-[90vw]' } flex gap-[40px] md:justify-start justify-center flex-wrap mt-[42px]`}>
                {/* {
                  Array.from({length:10}).map((e, i)=>{
                    return (<div key={i}>
                      <ItemCard/>
                    </div>)
                  })
                } */}
            </div>}
        </div>
          {
            selectedTab==='Transaction History' && (
              <div>
                {/* <div className="w-[90vw] h-[3rem] mt-[36px] flex justify-end items-center rounded-lg bg-[rgba(255,255,255,0.5)] mb-[10px]">
                  <img src='Images/SVG/Chevron-small-down.svg' className='mr-[12px]'/>
                </div> */}
                <div className='flex md:overflow-hidden overflow-scroll flex-col mt-[1rem] w-[90vw]'>
                  <div className='md:w-[100%] w-[200%] h-[40px] items-center border-b flex  border-[rgba(0,0,0,0.2)] '>
                    <TableCell font={MagnetMedium.className} text='Event'/>
                    <TableCell font={MagnetMedium.className} text='Price'/>
                    <TableCell font={MagnetMedium.className} text='From'/>
                    <TableCell font={MagnetMedium.className} text='To'/>
                    <TableCell font={MagnetMedium.className} text='Date'/>
                  </div>
                  {
                    Array.from({length:10}).map((_, index)=>{
                      return (
                        <div className='md:w-[100%] w-[200%] h-[56px] items-center border-y flex border-[rgba(0,0,0,0.2)] '>
                          <TableCell text='Sale'>
                            <img src="Images/SVG/Cart-Black.svg" className='ml-[10px]' />
                          </TableCell>
                          <TableCell text='0.069 ETH'/>
                          <TableCell text='NeutralHose'/>
                          <TableCell text='AtomicBrother'/>
                          <TableCell text='3 days ago' right>
                            <img src="Images/SVG/Newscreen.svg" />
                          </TableCell>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          }
          {
            selectedTab==='Created' && (
              <div className={`${filterOpen? 'w-[70vw] md:w-[70vw]':'w-[90vw]' } flex gap-[40px] md:justify-start justify-center flex-wrap mt-[42px]`}>
                {
                  myItems.map((item, i)=>{
                    return (
                      <div key={i}>
                        <DeployItemCard handleDeployItem={handleDeployItem} item={item} />
                      </div>
                    )
                  }
                )}
              </div>
            )
          }
          {
            selectedTab==='Collected' && (
              <div className={`${filterOpen? 'w-[70vw] md:w-[70vw]':'w-[90vw]' } flex gap-[40px] md:justify-start justify-center flex-wrap mt-[42px]`}>
                {
                  boughtItems.map((item, i)=>{
                    return (
                      <div key={i}>
                        <ItemCard item={item}/>
                      </div>
                    )
                  }
                )}
              </div>
            )
          }
          {
            selectedTab==='Favourites' && (
              <div className={`${filterOpen? 'w-[70vw] md:w-[70vw]':'w-[90vw]' } flex gap-[40px] md:justify-start justify-center flex-wrap mt-[42px]`}>
                {
                  likedItems.map((item, i)=>{
                    return (
                      <div key={i}>
                        <ItemCard item={item}/>
                      </div>
                    )
                  }
                )}
              </div>
            )
          }
      </div>
    </div>
  )
}

export default ArtistHero