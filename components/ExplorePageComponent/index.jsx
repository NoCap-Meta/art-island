import { MagnetBold, MagnetMedium, MagnetLight, MagnetRegular } from 'pages/_app';
import { useState } from 'react';
import { imageBackgroundOptions } from 'components';
import { Featured } from 'components';
import Slider from "react-slick";
import ItemCard  from '@/components/Common/ItemCard';

const settings = {
  // infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  cssEase: "linear",
  centerMode: true,
  //custom left dot
  // centerPadding: '5%',
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        infinite: true,
        dots: false
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
};

const TableHeader = ()=>{
  return (
    <div className='flex gap-[1rem] w-[40vw]'>
      <div className='w-[5vw]'/>
      <p className={`${MagnetRegular.className} text-[#000000] opacity-50 w-[20vw] text-[16px]`}>COLLECTION</p>
      <p className={`${MagnetRegular.className} text-[#000000] opacity-50 w-[10vw] text-[16px]`}>FLOOR PRICE</p>
      <p className={`${MagnetRegular.className} text-[#000000] opacity-50 w-[5vw] text-[16px]`}>VOLUME</p>
    </div>
  )
}

const TableRow = ()=>{
  return (
    <div className='flex gap-[1rem] mt-[1rem] items-center w-[40vw]'>
      <div className='w-[5vw]'>
        <p className={`${MagnetRegular.className} text-[#000000] text-[16px]`}>1</p>
      </div>
      <div className='w-[20vw] flex gap-[5px] items-center'>
        <img src='Images/PNG/Gallery4.png' className='w-[55px] rounded-md h-[55px]'/>
        <p className={`${MagnetRegular.className} text-[#000000] text-[16px]`}>
          Collection Name...
        </p>
      </div>
      <p className={`${MagnetRegular.className} text-[#000000] text-[16px] w-[10vw]`}>0.1 ETH</p>
      <p className={`${MagnetRegular.className} text-[#000000] text-[16px] w-[5vw]`}>464</p>
    </div>
  )
}

const TopCollectionSection = ({title})=>{
  return (
    <div className='w-[90vw] mt-[3rem]'>
      <p className={`${MagnetBold.className} text-[#000000]  text-[24px]`}>{title}</p>
      <div className='w-[90vw] mt-[5px]'>
      <Slider {...settings}>
        {
          [1,2,3,4,5,6,7,8,9,10].map((item)=>{  
            return <ItemCard/>
          } 
          )
        }
      </Slider>
      </div>
    </div>
  )
}

const ExplorePageComponent = () => {
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
  const [navigations, setNavigations] = useState([
    {
      name: 'All',
      isActive: true,
    },
    {
      name: 'Art',
      isActive: false,
    },
    {
      name: 'Gaming',
      isActive: false,
    },
    {
      name: 'Photography',
      isActive: false,
    },
    {
      name: 'Membership',
      isActive: false,
    },
    {
      name: 'PFPs',
      isActive: false,
    },
  ])

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
        <div style={{
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
        </div>

        <div>
          <div className="flex items-end mt-[42px] w-[90vw]">
              <div className="flex xl:flex-nowrap flex-wrap justify-center items-end">
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
                <div className={`w-full h-[2px] opacity-20 mt-[15px] bg-black`}/>
              </div>
          </div>
          <div className='flex w-[90vw] mt-[2rem] gap-[5rem]'>
            <div>
              <TableHeader/>
              <TableRow/>
              <TableRow/>
              <TableRow/>
              <TableRow/>
            </div>
            <div>
              <TableHeader/>
              <TableRow/>
              <TableRow/>
              <TableRow/>
              <TableRow/>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-[2rem]'>
        <Featured/>
      </div>
      <div className='explore'>
        <TopCollectionSection title='Notable Collections'/>
        <TopCollectionSection title='Trending in Gaming'/>
        <TopCollectionSection title='Trending in Photography'/>
        <TopCollectionSection title='Trending in Membership'/>
        <TopCollectionSection title='Explore Categories'/>
      </div>
      <div className='w-[90vw] justify-between flex items-center h-[4rem] mt-[3rem] border-t border-[rgba(0,0,0,0.5)]'>
        <div>
          <p className={`${MagnetRegular.className} opacity-50 text-[#000000] text-[16px]`}>© NoCap Meta, Mumbai IN</p>
        </div>
        <div className='flex gap-[2rem]'>
          <p className={`${MagnetRegular.className} opacity-50 text-[#000000] text-[16px]`}>Terms of Service</p>
          <p className={`${MagnetRegular.className} opacity-50 text-[#000000] text-[16px]`}>Privacy Policy</p>
        </div>
      </div>
    </>
  )
}

export default ExplorePageComponent