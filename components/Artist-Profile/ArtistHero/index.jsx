import { NavBar, ArtistHeader, TableCell } from "components"
import { MagnetBold, MagnetLight, MagnetMedium } from 'pages/_app';
import { useEffect, useState } from 'react';

const Card = ()=>{
  const [image, setImage] = useState(null)
  useEffect(()=>{
    const getRandomImage = async ()=>{
      const response = await fetch("https://source.unsplash.com/random/300x300/?3drenders")
      const data = await response.blob()
      setImage(URL.createObjectURL(data))
    }
    getRandomImage()
  },[])
  return (
    <div style={{
      background: "rgba(255,255,255,0.5)"
    }} className="rounded-lg w-[295px]  overflow-hidden">
      <img src={image} className='h-[295px] rounded-lg w-[295px]'/>
      <div className="h-[114px] w-[295px]">
        <p className={`${MagnetLight.className} mt-[12px] text-[14px] leading-[18px] ml-[12px]`}>
          Deranged Music
        </p>
        <p className={`${MagnetBold.className} text-[16px] leading-[20px] ml-[12px]`}>
          Musical Birds Freeway Collection
        </p>
        <p className={`${MagnetBold.className} text-[16px] leading-[20px] mt-[12px] ml-[12px]`}>
        15.2 ETH
        </p>
        <p className={`${MagnetLight.className} opacity-50 text-[14px] leading-[18px] ml-[12px]`}>
          Best Offer : 14.1 ETH
        </p>
      </div>
    </div>
  )
}



const ArtistHero = () => {
  const [options, setOptions] = useState([
    {
      name: "Featured",
      selected:true,
    },
    {
      name: "Collected",
      selected:false,
    },
    {
      name: "Created",
      selected:false,
    },
    {
      name: "Favourites",
      selected:false,
    },
    {
      name: "Activity",
      selected:false,
    },
    {
      name: "Transaction History",
      selected:false,
    }
  ])

  const [selectedTab, setSeletctedTab] = useState("Featured")

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

  return (
    <div>
      <NavBar isLogined/>
      <div className="w-screen flex flex-col items-center">
        <ArtistHeader/>
        <div className="w-[90vw] flex mt-[20px] gap-[10px] items-center justify-center">
          <p className={`text-center ${MagnetLight.className} text-[20px] leading-[25px]`}>
            0xE852...EI8531
          </p>
          <img className="cursor-pointer" src="Images/SVG/Copy.svg"/>
        </div>
        <div className="flex items-end mt-[42px] w-[90vw]  ">
          <div className="flex xl:flex-nowrap flex-wrap justify-center items-end">
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
                <img className=" opacity-50" src="Images/SVG/Chevron-small-down.svg"/>
              </div>
              <div className="flex gap-[10px]">
                <img src="Images/SVG/Grid.svg"/>
                <img className=" opacity-50" src="Images/SVG/GridH.svg"/>
              </div>
            </div>
            <div className={`w-full h-[2px] opacity-20 mt-[15px] bg-black`}/>
          </div>
        </div>

         {selectedTab==="Featured" && <div className="w-[90vw] flex gap-[40px] md:justify-start justify-center flex-wrap mt-[42px]">
              {
                Array.from({length:10}).map(()=>{
                  return <Card/>
                })
              }
          </div>}
          {
            selectedTab==='Transaction History' && (
              <div>
                <div className="w-[90vw] h-[3rem] mt-[36px] flex justify-end items-center rounded-lg bg-[rgba(255,255,255,0.5)] mb-[10px]">
                  <img src='Images/SVG/Chevron-small-down.svg' className='mr-[12px]'/>
                </div>
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
      </div>
    </div>
  )
}

export default ArtistHero