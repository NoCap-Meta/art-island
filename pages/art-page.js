import { ArtPageHero, Details, ItemActivity } from 'components'
import { convertMaticToUsd, MagnetMedium } from 'pages/_app';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ArtPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [item, setItem] = useState(null)

  useEffect(() => {
    const getItem = async () => {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items/item/${id}`)
      if (data.success) {
        const usdPrice = await convertMaticToUsd(data.item.pricePerFraction)

        setItem({ ...data.item, usdPrice })
      }
    }

    if (id) {
      getItem()
    }
  }, [id])

  return (
    <div>
      <div className='pb-[125px] bg-[#f5dfc2]'>
        <ArtPageHero item={item} />
        <Details item={item} />
        <ItemActivity item={item} />
      </div>
    </div>
  )
}

export default ArtPage