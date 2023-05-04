
import { useSelectedItemStore } from '@/utils/Zustand';
import { MagnetBold, MagnetLight, MagnetMedium } from 'pages/_app';
import { useState } from 'react';

const FilterBubble = ({name, onClick})=>{
  return (
    <div className='h-[36px] gap-[6px] flex items-center justify-center bg-[rgba(255,255,255,0.5)] rounded-lg px-[16px]'>
      <p className={`${MagnetMedium.className} text-[18px] leading-[23px] opacity-50`}>
        {name}
      </p>
      <img onClick={()=>onClick(name)} className='cursor-pointer' src="Images/SVG/Cross-small.svg" />
    </div>
  )
}

const FilterList = ({handleFilter})=>{
  const [filterItems, setFilterItems] = useState([
    {
      name: 'Sales',
    },
    {
      name: 'Listings',
    },
    {
      name: 'Offers',
    },

  ])
  return (
    <div>
      {
        filterItems.map((items)=>{
          return (
            <div onClick={()=>handleFilter(items.name)} key={items.name} className="bg-[rgba(255,255,255,0.5)] cursor-pointer flex items-center justify-between w-[90vw] h-[48px]">
              <p className={`${MagnetMedium.className} text-[18px] ml-[10px] leading-[23px] opacity-50`}>
                {items.name}
              </p>
            </div>
          )
        })
      }
    </div>
  )
}

export const TableCell = ({children, text, font, right})=>{
  return (
    <div className='w-[20%] flex gap-[5px] items-center'>
      {!right && children}
    {text &&<p className={`${font || MagnetLight.className} whitespace-nowrap text-[18px] ml-[10px] leading-[23px]`}>
      {text}
    </p>}
    {right && children}
  </div>
  )
}

const ItemActivity = () => {
  const [isActivityOpen, setActivityOpen] = useState(true)
  const [isFilterListOpen, setFilterListOpen] = useState(false)
  const [seletedFilters, setSeletedFilters] = useState([])
  const {selectedItem:item, setSelectedItem} = useSelectedItemStore()

  const handleFilter = (name)=>{
    if(seletedFilters.includes(name)){
      setSeletedFilters(e=>e.filter((item)=>item!==name))
    }else{
      setSeletedFilters(e=>[...e, name])
    }
  }


  return (
    <div className="w-[100vw] flex justify-center">
      <div className="w-[90vw]">
        <div className={`w-[100%] h-[60px] flex justify-between items-center ${isActivityOpen && 'rounded-b-none'} rounded-lg border border-[rgba(0,0,0,0.2)]`}>
          <div className="flex gap-[10px] ml-[10px]">
            <img src="Images/SVG/List-right.svg" />
            <p className={`${MagnetBold.className} text-[24px] leading-[30px]`}>
              Item Activity
            </p>
          </div>
          <img src="Images/SVG/Chevron-up.svg" onClick={()=>setActivityOpen(e=>!e)} className={`mr-[10px]
          ${!isActivityOpen ? 'transform rotate-180' : 'transform rotate-0'}
          transition-all duration-300
          cursor-pointer`} />
        </div>
        {/* {
          isActivityOpen && (
            <div className={`flex justify-center w-[90vw] border ${seletedFilters.length>0?'pt-[16px]':'py-[16px]'} border-[rgba(0,0,0,0.2)]`}>
              <div className='w-[98%]'>
                <div className='relative'>
                  <div className={`bg-[rgba(255,255,255,0.5)] flex items-center  justify-between w-[100%] ${isFilterListOpen ? 'rounded-t-lg' : 'rounded-lg'} h-[48px]`}>
                    <p className={`${MagnetMedium.className} text-[18px] ml-[10px] leading-[23px] opacity-50`}>
                      Filter
                    </p>
                    <img onClick={()=>setFilterListOpen(e=>!e)} src="Images/SVG/Chevron-small-down.svg" className={`mr-[10px] 
                    ${isFilterListOpen ? 'transform rotate-180' : 'transform rotate-0'}
                    cursor-pointer`} />
                  </div>
                  {isFilterListOpen && <div>
                    <FilterList handleFilter={handleFilter}/>
                  </div>}
                </div>
                {seletedFilters.length>0 && <div className='w-[100%] h-[64px] gap-[12px] flex items-center'>
                  {
                    seletedFilters.map((item)=>{
                      return <FilterBubble onClick={handleFilter} name={item} key={item}/>
                    })
                  }
                    <p onClick={()=>setSeletedFilters([])} className={`${MagnetMedium.className} text-[18px] cursor-pointer leading-[23px]`}>
                      Clear all
                    </p>
                </div>}
              </div>
            </div>
          )
        } */}
        <div className='flex flex-col md:overflow-hidden overflow-scroll  w-[90vw]'>
          <div className='md:w-[100%] w-[200%] h-[40px] items-center border flex border-[rgba(0,0,0,0.2)] '>
            <TableCell font={MagnetMedium.className} text='Event'/>
            <TableCell font={MagnetMedium.className} text='Price'/>
            <TableCell font={MagnetMedium.className} text='From'/>
            <TableCell font={MagnetMedium.className} text='To'/>
            <TableCell font={MagnetMedium.className} text='Date'/>
          </div>
          {item && item.transactionHistory && item.transactionHistory.map((i)=>{
            if(!i){
              return
            }

            return (
              <div className='md:w-[100%] w-[200%] h-[56px] items-center border flex border-[rgba(0,0,0,0.2)] '>
                <TableCell text={i?.type}>
                  <img src="Images/SVG/Cart-Black.svg" className='ml-[10px]' />
                </TableCell>
                <TableCell text={i.price || 'N/A'}/>
                <TableCell text={i?.from?.slice(0,6)+'...'||'N/A'}/>
                <TableCell text={i?.to?.slice(0,6)+'...'||'N/A'}/>
                <TableCell text={
                  new Date(i.date).toLocaleDateString('en-US', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })
                } right>
                  {i.transactionHash && <img src="Images/SVG/Newscreen.svg" onClick={
                    ()=>{
                      //got to etherscan
                      window.open('https://mumbai.polygonscan.com/tx/'+i.transactionHash)
                    }
                  } />}
                </TableCell>
              </div>
            )
          })
          }

        </div>
      </div>
    </div>
  )
}

export default ItemActivity