import { MagnetBold } from '@/pages/_app'
import { useRouter } from 'next/router'
import ItemCard from '../Common/ItemCard'

const MyCollectionsComponent = () => {
  const router = useRouter()
  return (
    <div className='w-[70%] mt-[3rem]'>
      <div className='flex w-[100%] justify-between'>
        <p className={`text-[40px] ${MagnetBold.className} h-[3rem] leading-[41px] text-[#000000]`}>My Collections</p>
        <button onClick={()=>{
          router.push('/create-collection')
        }} className={`bg-[#000000] ${MagnetBold.className} text-[#FFFFFF] text-[16px] font-bold px-[1rem] py-[0.5rem] rounded-md`}>Create Collection</button>
      </div>
      <div className='w-[100%] mt-[2rem] justify-center flex gap-[2rem] flex-wrap'>
        {
          [1,2,3,4,5,6,7,8,9,10,11,12].map((item, index) => {
            return <ItemCard key={index} />
          })
        }
      </div>
    </div>
  )
}

export default MyCollectionsComponent