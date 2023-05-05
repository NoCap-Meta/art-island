import { FAQComponent } from "@/components"
import axios from 'axios';

const FAQ = ({ faqs }) => {
  return (
    <div>
      <div className='pb-[125px] flex flex-col items-center min-h-[100vh]  bg-[#f5dfc2]'>
        <FAQComponent faqs={faqs} />
      </div>
    </div>
  )
}

//getServerSideProps
export async function getServerSideProps(context) {
  try {

    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/faq`)


    return {
      props: {
        faqs: data.faqs
      }
    }
  }
  catch (err) {
    console.log(err)
    return {
      notFound: true
    }
  }
}

export default FAQ