import { MagnetBold, MagnetMedium, web3 } from "@/pages/_app"
import InputField from "../Common/InputField"
import Toggle from 'react-toggle'
import { Store } from "@/utils"
import { CreateItemModal, DropDownInput, AddLevelsModals, AddStatsModal } from ".."
import { useContext } from '@/utils/Context';
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"


const {useCreateItemStore, useItemModalStore, useItemLevelModalStore, useItemStatsModalStore} = Store

const Property = ({name, desc, imageName, toggle, addable, keyValue, onOpenClick}) => {
  const {itemModalData,setItemModalData} = useItemModalStore()

  return (
    <div className="w-[100%] border-b pb-[10px] border-[rgb(0,0,0,0.5)] mt-[1rem] items-center flex justify-between">
          <div className="flex gap-[1rem] items-center">
            <img src={`Images/SVG/${imageName}.svg`} className='w-[20px] h-[20px]'/>
            <div>
              <p className={`text-[16px] ${MagnetBold.className} text-[#000000]`}>{name}</p>
              <p className={`text-[14px] ${MagnetMedium.className} opacity-50 text-[#000000]`}>{desc}</p>
            </div>
          </div>
          {toggle && <Toggle
        defaultChecked={false}
        onChange={(e)=>{
          setItemModalData({
            ...itemModalData,
            [keyValue]: e.target.checked
          })
        }}
        className='toggle-button'
        icons={{
          checked: null,
          unchecked: null,
        }}
        />}
        {
          addable && <div onClick={onOpenClick} className="h-[50px] w-[50px] border flex items-center justify-center border-[rgb(0,0,0,0.5)] rounded-md">
            <img src="Images/SVG/Plus-Black.svg" className="w-[24px] h-[24px]"/>
          </div>
        }
        </div>
  )
}

