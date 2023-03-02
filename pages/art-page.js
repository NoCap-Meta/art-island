import { MagnetBold, MagnetLight } from 'pages/_app'
import { useState } from 'react'

const ArtPage = () => {
  const [selectedImage, setSelectedImage] = useState('Images/PNG/Gallery1.png')
  const [image, setImage] = useState([
    {
      id: 1,
      image: 'Images/PNG/Gallery1.png',
      selected: true
    },
    {
      id: 2,
      image: 'Images/PNG/Gallery2.png',
      selected: false
    },
    {
      id: 3,
      image: 'Images/PNG/Gallery3.png',
      selected: false
    },
    {
      id: 4,
      image: 'Images/PNG/Gallery4.png',
      selected: false
    },
    {
      id: 5,
      image: 'Images/PNG/Gallery5.png',
      selected: false
    }
  ])

  const handleImage = (id) => {
    const newImage = image.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          selected: true
        }
      } else {
        return {
          ...item,
          selected: false
        }
      }
    })
    setImage(newImage)
    setSelectedImage(newImage[id - 1].image)
  }


  return (
    <div className="min-h-[100vh] bg-[#f5dfc2] w-[100vw]">
      <div className="w-[100vw] flex justify-center">
        <div className="w-[90vw] h-[70px] justify-between flex items-center">
          <div className="flex gap-[10px] h-[70px]  items-center">
            <img src='Images/SVG/Star.svg' />
            <p className={`${MagnetBold.className} text-[24px] overflow-hidden leading-[29px] text-black`}>
              ART ISLAND RODEO CLUB
            </p>

          </div>
          <div className='flex gap-[5px] h-[70px]  items-center'>
            <img className='opacity-50' src='Images/SVG/Search.svg' />
            <p className={`text-[18px] leading-[23px] opacity-50 ${MagnetLight.className}`}>
              Search NFTs, Collections...
            </p>
          </div>
          <div className='flex gap-[50px] h-[70px]  items-center'>
            <p className={`text-[18px] leading-[23px] opacity-50 ${MagnetLight.className}`}>
              Explore
            </p>
            <p className={`text-[18px] leading-[23px] opacity-50 ${MagnetLight.className}`}>
              Stats
            </p>
            <p className={`text-[18px] leading-[23px] opacity-50 ${MagnetLight.className}`}>
              Create
            </p>
            <img src='Images/SVG/Menu.svg' />
          </div>
        </div>
      </div>
      <div className="w-[100vw] mt-[2rem] flex justify-center">
        <div className='w-[90vw] flex'>
          <div className='w-[45vw] gap-[1rem] flex'>
            <div className='w-[85px] flex flex-col gap-[5px]'>
              {
                image.map((item) => {
                  return (
                    !item.selected && <div key={item.id} onClick={() => handleImage(item.id)} className='w-[85px] cursor-pointer h-[142px] rounded-xl' style={{
                      backgroundImage: `url(${item.image})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                    />
                  )
                })
              }

            </div>
            <div className='h-[584px] flex flex-col justify-end rounded-xl border-[2px] border-black w-[505px]'>
              <div className='w-[505px] h-[541px] border-t-[2px] border-black' style={{
                backgroundImage: `url(${selectedImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',

              }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArtPage