import {useState} from 'react'
import { MagnetBold, MagnetLight, MagnetMedium } from 'pages/_app';
import { DropDownInput } from '../Common';


const Table = ()=>{
  const [data, setData] = useState([
    {
      id:1,
      collection:'Musical Birds Freeway Collection ',
      volume:'10.9 ETH',
      change:'22.7%',
      price:'0.2 ETH',
      sales:'464'
    },
    {
      id:2,
      collection:'Musical Birds Freeway Collection ',
      volume:'10.9 ETH',
      change:'-22.7%',
      price:'0.2 ETH',
      sales:'464'
    },
    {
      id:3,
      collection:'Musical Birds Freeway Collection ',
      volume:'10.9 ETH',
      change:'22.7%',
      price:'0.2 ETH',
      sales:'464'
    },
    {
      id:4,
      collection:'Musical Birds Freeway Collection ',
      volume:'10.9 ETH',
      change:'22.7%',
      price:'0.2 ETH',
      sales:'464'
    },
    {
      id:5,
      collection:'Musical Birds Freeway Collection ',
      volume:'10.9 ETH',
      change:'-22.7%',
      price:'0.2 ETH',
      sales:'464'
    },
    {
      id:6,
      collection:'Musical Birds Freeway Collection ',
      volume:'10.9 ETH',
      change:'22.7%',
      price:'0.2 ETH',
      sales:'464'
    },
    {
      id:7,
      collection:'Musical Birds Freeway Collection ',
      volume:'10.9 ETH',
      change:'-22.7%',
      price:'0.2 ETH',
      sales:'464'
    },
    {
      id:8,
      collection:'Musical Birds Freeway Collection ',
      volume:'10.9 ETH',
      change:'22.7%',
      price:'0.2 ETH',
      sales:'464'
    },
    {
      id:9,
      collection:'Musical Birds Freeway Collection ',
      volume:'10.9 ETH',
      change:'-22.7%',
      price:'0.2 ETH',
      sales:'464'
    },
    {
      id:10,
      collection:'Musical Birds Freeway Collection ',
      volume:'10.9 ETH',
      change:'22.7%',
      price:'0.2 ETH',
      sales:'464'
    }
  ])


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
          <p className={`${MagnetMedium.className} text-[14px] leading-[18px] opacity-50 text-right text-[#000000]`}>%CHANGE</p>
        </div>
        <div className='w-[10%]'>
          <p className={`${MagnetMedium.className} text-[14px] leading-[18px] opacity-50 text-right text-[#000000]`}>FLOOR PRICE</p>
        </div>
        <div className='w-[10%]'>
          <p className={`${MagnetMedium.className} text-[14px] leading-[18px] opacity-50 text-right text-[#000000]`}>SALES</p>
        </div>
        <div className='w-[5%]'>
        </div>
      </div>
      <div className='w-[100%] flex flex-col gap-[20px] mt-[20px]'>
        {
          data.map((item, index)=>{
            return (
              <TableRow key={index} item={item}/>
            )
          })
        }
      </div>
    </>
  )
}

const TableRow = ({item})=>{
  return (
    <div className='w-[100%] justify-between items-center flex'>
        <div className='w-[5%]'>
          <p className={`${MagnetBold.className} text-right text-[14px] leading-[18px]  text-[#000000]`}>{item.id}</p>
        </div>
        <div className='w-[25%] flex gap-[1rem] items-center'>
          <img src='Images/PNG/Gallery4.png' className='w-[55px] rounded-md h-[55px]'/>
          <p className={`${MagnetBold.className} text-right text-[14px] leading-[18px]  text-[#000000]`}>
            {item.collection}
          </p>
        </div>
        <div className='w-[10%]'>
          <p className={`${MagnetBold.className} text-right text-[14px] leading-[18px]  text-[#000000]`}>
            {item.volume}
          </p>
        </div>
        <div className='w-[10%]'>
          <p className={`${MagnetBold.className} text-right text-[14px] leading-[18px]  ${
            item.change.includes('-') ? 'text-[#FF0000]' : 'text-[#2FBE6A]'
          }`}>
            {item.change}
          </p>
        </div>
        <div className='w-[10%]'>
          <p className={`${MagnetBold.className} text-right text-[14px] leading-[18px]  text-[#000000]`}>
            {item.price}
          </p>
        </div>
        <div className='w-[10%]'>
          <p className={`${MagnetBold.className} text-right text-[14px] leading-[18px]  text-[#000000]`}>
            {item.sales}
          </p>
        </div>
        <div className='w-[5%]'>
          <img src='Images/SVG/Star1.svg' className='w-[20px] h-[20px]'/>
        </div>
    </div>
  )
}

const CollectionStatsComponent = () => {
  const [selectedTab, setSeletctedTab] = useState("Trending")
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
      name:"1H",
      selected:true
    },
    {
      name:"6H",
      selected:false
    },
    {
      name:"24H",
      selected:false
    },
    {
      name:"7D",
      selected:false
    }
  ])

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
  return (
    <div className='w-[90vw]'>
      <div className='mt-[3rem] w-[100%]'>
        <p className={`text-[40px] ${MagnetBold.className} h-[3rem] leading-[41px] text-[#000000]`}>Collection Stats</p>
      </div>
      <div className="flex items-end mt-[42px] w-[90vw]">
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
          <div className="w-[80vw]">
            <div className={`w-full h-[2px] opacity-20 mt-[15px] bg-black`}/>
          </div>
      </div>
      <div className='mt-[20px] justify-between flex w-[100%] overflow-visible'>
          <div className='flex gap-[20px] overflow-visible'>
            <DropDownInput options={['All Categories', 'Favoruites', 'Starred']}/>
            
            <DropDownInput width={'w-[30rem]'} options={[
              'All Chains',
              'Ethereum',
              'Binance Smart Chain',
              'Polygon',
              'Solana',
              'Avalanche',
              'Fantom',
              'Harmony',
              'xDai',
            ]}/>
          </div>
          <div className='rounded-md overflow-hidden flex'>
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
      <div className='mt-[42px]  w-[100%]'>
        <Table/>
      </div>
    </div>
  )
}

export default CollectionStatsComponent