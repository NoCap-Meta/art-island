import { MagnetMedium } from '@/pages/_app'
import React, { useState } from 'react'
import { Store } from '@/utils';

const {useTabStore} = Store

const SideBar = () => {
  const {setSelectedTab} = useTabStore()

  const [tabs, setTabs] = useState([
    {
      id:1,
      name:'Profile',
      active:true
    },
    {
      id:2,
      name:'Featured Items',
      active:false
    },
    {
      id:3,
      name:'Notifications',
      active:false
    },
    {
      id:4,
      name:'Offers',
      active:false
    },
    {
      id:5,
      name:'Account Support',
      active:false
    },
    {
      id:6,
      name:'Earnings',
      active:false
    }
  ])

  //handleTabSelect with tab obj
  const handleTabSelect = (tab) => {
    const newTabs = tabs.map((t)=>{
      if(t.id === tab.id){
        t.active = true
      }else{
        t.active = false
      }
      return t
    })
    setTabs(newTabs)
    setSelectedTab(tab.name)
  }


  return (
    <div className='w-[20vw] min-h-[100vh] border-r border-[rgb(0,0,0,0.5)]'>
      {
        tabs.map((tab)=>{
          return (
            <p onClick={()=>handleTabSelect(tab)} key={tab.id} className={`${MagnetMedium.className} cursor-pointer transition-all duration-300 ${!tab.active && 'opacity-50'} text-[20px] text-[#000000] mb-[10px]`}>{tab.name}</p>
          )
        }
        )
      }
    </div>
  )
}

export default SideBar