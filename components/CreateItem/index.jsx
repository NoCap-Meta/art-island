import { MagnetBold, MagnetMedium } from "@/pages/_app"
import InputField from "../Common/InputField"
import Toggle from 'react-toggle'
import { Store } from "@/utils"
import { CreateItemModal } from ".."
import { useContext } from '@/utils/Context';
import { useEffect } from "react"

const {useCreateItemStore} = Store

const Property = ({name, desc, imageName, toggle, addable}) => {
  const {setCreateItemModalState} = useCreateItemStore()
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
        defaultChecked={true}
        className='toggle-button'
        icons={{
          checked: null,
          unchecked: null,
        }}
        />}
        {
          addable && <div onClick={()=>setCreateItemModalState(true)} className="h-[50px] w-[50px] border flex items-center justify-center border-[rgb(0,0,0,0.5)] rounded-md">
            <img src="Images/SVG/Plus-Black.svg" className="w-[24px] h-[24px]"/>
          </div>
        }
        </div>
  )
}

const CreateItemComponent = () => {
  const {  setActiveModal:setActiveLoginModal,activeModal } = useContext()

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

  return (
    <div className='w-[70%] mt-[3rem]'>
      <p className={`text-[40px] ${MagnetBold.className} h-[3rem] leading-[41px] text-[#000000]`}>Create New Item</p>

      <div className="mt-[3rem]">
        <div>
          <p className={`text-[18px] ${MagnetBold.className} text-[#000000]`}>Upload Image, Video, Audio or 3D Model</p>
          <p className={`text-[16px] ${MagnetMedium.className} opacity-50 text-[#000000]`}>File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max size: 100 MB</p>
        </div>
        <div className="w-[100%] h-[40vh] border flex items-center justify-center border-dotted rounded-lg mt-[10px] border-black">
            <img src="Images/SVG/Upload.svg" className="w-[24px] h-[24px]"/>
        </div>
        <InputField placeholder={'Item Name'}>Name</InputField>
        <InputField desc={'NoCap Network will include a link to this URL on this item\'s detail page, so that users can click to learn more about it. You are welcome to link to your own webpage with more details.'} placeholder={'Item Name'}>External Link</InputField>
        <InputField isArea={true} desc={'The description will be included on the item\'s detail page underneath its image. Markdown syntax is supported.'} placeholder={'Provide a detailed description of your item...'}>Description</InputField>
        <InputField desc={'This is the collection where your item will appear'} placeholder={'Select Collection'}>Collection</InputField>

        
        <Property name={'Properties'} desc={'Textual traits that show up as rectangles'} addable imageName={'List'}/>
        <Property name={'Levels'} desc={'Numerical traits that show as a progress bar'} addable imageName={'Star1'}/>
        <Property name={'Stats'} desc={'Numerical traits that just show as numbers'} addable imageName={'Chart'}/>
        <Property name={'Unlockable Content'} toggle desc={'Include unlockable content that can only be revealed by the owner of the item.'} imageName={'Lock-off'}/>
        <Property name={'Explicit & Sensitive Content'} toggle desc={'Set this item as explicit and sensitive content'} imageName={'Warning-round'}/>

        <InputField desc={'The number of items that can be minted. No gas cost to you!'} placeholder={'Supply'}>Supply</InputField>
        <InputField  placeholder={'Ethereum'}>Blockchain</InputField>
        <InputField desc={'Freezing your metadata will allow you to permanently lock and store all of this item\'s content in decentralized file storage.'} placeholder={'1'}>Freeze Metadata</InputField>
 
        <button className={`mt-[3rem] ${MagnetMedium.className} w-[13rem] h-[40px] rounded-md bg-[#000000] text-[#FFFFFF] text-[16px]`}>Create Item</button>
      </div>
      <CreateItemModal/>
    </div>
  )
}

export default CreateItemComponent