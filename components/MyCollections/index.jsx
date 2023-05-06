import { MagnetBold, MagnetLight, MagnetMedium, web3, ethersProvider } from '@/pages/_app'
import { Store } from '@/utils'
import ItemCard from '../Common/ItemCard'
import CreateCollectionModal from '../Modals/CreateCollection'
import { useContext } from '@/utils/Context';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { verifyUser } from '../../utils/Extras/verifyUser';
import {UpdateCollectionModal} from 'components'
import { useCheckMetamask } from '@/utils/Extras/useGetWalletAddress';
import { changeToMumbaiPolygonTestnet } from '@/utils/Extras/checkChain';

const {useCollectionModalStore} = Store

const MyCollectionsComponent = () => {
  const {collectionModalOpen, setCollectionModalOpen} = useCollectionModalStore()
  const {  setActiveModal:setActiveLoginModal,activeModal } = useContext()
  const [myCollections, setMyCollections] = useState([])
  const router = useRouter()
  const [selectedCollection, setSelectedCollection] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const {checkMetamask} = useCheckMetamask()

  const getCollection = async ()=>{
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/collection/collections/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(data.success){
        setMyCollections(data.collection)
      }
  }

  useEffect(()=>{
    //check token
    const token = localStorage.getItem('token')
    if(!token){
      setActiveLoginModal({
        ...activeModal,
        google: true
      })
    }
  })

  const handleSubmit = async (item) => {
    //check if account is there
    const hasMetaMask =await checkMetamask()
    if(!hasMetaMask){
      return
    }
    await changeToMumbaiPolygonTestnet()
    await window.ethereum.request({ method: 'eth_requestAccounts' });
    const accounts = await web3.eth.getAccounts()
    if(!accounts || accounts.length === 0){
      return
    }

    const args = {
      name: item.name,
      symbol: item.symbol,
      createrAddress: accounts[0],
      royalty: +item.royalty*100,
    }

    await verifyUser(accounts[0])

    console.log(args)
    const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/artist/create-transaction`, {
      from:accounts[0],
      args 
    })

    console.log(data.txObject)
    const signed = await await window.ethereum.request({
      method: 'eth_sendTransaction',
      params: [data.txObject]
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


    if(receipt){
      const deployedCollectionAddress = receipt.logs[0].address
   

    if(signed){
      const {data} = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/collection/collection/${item._id}`, {
        deployedCollectionAddress,
        isDeployed: true
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if(data.success){
        getCollection()
      }

      const { data: updateTransaction } = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/user/update/me`, {
        transaction: {
          transactionHash: receipt.logs[0].address,
          price: null,
          to: deployedCollectionAddress,
          type: 'Deploy Collection',
          date: new Date().toISOString(),
          from: accounts[0],
        }
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })

    }

  } }

  useEffect(()=>{
    getCollection()
  },[collectionModalOpen])
  
  return (
    <div className='w-[70%] mt-[3rem]'>
      <div className=' w-[100%] justify-between'>
        <p className={`text-[40px] ${MagnetBold.className} h-[3rem] leading-[41px] text-[#000000]`}>My Drops</p>
        <p className={`${MagnetMedium.className} opacity-50 text-[16px] text-[#000000]`}>Create, curate, and manage collections of unique NFTs to share and sell.Learn more</p>
        <button onClick={()=>{
          setCollectionModalOpen(true)
        }} className={`bg-[#000000] ${MagnetLight.className} text-[#FFFFFF] text-[16px] mt-[2rem] font-bold px-[2rem] py-[0.8rem] rounded-md`}>Create a new Drop</button>
      </div>
      <div className='w-[100%] mt-[3rem] flex gap-[2rem] flex-wrap'>
        {
          myCollections.map((item, index) => {
            let status = item.isDeployed? 'Deployed': item.isApproved? 'Deploy Contract': 'Add Items'
            let isDisabled = status === 'Deployed'
            return <div className='relative'>
              <div className="absolute top-[5px] right-[5px] z-[1]">
                <img onClick={()=>{
                  setSelectedCollection(item)
                  setIsOpen(true)
                }} src="Images/SVG/Edit.svg" className="cursor-pointer " />
              </div>
              <ItemCard isDisabled={isDisabled} item={item} onCollectionClick={() =>!item.isApproved ? (()=>{
              router.push({
                pathname: '/create-item',
                query: {
                  collectionId: item._id
                }
              })
            })() : !item.isDeployed && handleSubmit(item)} isCollection key={index} collectionStatus={status} />
            </div>
          })
        }
      </div>
      <CreateCollectionModal />
      <UpdateCollectionModal collection={selectedCollection} isOpen={isOpen} setActiveModal={setIsOpen} />
    </div>
  )
}

export default MyCollectionsComponent