const CreateItemComponent = () => {
  const {  setActiveModal:setActiveLoginModal,activeModal } = useContext()
  const {setItemLevelModalOpen} = useItemLevelModalStore()
  const {setItemStatsModalOpen} = useItemStatsModalStore()
  const {setCreateItemModalState} = useCreateItemStore()
  const fileRef = useRef(null)
  const [collections, setCollections] = useState([{
    name: 'Select Collection',
    value:''
  }])
  const {itemModalData,setItemModalData} = useItemModalStore()
  const [file, setFile] = useState(null)
  const [previewImage, setPreviewImage] = useState(null)
  const router = useRouter()

  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(!token){
      setActiveLoginModal({
        ...activeModal,
        google: true
      })
      return
    }

    //check web3 account
    const getAccount = async ()=>{
      const accounts = await web3.eth.getAccounts()
      if(!accounts || accounts.length<1){
        setActiveLoginModal({
          ...activeModal,
          wallet: true
        })
      }
    }

    getAccount()
  })

  useEffect(()=>{
    if(router.query.collectionId){
      setItemModalData({
        ...itemModalData,
        collectionId: router.query.collectionId
      })
    }

  },[collections, 
  router.query.collectionId
  ])

  useEffect(()=>{
    //fetch collections
    const fetchCollection = async ()=>{
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/collection/collections/me`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if(data.success){
        const newCollections = data.collection.map((collection)=>{
          return {
            name: collection.name,
            value: collection._id
          }
        })
        setCollections(newCollections)
      }
    }

    //set form account
    const getAccount = async ()=>{
      const accounts = await web3.eth.getAccounts()
      if(!accounts || accounts.length<1){
        setActiveLoginModal({
          ...activeModal,
          wallet: true
        })
        return
      }else{
        setItemModalData({
          ...itemModalData,
          createrAddress: accounts[0]
        })
      }
    }

    getAccount()

    fetchCollection()
  },[])

  const handleChange = (e) => {
    const file = e.target.files[0]
    setFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewImage(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleFormDataChange = (e, key, isDropDown) =>{
    if(isDropDown){
      setItemModalData({
        ...itemModalData,
        [key]: e
      })
    }else{
      setItemModalData({
        ...itemModalData,
        [key]: e.target.value
      })
    }
  }

  const handleUpload = async () => {
    if (!localStorage.getItem('token')) {
      setActiveLoginModal({
        ...activeModal,
        google: true
      })
      return
    }

    if(!file) return

    const formData = new FormData()
    formData.append('file', file)
    try {
      const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload/upload-s3`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'boundary': '----WebKitFormBoundary7MA4YWxkTrZu0gW'
        }
      })
      console.log('File uploaded successfully!', data.data)
      setItemModalData({
        ...itemModalData,
        image: data.data.Location
      })
      return data.data.Location
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  };

  const handleSubmit = async ()=>{
    const imageUrl = await handleUpload()

    if(!imageUrl) return

    const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/items/item`, {
      ...itemModalData,
      image: imageUrl
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })

    if(data.success){
      setCreateItemModalState(false)
    }


  }


  return (
    <div className='w-[70%] mt-[3rem]'>
      <p className={`text-[40px] ${MagnetBold.className} h-[3rem] leading-[41px] text-[#000000]`}>Create New Item</p>

      <div className="mt-[3rem]">
        <div>
          <p className={`text-[18px] ${MagnetBold.className} text-[#000000]`}>Upload Image, Video, Audio or 3D Model</p>
          <p className={`text-[16px] ${MagnetMedium.className} opacity-50 text-[#000000]`}>File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</p>
        </div>
        <div onClick={()=>{
          fileRef.current.click()
        }} className="w-[100%] h-[40vh] cursor-pointer border flex items-center justify-center border-dotted rounded-lg mt-[10px] border-black">
            {!previewImage && <img src="Images/SVG/Upload.svg" className="w-[24px] h-[24px]"/>}
            {
              previewImage && <img src={previewImage} className=" h-[10rem] rounded-md object-cover"/>
            }
            <input accept={'image/png, image/jpeg, image/gif, image/svg+xml, image/webp, image/apng, image/bmp, image/x-icon, image/vnd.mi, image/tiff, image/tiff-fx, image/vnd.adobe.photoshop, image/vnd.dwg, image/vnd.dxf, image/vnd.dgn, image/vnd.djvu, image/vnd.djvu+multipage, image/vnd.dxf, image/vnd.fastbidsheet, image/vnd.fpx, image/vnd.fst, image/vnd.fujixerox.edmics-mmr, image/vnd.fujixerox.edmics-rlc, image/vnd.globalgraphics.pgb, image/vnd.microsoft.icon, image/vnd.mix, image/vnd.ms-modi, image/vnd.ms-photo, image/vnd.net-fpx, image/vnd.radiance, image/vnd.sealed.png, image/vnd.sealedmedia.softseal.gif, image/vnd.sealedmedia.softseal.jpg, image/vnd.svf, image/vnd.wap.wbmp, image/vnd.xiff, image/vnd.zbrush.pcx, image/x-3ds, image/x-cmu-raster, image/x-cmx, image/x-freehand, image/x-icon, image/x-jng, image/x-mrsid-image, image/x-ms-bmp, image/x-msmetafile, image/x-pcx, image/x-pict, image/x-portable-anymap, image/x-portable-bitmap, image/x-portable-graymap, image/x-portable-pixmap, image/x-rgb, image/x-tga, image/x-xbitmap, image/x-xpixmap, image/x-xwindowdump, image/x.djvu, image/x.djvu+multipage, image/x.emf, image/x.fst, image/x.g3fax, image/x.ico, image/x.icon'} onChange={handleChange} ref={fileRef} type="file" className="hidden"/>
        </div>
        <InputField onChange={(e)=>handleFormDataChange(e, 'name')} placeholder={'Item Name'}>Name</InputField>
        <InputField onChange={(e)=>handleFormDataChange(e, 'externalLink')} desc={'NoCap Network will include a link to this URL on this item\'s detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.'} placeholder={'Item Name'}>External Link</InputField>
        <InputField onChange={(e)=>handleFormDataChange(e, 'desc')} isArea={true} desc={'The description will be included on the item\'s detail page underneath its image. Markdown syntax is supported.'} placeholder={'Provide a detailed description of your item...'}>Description</InputField>
        <div className="mt-[1rem] overflow-visible ">
          <p className={`text-[16px] ${MagnetMedium.className} text-[#000000]`}>Collection</p>
          <p className={`text-[14px] ${MagnetMedium.className} mb-[5px] opacity-50 text-[#000000]`}>Choose the collection that this item will be a part of.</p>
          <DropDownInput value={itemModalData.collectionId ? itemModalData.collectionId:null}  setValue={(e)=>handleFormDataChange(e, 'collectionId', true)} width='w-[100%] mb-[2rem]' options={collections}></DropDownInput>
        </div>

        <Property onOpenClick={()=>setCreateItemModalState(true)} name={'Properties'} desc={'Textual traits that show up as rectangles'} addable imageName={'List'}/>
        <Property onOpenClick={()=>setItemLevelModalOpen(true)} name={'Levels'} desc={'Numerical traits that show as a progress bar'} addable imageName={'Star1'}/>
        <Property onOpenClick={()=>setItemStatsModalOpen(true)} name={'Stats'} desc={'Numerical traits that just show as numbers'} addable imageName={'Chart'}/>
        <Property keyValue={'hasUnlockableContent'} name={'Unlockable Content'} toggle desc={'Include unlockable content that can only be revealed by the owner of the item.'} imageName={'Lock-off'}/>
        <Property keyValue={'hasSensitiveContent'} name={'Explicit & Sensitive Content'} toggle desc={'Set this item as explicit and sensitive content'} imageName={'Warning-round'}/>

        <InputField onChange={(e)=>{
          //take the value and extract only numbers
          e.target.value = e.target.value.replace(/[^0-9]/g, '');
          handleFormDataChange(e, 'supply')
        }} value={
          itemModalData.supply
        } desc={'The number of items that can be minted. No gas cost to you!'} placeholder={'Supply'}>Supply</InputField>
        <div className="mt-[1rem] overflow-visible ">
          <p className={`text-[16px] ${MagnetMedium.className} text-[#000000]`}>Blockchain</p>
          <p className={`text-[14px] ${MagnetMedium.className} mb-[5px] opacity-50 text-[#000000]`}>
            Select your Blockchain
          </p>
          <DropDownInput value={itemModalData.blockchain}  setValue={(e)=>handleFormDataChange(e, 'blockchain', true)} width='w-[100%] mb-[2rem]' options={[
            {
              name: 'Ethereum',
              value: 'ethereum'
            },
            {
              name: 'Polygon',
              value: 'polygon'
            },
            {
              name: 'Binance Smart Chain',
              value: 'bsc'
            },
          ]}></DropDownInput>
        </div>
        <InputField onChange={(e)=>{
          if(e.target.value === '1'|| e.target.value === 1|| e.target.value === true|| e.target.value === '01'){
            setItemModalData({
              ...itemModalData,
              freezeMetadata: true
            })
          }else{
            setItemModalData({
              ...itemModalData,
              freezeMetadata: false
            })
          }
        }} value={
          itemModalData.freezeMetadata ? '1' : '0'
        } desc={'Freezing your metadata will allow you to permanently lock and store all of this item\'s content in decentralized file storage.'} placeholder={'1'}>Freeze Metadata</InputField>

        <button onClick={handleSubmit} className={`mt-[3rem] ${MagnetMedium.className} w-[13rem] h-[40px] rounded-md bg-[#000000] text-[#FFFFFF] text-[16px]`}>Submit Item for Review</button>
      </div>
      <CreateItemModal/>
      <AddLevelsModals/>
      <AddStatsModal/>
    </div>
  )
}

export default CreateItemComponent