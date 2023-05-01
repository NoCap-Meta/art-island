import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'
import {MagnetBold, MagnetMedium, MagnetRegular, web3} from 'pages/_app.js'
import InputField from '@/components/Common/InputField'
import { handleReList } from '@/utils/Extras/relistNFT'
import axios from 'axios'





export default function RelistModal({item, isOpen, setIsOpen:setActiveModal}) {
  const [buttonTitle, setButtonTitle] = useState('Sign the Token')
  const [formData, setFormData] = useState({
    fractionsToList: '',
  })

  function closeModal() {
    setActiveModal(false)
  }

  const handleChange = (e, key, isDropDown)=>{
    if(isDropDown){
      setFormData({
        ...formData,
        [key]: e
      })
      return
    }
    setFormData({
      ...formData,
      [key]: e.target.value
    })
  }


  const handleSubmit = async ()=>{
    setButtonTitle('Submitting...')

    //check for address in web3
    if(!window.ethereum){
      setButtonTitle('Sign the Token')
      return
    }

    const accounts = await web3.eth.getAccounts()

    if(!accounts || accounts.length===0){
      setButtonTitle('Sign the Token')
      return 
    }

    const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/items/authenticate-voucher`, {
      collectionAddress: item.collection.deployedCollectionAddress,
      tokenID: 12,
      fractionsToList: formData.fractionsToList,
      account: accounts[0]
    },{
      headers:{
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    if(!data.success){
      setButtonTitle('Sign the Token')
      return
    }

    const {txObject} = data

    const signed = await await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [txObject],
    });


    let receipt = null;
    while (receipt === null) {
      receipt = await window.ethereum.request({
        method: 'eth_getTransactionReceipt',
        params: [signed],
      });

      // Wait for 1 second before trying again
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    console.log(receipt)

    handleReList(item, ()=>{}, ()=>{}, formData.fractionsToList)
  }

let isDisabled = formData.address===null || buttonTitle === 'Submitting...' || formData.firstName === '' || formData.lastName === '' || formData.phoneNumber === '' || formData.apartmentNumber === '' || !item


  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-full p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" transform overflow-visible bg-[#F5DFC2] justify-between rounded-md flex flex-col items-center min-h-[10vh] w-[30vw] p-6 text-left align-middle shadow-xl transition-all">
                    <div className='w-[100%] overflow-visible'>
                      <div className='w-[100%] flex justify-between'>
                        <p className={`${MagnetBold.className} text-[18px] text-left`}>
                          Number of Items to relist
                        </p>
                        <button onClick={closeModal} className='text-[20px] text-right'>
                          <img src='Images/SVG/Cross-Black.svg' alt='close' />
                        </button>
                      </div>
                      <p className={`${MagnetRegular.className} opacity-50  text-[14px] text-left`}>
                        {item?.name}
                      </p>
                      <div className='w-[100%] mt-[1rem] overflow-visible'>
                      <InputField tyle={'number'} value={formData.fractionsToList} onChange={(e)=>handleChange(e, 'fractionsToList')} placeholder={`Maximum ${item.frequency}`} >
                        Fractions to List
                      </InputField>
                    </div>
                    <button onClick={handleSubmit} disabled={
                      isDisabled
                    } className={`mt-[3rem] ${MagnetMedium.className} ${isDisabled && 'opacity-50'} w-[100%] h-[40px] rounded-md bg-[#000000] text-[#FFFFFF] text-[16px]`}>
                      {buttonTitle}
                    </button>
                    </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
