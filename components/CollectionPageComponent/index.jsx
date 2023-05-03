import React from 'react'
import CollectionHeader from '../Common/CollectionHeader'
import { BuyItemCard } from '../Common/TopCollectionSection'

const CollectionPageComponent = ({collection, items}) => {
  return (
    <div>
      <div className="flex flex-col items-center w-screen">
        <CollectionHeader collection={collection} />
         <div className='w-[90%] mt-[2rem] flex gap-[2rem]'>
         {
          items && items.length>0 && items.map((item, index) => {
            return (
              <BuyItemCard item={item} items={items} key={index} />
            )
          })
        }
         </div>
      </div>
    </div>
  )
}

export default CollectionPageComponent