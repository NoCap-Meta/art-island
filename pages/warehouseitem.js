import { FAQComponent } from "@/components"
import axios from 'axios';
import { useRouter } from 'next/router';
import { MagnetBold } from '@/pages/_app'

const WareHouseItem = () => {
  const router = useRouter()

  const { id } = router.query
  return (
    <div>
      <div className='pb-[125px] flex flex-col items-center min-h-[100vh]  bg-[#f5dfc2]'>
        <div className='mt-[3rem] w-[100%]'>
          <p className={`text-[40px] ${MagnetBold.className} text-center h-[3rem] leading-[41px] text-[#000000]`}>Documents for Warehouse Item ID {id}</p>
          {/* <p className={`text-[16px] ${MagnetBold.className} text-center h-[3rem] leading-[24px] opacity-50 text-[#000000]`}>Find out the answers to the most comon questions asked</p> */}
        </div>
        <div className='flex mt-[2rem] justify-center gap-[2rem] w-[90vw] '>
          {[{
            name: 'Document 1',
            image: '/Images/PNG/ImageIcon.png',
            link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            timestamp: '2021-09-01 12:00:00'
          }, {
            name: 'Document 2',
            link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            image: '/Images/PNG/PDFIcon.png',
            timestamp: '2022-10-05 12:00:00'
          }, {
            name: 'Document 3',
            link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            image: '/Images/PNG/ImageIcon.png',
            timestamp: '2020-10-02 12:00:00'
          }, {
            name: 'Document 4',
            link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            image: '/Images/PNG/PDFIcon.png',
            timestamp: '2020-06-04 12:00:00'
          }
          ].map((e) => {
            return <div>
              <div onClick={()=>{
                window.open(e.link)
              }} key={e.name} className="h-[10rem] w-[10rem] flex flex-col items-center justify-center border border-black rounded-md">
                <img src={e.image} className="h-[6rem] w-[6rem] rounded-md" />
              </div>
              <div className='w-[10rem] text-center mt-[1rem]'>
                <p className={`text-[16px] ${MagnetBold.className} text-center leading-[24px] opacity-50 text-[#000000]`}>{e.name}</p>
                <p className={`text-[16px] ${MagnetBold.className} text-center leading-[24px] opacity-50 text-[#000000]`}>{
                  //format e.timestamp
                  new Date(e.timestamp).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })
                }</p>
              </div>
            </div>
          })}
        </div>
        <div className='flex mt-[2rem] justify-center gap-[2rem] w-[90vw] '>
          {[{
            name: 'Document 5',
            image: '/Images/PNG/MP4Icon.png',
            link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            timestamp: '2022-06-04 12:00:00'
          }, {
            name: 'Document 6',
            link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            image: '/Images/PNG/PDFIcon.png',
            timestamp: '2019-07-03 12:00:00'
          }, {
            name: 'Document 7',
            link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            image: '/Images/PNG/PDFIcon.png',
            timestamp: '2020-03-07 12:00:00'
          }, {
            name: 'Document 8',
            link: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
            image: '/Images/PNG/MP4Icon.png',
            timestamp: '2021-10-11 12:00:00'
          }
          ].map((e) => {
            return <div>
              <div onClick={()=>{
                window.open(e.link)
              }} key={e.name} className="h-[10rem] w-[10rem] flex flex-col items-center justify-center border border-black rounded-md">
                <img src={e.image} className="h-[6rem] w-[6rem] rounded-md" />
              </div>
              <div className='w-[10rem] text-center mt-[1rem]'>
                <p className={`text-[16px] ${MagnetBold.className} text-center leading-[24px] opacity-50 text-[#000000]`}>{e.name}</p>
                <p className={`text-[16px] ${MagnetBold.className} text-center leading-[24px] opacity-50 text-[#000000]`}>{
                  //format e.timestamp
                  new Date(e.timestamp).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'short', year: 'numeric'
                  })
                }</p>
              </div>
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default WareHouseItem