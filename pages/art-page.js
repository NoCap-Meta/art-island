import { ArtPageHero, Details, ItemActivity } from 'components'
import { convertMaticToUsd, MagnetMedium } from 'pages/_app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Store } from 'utils';
import RelistArtPageHero from '@/components/Art-Page/RelistHero';

const { useSelectedItemStore } = Store

const ArtPage = ({ item }) => {
  const router = useRouter()
  console.log(item)
  const { selectedItem, setSelectedItem } = useSelectedItemStore()

  useEffect(() => {
    setSelectedItem(router.query.id, item)
  }, [])

  return (
    <div>
      <div className='pb-[125px] bg-[#f5dfc2]'>
        {item && !item.fully_subscribed && <ArtPageHero item={item} />}
        {item && item.fully_subscribed && <RelistArtPageHero item={item} />}
        <Details item={item} />
        <ItemActivity item={item} />
      </div>
    </div>
  )
}

export const getServerSideProps = async (context) => {
  const { id } = context.query
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items/item/${id}`)
    console.log(data)
    if (data.success) {
      const usdPrice = await convertMaticToUsd(data.item.pricePerFraction)
      return {
        props: {
          item: { ...data.item, usdPrice }
        }
      }
    }
    return {
      props: {
        item: null
      }
    }
  }
  catch (err) {
    console.log(err)
    return {
      props: {
        item: null
      }
    }
  }
}


export default ArtPage