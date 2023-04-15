import { MagnetRegular } from '@/pages/_app'

const FooterCommon = () => {
  return (
    <div className='w-[90vw] justify-between flex items-center h-[4rem] mt-[3rem] border-t border-[rgba(0,0,0,0.5)]'>
      <div>
        <p className={`${MagnetRegular.className} opacity-50 text-[#000000] text-[16px]`}>© NoCap Meta, Mumbai IN</p>
      </div>
      <div className='flex gap-[2rem]'>
        <p className={`${MagnetRegular.className} opacity-50 text-[#000000] text-[16px]`}>Terms of Service</p>
        <p className={`${MagnetRegular.className} opacity-50 text-[#000000] text-[16px]`}>Privacy Policy</p>
      </div>
    </div>
  )
}

export default FooterCommon