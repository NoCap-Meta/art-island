import { useContext } from '@/utils/Context'
import { Store } from '@/utils'
import axios from 'axios'
import { NavBar } from 'components'
import { MagnetBold, MagnetLight, MagnetMedium } from 'pages/_app'
import { useState, useEffect } from 'react'
import { handleBuyNFTUser } from '@/utils/Extras/buyNFTUser'
import { useCheckMetamask } from '@/utils/Extras/useGetWalletAddress'
import parse from 'html-react-parser'
import { useRouter } from 'next/router';

const {useUserStore,useSelectedItemStore} = Store



const PropertiesCard = ({prop}) => {
  return (
    <div className='bg-[rgba(255,255,255,0.5)] rounded-lg px-[20px] py-[11px] w-[190px]'>
      <p className={`${MagnetMedium.className} text-center text-[14px] leading-[18px]`}>
      {prop?.type}
      </p>
      <p className={`${MagnetMedium.className} mt-[4px] text-center text-[14px] leading-[18px]`}>
       
      </p>
      <p className={`${MagnetMedium.className} mt-[4px] text-center text-[14px] opacity-50 leading-[18px]`}>
        {prop?.name?.toUpperCase()}
      </p>
    </div>
  )
}


const ArtPageHero = () => {
  const [selectedImage, setSelectedImage] = useState('')
  const {activeModal, setActiveModal} = useContext()
  const {selectedItem:item, setSelectedItem} = useSelectedItemStore()
  const {user, setUser} = useUserStore()
  const [status, setStatus] = useState('Buy Now')
  const [images, setImages] = useState([])
  const {checkMetamask} = useCheckMetamask()
  const router = useRouter()

  let isLiked = item && item.likedUsers.includes(user.id)


  const handleLike = async ()=>{
    if(!localStorage.getItem('token')){
      setActiveModal({
        ...activeModal,
        google:true
      })
    }else{
      const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/items/like/${item._id}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

      if(data.success){
        setSelectedItem(item._id)
      }
    }
  }

  useEffect(()=>{
    if(item && item.allImages){
      let newImages = item.allImages.map((item)=>{
        return {
          image:item,
          selected:false
        }
      })
      setImages(newImages)
      setSelectedImage(item.allImages[0])
    }
  },[item])

  const handleImage = (id)=>{
    const newImages = images.map((item)=>{
      if(item.image === id){
        return {
          ...item,
          selected:true
        }
      }else{
        return {
          ...item,
          selected:false
        }
      }
    })
    setImages(newImages)
    setSelectedImage(id)
  }


  return (
    <div className="min-h-[100vh] w-[100vw]">
      <div className="w-[100vw] mt-[2rem] flex justify-center">
        <div className='w-[90vw] flex xl:flex-row flex-col'>
          <div className='xl:w-[44.5vw] w-[90vw] gap-[1rem] flex xl:flex-row flex-col'>
            <div className='flex gap-[1rem]'>
              <div className='xl:w-[85px] w-[90vw] flex xl:flex-col xl:justify-start justify-center flex-row gap-[5px]'>
                {
                  images && images.map((item) => {

                    return (
                      item  && <div key={item.image} onClick={() => handleImage(item.image)} className='!w-[85px] cursor-pointer h-[142px] rounded-xl' style={{
                        backgroundImage: `url(${item.image})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                      }}
                      />
                    )
                  })
                }

              </div>
              <div className='h-[584px] flex flex-col justify-end rounded-xl border-[2px] border-black xl:w-[505px]'>
                <div className='xl:w-[505px] h-[541px] border-t-[2px] border-black' style={{
                  backgroundImage: `url(${selectedImage})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',

                }}
                />
              </div>
            </div>
          </div>
          <div className='xl:w-[44.5vw] xl:mt-[0] mt-[1rem] flex flex-col'>
            <p onClick={()=>{
              router.push(`/collection?id=${item?.collection?._id}`)
            }} className={`${MagnetMedium.className} cursor-pointer text-[18px] leading-[23px]`}>
              {
                item ? ' Drop: ' + item?.collection?.name : ''
              }
            </p>
            <div className='flex w-[100%] xl:mb-[0] mb-[1rem] items-center my-[-10px] justify-end gap-[1rem] h-[24px]'>
              <img src={isLiked ?'Images/SVG/HeartFilled.svg' : 'Images/SVG/Heart.svg'} className={`cursor-pointer`} onClick={handleLike} />
              {/* <img src='Images/SVG/Share.svg' /> */}
              <p className={`${MagnetMedium.className} overflow-hidden h-[1.5rem] text-[20px]`}>
                  {item && item?.likes} liked this listing
                </p>
            </div>
            <p className={`${MagnetBold.className} text-[36px] leading-[46px]`}>
              {
                item ? item?.name : ''
              }
            </p>
            <div className={`w-[100%] ${MagnetMedium.className} rounded-xl bg-[rgba(255,255,255,0.5)] p-[12px] border mt-[1rem] border-[rgba(0,0,0,0.5)]`}>
            {item && item?.shortDesc}
            </div>
           {item && item?.hasUnlockableContent &&  <div onClick={()=>{
            user.boughtItems.includes(item._id) && window.open(item.unlockableFiles[0])
           }} className={`w-[100%] ${MagnetMedium.className} rounded-xl bg-[#CEF0A4] p-[12px] border mt-[1rem] text-[#192805] border-[#192805]`}>
              {
                user.boughtItems.includes(item._id) ? 'You have access to the Unlockable Content' : 'This item has unlockable content'
              }
            </div>}
            <div className={'flex gap-[32px] mt-[28px] h-[30px]'}>
              <div className='flex items-center gap-[12px]'>
                <img className='h-[24px]' src='Images/SVG/Eye-open.svg' />
                <p className={`${MagnetMedium.className} text-[20px]`}>
                  Available {item && (item.maxFractions - item.tokenBuyed)} of {item && item.maxFractions} Primary Sale Tokens
                </p>
              </div>
             
            </div>
            {item && item.frequency && <div className={'flex gap-[32px] mt-[28px] h-[30px]'}>
              <div className='flex items-center gap-[12px]'>
                <img className='h-[24px]' src='Images/SVG/Heart.svg' />
                <p className={`${MagnetMedium.className} text-[20px]`}>
                  You Own {item && item.frequency || 0} of {item && item.maxFractions} Tokens
                </p>
              </div>
            </div>}
            <div className='mt-[28px]'>
              <p className={`${MagnetMedium.className} text-[18px] opacity-50 leading-[23px]`}>
                Current Price
              </p>
              <div className='flex gap-[10px] items-end mt-[6px]'>
                <p className={`${MagnetBold.className} text-[36px] leading-[46px]`}>
                  {
                    item && item.pricePerFraction + ' Matic'
                  }
                </p>
                <p className={`${MagnetMedium.className} text-[18px] mb-[5px] opacity-50 leading-[23px]`}>
                  {
                    item && '$'+item.usdPrice
                  }
                </p>
              </div>
            </div>
            <div className='mt-[20px]'>
              <div onClick={async ()=>{
                 const hasMetaMask =await checkMetamask()
                 if(!hasMetaMask){
                   return
                 }
                 if(item&&item.isDeployed){
                   handleBuyNFTUser(item, ()=>{}, setStatus, setUser, user, 1)
                 }
              }} className={`w-[247px] h-[52px] ${(!item || !item.isDeployed) && 'opacity-50'} bg-black cursor-pointer flex items-center gap-[10px] rounded-xl justify-center`}>
                <img src='Images/SVG/Cart.svg' />
                <p className={`${MagnetMedium.className} text-[18px] leading-[23px] text-white`}>
                  {status}
                </p>
              </div>
              <p onClick={()=>router.push(`/warehouseitem?id=${item?.warehouseItemId}`)} className={`${MagnetMedium.className} mt-[1rem] cursor-pointer text-[18px]`}>
                  Warehouse Item ID: {item?.warehouseItemId}
              </p>
             {item && item.properties && item.properties.length>0 && <div className='w-[100%] flex justify-between mt-[20px]'>
                <div className='flex items-center gap-[12px]'>
                  <img className='h-[24px]' src='Images/SVG/Tag.svg' />
                  <p className={`${MagnetMedium.className} text-[18px]`}>
                    Properties
                  </p>
                </div>
                <div className='flex gap-[1rem]'>
                  
                </div>
              </div>}
              <div className='flex w-[100%] gap-[1rem] mt-[10px]'>
                {
                  item && item.properties && item.properties.map((item) => {
                    return <PropertiesCard prop={item} />
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtPageHero