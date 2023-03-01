import { MagnetLight, MagnetRegular } from 'pages/_app';

const Featured = () => {
  return (
    <div className="w-[100vw] h-[100vh] flex items-center justify-center bg-black">
      <div className="h-[80vh] justify-between w-[95vw] items-end flex">
        <div className="h-[80vh] overflow-y-hidden">
          <div>
            <p className={`${MagnetLight.className} text-white text-[72px] leading-[91px]`}>
              Featured<br /> masterpieces.
            </p>
            <p className={`${MagnetLight.className} text-[16px] leading-[160%] text-white w-[30vw] italic mt-[12px]`}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam eu turpis molestie, dictum est a, mattis tellus. Sed dignissim, metus nec fringilla accumsan, risus sem sollicitudin lacus, ut interdum tellus elit sed risus. Maecenas eget condimentum velit.
            </p>
          </div>
          <img src='Images/PNG/Success1.png' />
        </div>
        <img src='Images/PNG/Featured1.png' />
        <img src='Images/PNG/Featured2.png' className='h-[512px]' />
      </div>
    </div>
  )
}

export default Featured