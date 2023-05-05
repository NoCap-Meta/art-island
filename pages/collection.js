import { CollectionPageComponent } from "@/components"
import axios from "axios"


const CreateItem = ({ collection, items }) => {
  return (
    <div>
      <div className='pb-[125px] min-h-[100vh] flex flex-col items-center  bg-[#f5dfc2]'>
        <CollectionPageComponent collection={[collection]} items={[...items, ...items, ...items]} />
      </div>
    </div>
  )
}

//getServerSideProps
export async function getServerSideProps(context) {
  try {
    //query id
    const { id } = context.query

    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/collection/collection/${id}`)
    if (!data.success) {
      return {
        notFound: true
      }
    }

    const items = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items/collection/${id}`)
    if (!items.data.success) {
      return {
        notFound: true
      }
    }


    return {
      props: {
        collection: data.collection,
        items: items.data.items
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


export default CreateItem