import { MagnetBold } from '@/pages/_app'
import React from 'react'
import { DropDown } from '../SettingsPage/components/AccountSupport/index';

const FAQComponent = ({faqs}) => {
  console.log(faqs)
  return (
    <div className='w-[90vw] flex flex-col items-center'>
      <div className='mt-[3rem] w-[100%]'>
        <p className={`text-[40px] ${MagnetBold.className} text-center h-[3rem] leading-[41px] text-[#000000]`}>Frequently Asked Questions</p>
        <p className={`text-[16px] ${MagnetBold.className} text-center h-[3rem] leading-[24px] opacity-50 text-[#000000]`}>Find out the answers to the most comon questions asked</p>
      </div>
      {
        faqs && faqs.length>0 && faqs.map((faq, index)=>{
          return <DropDown desc={faq.answer} ques={faq.question}/>
        })
      }
    </div>
  )
}

export default FAQComponent