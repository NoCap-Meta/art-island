import { MagnetLight, MagnetRegular } from "pages/_app"
import { useState } from "react"
import Slider from "react-slick";

const Card = ({ image }) => {
  return (

    <div className="ml-[2rem]">
      <p className={`${MagnetRegular.className} text-[16px] leading-[160%]`}>
        LOREM IPSUM SIT DOLOR
      </p>
      <img className="" src={image} />
    </div>

  )
}

const Browse = () => {
  const [image, setImage] = useState([
    {
      id: 1,
      image: "Images/PNG/Browse1.png"
    },
    {
      id: 2,
      image: "Images/PNG/Browse2.png"
    },
    {
      id: 3,
      image: "Images/PNG/Browse3.png"
    },
    {
      id: 4,
      image: "Images/PNG/Browse4.png"
    },
    {
      id: 5,
      image: "Images/PNG/Browse5.png"
    },
    {
      id: 6,
      image: "Images/PNG/Browse6.png"
    }
  ])

  const settings = {
    dots: false,
    // infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
    centerMode: true,
    centerPadding: '5%',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]


  };

  return (
    <div className="min-h-[100vh] bg-[#f5dfc2] w-[100vw]">
      <div className="w-[100vw] pt-[128px]">
        <p className={`${MagnetLight.className} text-[72px] leading-[91px] text-center`}>
          Browse Collectibles
        </p>
      </div>
      <div className="w-[100vw] flex justify-center mt-[90px]">
        <div className="w-[100vw]">
          <Slider {...settings}>
            {image.map((item) => (
              <Card key={item.id} image={item.image} />
            ))}
          </Slider>
        </div>
      </div>

    </div>
  )
}

export default Browse