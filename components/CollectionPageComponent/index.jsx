import React from 'react'
import CollectionHeader from '../Common/CollectionHeader'
import { BuyItemCard } from '../Common/TopCollectionSection'

const CollectionPageComponent = ({ collection, items }) => {
  return (
    <div>
      <div className="flex flex-col items-center w-screen">
        <CollectionHeader collection={collection} />
        <div className='w-[90%] mt-[2rem] flex flex-wrap gap-[2rem]'>
          {items && items.length > 0 &&
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {items.map((item, index) => (
                <div key={index}>
                  <BuyItemCard item={item} items={items} />
                </div>
              ))}
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default CollectionPageComponent