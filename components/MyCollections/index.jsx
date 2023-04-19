import { MagnetBold, MagnetLight, MagnetMedium } from '@/pages/_app'
import { Store } from '@/utils'
import ItemCard from '../Common/ItemCard'
import CreateCollectionModal from '../Modals/CreateCollection'
import { useContext } from '@/utils/Context';
import { useEffect } from 'react';

const {useCollectionModalStore} = Store

const MyCollectionsComponent = () => {
  const { setCollectionModalOpen} = useCollectionModalStore()
  const {  setActiveModal:setActiveLoginModal,activeModal } = useContext()

  useEffect(()=>{
    //check token
    const token = localStorage.getItem('token')
    if(!token){
      setActiveLoginModal({
        ...activeModal,
        google: true
      })
    }
  })
  
  return (
    <div className='w-[70%] mt-[3rem]'>
      <div className=' w-[100%] justify-between'>
        <p className={`text-[40px] ${MagnetBold.className} h-[3rem] leading-[41px] text-[#000000]`}>My Collections</p>
        <p className={`${MagnetMedium.className} opacity-50 text-[16px] text-[#000000]`}>Create, curate, and manage collections of unique NFTs to share and sell.Learn more</p>
        <button onClick={()=>{
          setCollectionModalOpen(true)
        }} className={`bg-[#000000] ${MagnetLight.className} text-[#FFFFFF] text-[16px] mt-[2rem] font-bold px-[2rem] py-[0.8rem] rounded-md`}>Create a Collection</button>
      </div>
      <div className='w-[100%] mt-[3rem] flex gap-[2rem] flex-wrap'>
        {
          [1,2,3].map((item, index) => {
            return <ItemCard isCollection key={index} />
          })
        }
      </div>
      <CreateCollectionModal />
    </div>
  )
}

export default MyCollectionsComponent