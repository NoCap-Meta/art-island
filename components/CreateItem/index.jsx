import { MagnetBold, MagnetMedium, web3 } from "@/pages/_app"
import InputField from "../Common/InputField"
import Toggle from 'react-toggle'
import { Store } from "@/utils"
import { CreateItemModal, DropDownInput, AddLevelsModals, AddStatsModal, CaptchaModal, ItemSubmittedModal } from ".."
import { useContext } from '@/utils/Context';
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { useRouter } from "next/router"


const {useCreateItemStore, useItemModalStore, useItemLevelModalStore, useItemStatsModalStore, useCaptchaModalStore, useItemSubmittedModal} = Store

const Property = ({name, desc, imageName,onChange, toggle, addable, keyValue, onOpenClick,hasUploadable}) => {
  const {itemModalData,setItemModalData} = useItemModalStore()
  const fileRef = useRef(null)

  return (
    <div className="w-[100%] border-b pb-[10px] border-[rgb(0,0,0,0.5)] mt-[1rem] items-center flex justify-between">
          <div className="flex gap-[1rem] items-center">
            <img src={`Images/SVG/${imageName}.svg`} className='w-[20px] h-[20px]'/>
            <div>
              <p className={`text-[16px] ${MagnetBold.className} text-[#000000]`}>{name}</p>
              <p className={`text-[14px] ${MagnetMedium.className} opacity-50 text-[#000000]`}>{desc}</p>
            </div>
          </div>
          <div className='flex gap-[1rem] items-center'>
          {
          hasUploadable && <div onClick={()=>fileRef.current.click()} className="h-[50px] w-[50px] border flex items-center justify-center border-[rgb(0,0,0,0.5)] rounded-md">
            <input hidden type={'file'} onChange={onChange} ref={fileRef} accept={
              'image/*,.pdf,.zip'
            } />
            <img src="Images/SVG/Plus-Black.svg" className="w-[24px] h-[24px]"/>
          </div>
        }
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
        </div>
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
  const {setCaptchaModalOpen} = useCaptchaModalStore()
  const {setItemLevelModalOpen} = useItemLevelModalStore()
  const {setItemStatsModalOpen} = useItemStatsModalStore()
  const {setCreateItemModalState} = useCreateItemStore()
  const {itemSubmittedModalOpen,setItemSubmittedModalOpen} = useItemSubmittedModal()
  const [buttonTitle, setButtonTitle] = useState('Submit Item for Review')
  const fileRef = useRef(null)
  const [collections, setCollections] = useState([{
    name: 'Select Collection',
    value:''
  }])
  const [tokenType, setTokenType] = useState('single')
  const {itemModalData,setItemModalData} = useItemModalStore()
  const [file, setFile] = useState(null)
  const [files, setFiles] = useState([])
  const [previewImage, setPreviewImage] = useState(null)
  const [previewImages, setPreviewImages] = useState([])
  const router = useRouter()
  const [unlockableFiles, setUnlockableFiles] = useState([])

  let isButtonDisabled = itemModalData?.name?.length<1 || itemModalData?.desc?.length<1 || buttonTitle === 'Submitting...' ||file==null || itemModalData?.collectionId?.length<1 || itemModalData?.maxFractions?.length<1 || itemModalData?.fractions?.length<1 || +itemModalData?.pricePerFraction==0 || +itemModalData?.maxFractions < +itemModalData?.fractions || +itemModalData?.royalty==0
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
      await window.ethereum.request({ method: 'eth_requestAccounts' });
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
      setCollections([{
        name: 'Loading your deployed collections...',
        value:''
      }])
      const address = await getAccount()
      const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/collection/collections/me`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })

      if(data.success && data.collection.length<1){
        setCollections([{
          name: 'You have not deployed any collection yet',
          value:''
        }])
        return
      }

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

      return accounts[0]
    }

    

    fetchCollection()
  },[])

  const handleChange = async (e) => {
    const file = e.target.files[0]
    setFile(file)
    setFiles(e.target.files)
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewImage(reader.result)
    }

    
    for (let i = 0; i < e.target.files.length; i++) {
      const filee = e.target.files[i]
      const reader2 = new FileReader()

      reader2.onloadend = () => {
        setPreviewImages((prev) => [...prev, reader2.result])
      }

      reader2.readAsDataURL(filee)
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
      })
      return data.data.Location
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  };

  //handleAllFileUpload
  const handleAllFileUpload = async (files) => {
    if (!localStorage.getItem('token')) {
      setActiveLoginModal({
        ...activeModal,
        google: true
      })
      return
    }

    if(!files) return

    const formData = new FormData()

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i])
    }

    try {
      const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/upload/upload-s3-multiple`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'boundary': '----WebKitFormBoundary7MA4YWxkTrZu0gW'
        }
      })
      console.log('File uploaded successfully!', data.data)
      setItemModalData({
        ...itemModalData,
      })
      return {imageUrl:data.data[0].Location, allImages: data.data.map((image)=>image.Location)}
    } catch (error) {
      console.error('Error uploading file:', error)
    }
  };

  const handleSubmit = async ()=>{
    setButtonTitle('Submitting...')
    const {imageUrl, allImages} = await handleAllFileUpload(files)

    if(itemModalData.hasUnlockableContent && !unlockableFiles && unlockableFiles.length<0){
      setButtonTitle('Submit')
      return
    }

    const {allImages:allUnlockableFiles} = await handleAllFileUpload(unlockableFiles)

    if(!imageUrl) return
    const tokenID = Math.floor(Date.now() * Math.random())
    const {data} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/items/item`, {
      ...itemModalData,
      tokenId: tokenID,
      image: imageUrl,
      allImages: allImages,
      unlockableFiles: allUnlockableFiles,
    }, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })

    if(data.success){
      setButtonTitle('Item Submitted')
      setCaptchaModalOpen(false)
      setItemSubmittedModalOpen(true)
    }


  }

  const handleNumberInput = (e, type, max, min)=>{
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    if(max && +e.target.value>max){
      e.target.value = max
    }
    if(min && +e.target.value<min){
      e.target.value = min
    }
    handleFormDataChange(e, type)
  }
  const handleDecicalInput = (e, type)=>{
    e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    handleFormDataChange(e, type)
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
        }} className="w-[100%] h-[40vh] cursor-pointer border flex gap-[1rem] items-center justify-center border-dotted rounded-lg mt-[10px] border-black">
            {previewImages.length<1 && <img src="Images/SVG/Upload.svg" className="w-[24px] h-[24px]"/>}
            {
              previewImages.length>0 && previewImages.map((image, index)=>{
                return <img src={image} className=" h-[10rem] rounded-md object-cover"/>
              })
            }
            <input multiple={true} accept={'image/png, image/jpeg, image/gif, image/svg+xml, image/webp, image/apng, image/bmp, image/x-icon, image/vnd.mi, image/tiff, image/tiff-fx, image/vnd.adobe.photoshop, image/vnd.dwg, image/vnd.dxf, image/vnd.dgn, image/vnd.djvu, image/vnd.djvu+multipage, image/vnd.dxf, image/vnd.fastbidsheet, image/vnd.fpx, image/vnd.fst, image/vnd.fujixerox.edmics-mmr, image/vnd.fujixerox.edmics-rlc, image/vnd.globalgraphics.pgb, image/vnd.microsoft.icon, image/vnd.mix, image/vnd.ms-modi, image/vnd.ms-photo, image/vnd.net-fpx, image/vnd.radiance, image/vnd.sealed.png, image/vnd.sealedmedia.softseal.gif, image/vnd.sealedmedia.softseal.jpg, image/vnd.svf, image/vnd.wap.wbmp, image/vnd.xiff, image/vnd.zbrush.pcx, image/x-3ds, image/x-cmu-raster, image/x-cmx, image/x-freehand, image/x-icon, image/x-jng, image/x-mrsid-image, image/x-ms-bmp, image/x-msmetafile, image/x-pcx, image/x-pict, image/x-portable-anymap, image/x-portable-bitmap, image/x-portable-graymap, image/x-portable-pixmap, image/x-rgb, image/x-tga, image/x-xbitmap, image/x-xpixmap, image/x-xwindowdump, image/x.djvu, image/x.djvu+multipage, image/x.emf, image/x.fst, image/x.g3fax, image/x.ico, image/x.icon'} onChange={handleChange} ref={fileRef} type="file" className="hidden"/>
        </div>
        <InputField onChange={(e)=>handleFormDataChange(e, 'name')} placeholder={'Item Name'}>Name</InputField>
        <div className="mt-[1rem] overflow-visible ">
          <p className={`text-[16px] ${MagnetMedium.className} text-[#000000]`}>Token Type</p>
          <p className={`text-[14px] ${MagnetMedium.className} mb-[5px] opacity-50 text-[#000000]`}>Will it be a single token or multiple token</p>
          <DropDownInput value={tokenType} onChange={e=>{
            if(e==='single'){
              console.log({
                ...itemModalData,
                maxFractions: '1',
                fractions: '1'
              })
              setItemModalData({
                ...itemModalData,
                maxFractions: 1,
                fractions: 1
              })
              
            }else{
              setItemModalData({
                ...itemModalData,
                maxFractions: '',
                fractions: ''
              })
            }
            setTokenType(e)
          }} width='w-[100%]' options={[
            'single',
            'multiple'
          ]}></DropDownInput>
        </div>
        <div className={`${tokenType==='single' && 'opacity-50'}`}>
          <InputField disabled={tokenType==='single'} value={itemModalData.maxFractions} onChange={(e)=>handleNumberInput(e, 'maxFractions')} desc={'Maximum number of fractions you want to create for the item'} placeholder={'Tokens to Create'}>Maximum Supply</InputField>
          <InputField disabled={tokenType==='single'} value={itemModalData.fractions} onChange={(e)=>handleNumberInput(e, 'fractions')} desc={'Number of fractions out of Max Fractions that can be minted'} placeholder={'Tokens that can be minted'}>Maximum Mintable Tokens</InputField>
        </div>
        <InputField onChange={(e)=>handleDecicalInput(e, 'pricePerFraction')} placeholder={'Price Per Fraction (in Matic)'}>Price per fraction</InputField>
        <InputField onChange={(e)=>handleNumberInput(e, 'royalty', 100, 0)} placeholder={'Royalty'}>Royality you want on the item</InputField>
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
        <Property keyValue={'hasUnlockableContent'} onChange={e=>setUnlockableFiles(e.target.files)} hasUploadable={itemModalData.hasUnlockableContent} name={'Unlockable Content'} toggle desc={'Include unlockable content that can only be revealed by the owner of the item.'} imageName={'Lock-off'}/>
        <Property keyValue={'hasSensitiveContent'} name={'Explicit & Sensitive Content'} toggle desc={'Set this item as explicit and sensitive content'} imageName={'Warning-round'}/>
        <div className="mt-[1rem] overflow-visible ">
          <p className={`text-[16px] ${MagnetMedium.className} text-[#000000]`}>Blockchain</p>
          <p className={`text-[14px] ${MagnetMedium.className} mb-[5px] opacity-50 text-[#000000]`}>
            Select your Blockchain
          </p>
          <DropDownInput value={itemModalData.blockchain}  setValue={(e)=>handleFormDataChange(e, 'blockchain', true)} width='w-[100%] mb-[2rem]' options={[
            {
              name: 'Polygon',
              value: 'polygon'
            },
          ]}></DropDownInput>
        </div>
        
        <button onClick={()=>setCaptchaModalOpen(true)} disabled={
          isButtonDisabled
        } className={`mt-[3rem] ${isButtonDisabled && 'opacity-50'} ${MagnetMedium.className} w-[13rem] h-[40px] rounded-md bg-[#000000] text-[#FFFFFF] text-[16px]`}>{
          buttonTitle
        }
        </button>
      </div>
      <CreateItemModal/>
      <AddLevelsModals/>
      <AddStatsModal/>
      <CaptchaModal onVerify={handleSubmit}/>
      <ItemSubmittedModal image={previewImage}/>
    </div>
  )
}

export default CreateItemComponent