import { MyCollectionsComponent } from "@/components"
import { useUserStore } from "@/utils/Zustand"
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const MyCollections = () => {
  const { user } = useUserStore()
  const router = useRouter()

  useEffect(() => {
    if (!user.email.includes('@nocapmeta.in')) {
      router.push('/')
    }
  }, [])

  return (
    <div>
      <div className='pb-[125px] flex flex-col items-center min-h-[100vh]  bg-[#f5dfc2]'>
        <MyCollectionsComponent />
      </div>
    </div>
  )
}

export default MyCollections