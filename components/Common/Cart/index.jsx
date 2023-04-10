import { Transition } from '@headlessui/react'
import { Store } from '@/utils'
import { MagnetBold, MagnetMedium, MagnetRegular } from '@/pages/_app'

const {useCartStore} = Store

const CartItem = ()=>{
  return (
    <div className='w-[100%] gap-[10px] flex'>
      <img src='Images/PNG/Gallery4.png' className='w-[70px] rounded-lg h-[70px]' />
      <div className='w-[55%] flex flex-col justify-between h-[70px]'>
        <div>
          <p className={`${MagnetRegular.className} text-[12px]`}>Deranged Music</p>
          <p className={`${MagnetBold.className} text-[12px]`}>Musical Birds Freeway...</p>
        </div>
        <p className={`${MagnetRegular.className} text-[12px] opacity-50`}>OwnerNameGoesHere</p>
      </div>
      <div className='h-[70px] flex items-center justify-center'>
        <p className={`${MagnetBold.className} text-[12px] whitespace-nowrap leading-[23px]`}>15.2 ETH</p>
      </div>
    </div>
  )
}

const Cart = () => {
  const {cartOpen,setCartOpen} = useCartStore()
  return (
    <Transition
    show={cartOpen}
    enter="transition-opacity z-[100] duration-150"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity z-[100] duration-150"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
  >
      <div style={{
        background: 'rgba(0,0,0,0.5)'
      }} onClick={
        () => setCartOpen(false)
      } className="fixed z-[100] h-[100vh] flex justify-end w-[100vw] top-0 left-0">
        <div onClick={e=>e.stopPropagation()} style={cartStyles} className="w-[350px] justify-between flex flex-col items-center h-[550px] mt-[4rem] mr-[4rem]">
          <div className='w-[100%] flex flex-col items-center'>
            <div className='h-[4rem] w-[90%] border-b flex items-center justify-between border-[rgba(0,0,0,0.2)]'>
              <p className={`${MagnetBold.className} text-[16px]`}>Your Cart</p>
              <img src='/Images/SVG/Cross-small.svg' alt='close' onClick={
                () => setCartOpen(false)
              } className='h-[24px] cursor-pointer w-[24px]'/>
            </div>
            <div className='w-[90%] flex justify-between mt-[10px]'>
              <p className={`${MagnetMedium.className} text-[12px]`}>2 Item</p>
              <p className={`${MagnetMedium.className} opacity-50 text-[12px]`}>Clear All</p>
            </div>
          </div>
          <div className='h-[55%] flex flex-col gap-[10px] w-[90%]'>
            <CartItem/>
            <CartItem/>
          </div>
          <div className='w-[100%] flex flex-col items-center '>
            <div className='flex w-[85%] mb-[1rem] justify-between'>
              <p className={`${MagnetBold.className} text-[14px]`}>TOTAL PRICE</p>
              <div>
                <p className={`${MagnetBold.className} text-[14px]`}>30.4 ETH</p>
                <p className={`${MagnetBold.className} text-right opacity-50 text-[12px]`}>$332.22</p>
              </div>
            </div>
            <button className='h-[2.5rem] w-[90%] flex items-center justify-center bg-black rounded-md mb-[1rem]'>
              <p className={`${MagnetMedium.className} text-[14px] leading-[18px] text-white`}>
                Checkout
              </p>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  )
}

const cartStyles = {
  background: '#F5DFC2',
  border: '1.09226px solid #000000',
  backdropFilter: 'blur(16.3839px)',
  borderRadius: '6.55355px'
}

export default Cart