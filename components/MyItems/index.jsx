import { MagnetBold, MagnetLight, MagnetMedium, web3, ethersProvider } from '@/pages/_app'
import { Store } from '@/utils'
import ItemCard from '../Common/ItemCard'
import CreateCollectionModal from '../Modals/CreateCollection'
import { useContext } from '@/utils/Context';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { DeployItemCard } from '../Artist-Profile/ArtistHero';
import { handleBuyPrimaryNFT } from '@/utils/Extras/buyNFT';
import { useCheckMetamask } from '@/utils/Extras/useGetWalletAddress';

const {useCollectionModalStore} = Store

const MyItems = () => {
  const {collectionModalOpen, setCollectionModalOpen} = useCollectionModalStore()
  const {  setActiveModal:setActiveLoginModal,activeModal } = useContext()
  const [myItems, setMyItems] = useState([])
  const router = useRouter()
  const {checkMetamask} = useCheckMetamask()

  const getCollection = async ()=>{
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(data.success){
        setMyItems(data.items)
      }
  }

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


  useEffect(()=>{
    getCollection()
  },[collectionModalOpen])

  const handleDeployItem = async (item, setStatus) => {
    const hasMetaMask =await checkMetamask()
    if(!hasMetaMask){
      return
    }
    await handleBuyPrimaryNFT(item, getCollection, setStatus)
  }
  
  return (
    <div className='w-[70%] mt-[3rem]'>
      <div className=' w-[100%] justify-between'>
        <p className={`text-[40px] ${MagnetBold.className} h-[3rem] leading-[41px] text-[#000000]`}>My Items</p>
        <p className={`${MagnetMedium.className} opacity-50 text-[16px] text-[#000000]`}>Create, curate, and manage collections of unique NFTs to share and sell.Learn more</p>
        <button onClick={()=>router.push('/create-item')} className={`bg-[#000000] ${MagnetLight.className} text-[#FFFFFF] text-[16px] mt-[2rem] font-bold px-[2rem] py-[0.8rem] rounded-md`}>Create an Item</button>
      </div>
      <div className='w-[100%] mt-[3rem] flex gap-[2rem] flex-wrap'>
        {
          myItems.map((item, index) => {
            return <DeployItemCard handleDeployItem={handleDeployItem} item={item} key={item._id}/>
          })
        }
      </div>
      <CreateCollectionModal />
    </div>
  )
}

export default MyItems