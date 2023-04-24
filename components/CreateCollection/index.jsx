import { MagnetBold, MagnetMedium } from "@/pages/_app"
import InputField from "../Common/InputField"
import Toggle from 'react-toggle'
import { Store } from "@/utils"
import { CreateItemModal, DropDownInput } from ".."
import { useRef, useState } from "react"
import { web3,ethersProvider } from "@/pages/_app"
const {useCreateItemStore} = Store
import axios from 'axios'
import { NoCapVoucher } from "@/utils/Extras/NoCapVoucher"

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

const CreateCollectionComponent = () => {
  const [value, setValue] = useState('')
  const [file, setFile] = useState(null)
  const fileRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    symbol: '',
    royality: '',
    category: '',
  })

  const handleSubmit = async () => {
    //check if account is there
    const accounts = await web3.eth.getAccounts()
    if(!accounts || accounts.length === 0){
      return
    }
    const account = accounts[0]
    //getContract instance
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items/get-contract-instance`, {
      //headers
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    let contract = null

    if(data.success){
      contract = data.noCapFactoryContract
    }

    const signer = await ethersProvider.getSigner()

    const newVoucher = new NoCapVoucher({
      _contract: contract,
      _signer: signer
    })

    const voucher = await newVoucher.createVoucher( account, '0xf57c398ca6eb1831e03806728008127904a7b95d', 1, 4, 1, 1000000, true, account, 200, 'https://google.com' )

    const {data:verifyData} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/items/verify-voucher`, {
      voucher
      }, {
      //headers
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
      })

    const {data:buyData} = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/items/buy-nft`, {
      value: '0.00000000000102',
      voucher,
      isPrimary:true,
      currency:'0x0000000000000000000000000000000000000001'
    },{
      headers:{
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })

    if(buyData.success){
      const {txObject} = buyData
      txObject.value = `${txObject.value}`
      console.log(txObject)

      const signed = await await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [txObject],
      });

    }

  }

  return (
    <div className='w-[70%] mt-[3rem] overflow-visible'>
      <p className={`text-[40px] ${MagnetBold.className} h-[3rem] leading-[41px] text-[#000000]`}>Create Collection</p>

      <div className="mt-[3rem] overflow-visible">
        <div>
          <p className={`text-[18px] ${MagnetBold.className} text-[#000000]`}>Logo image</p>
          <p className={`text-[16px] ${MagnetMedium.className} opacity-50 text-[#000000]`}>File types supported: JPG, PNG, GIF, SVG. Max size: 100 MB</p>
        </div>
        <div onClick={()=>{
          fileRef.current.click()
        }} className="w-[100%] h-[40vh] cursor-pointer border flex items-center justify-center border-dotted rounded-lg mt-[10px] border-black">
            <img src="Images/SVG/Upload.svg" className="w-[24px] h-[24px]"/>
            <input onChange={()=>{
              setFile(fileRef.current.files[0])
            }} ref={fileRef} type={'file'} className="hidden"/>
        </div>
        <InputField value={formData.name} onChange={(e)=>{
          setFormData({
            ...formData,
            name: e.target.value
          })
        }} placeholder={'My Collection Name'}>Name</InputField>
        <InputField value={formData.symbol} onChange={(e)=>{
          setFormData({
            ...formData,
            symbol: e.target.value
          })
        }} desc={`The token symbol is shown on the block explorer when others view your smart contract.`} placeholder={'NCM'}>Token symbol</InputField>
        <InputField value={formData.royality} onChange={(e)=>{
          setFormData({
            ...formData,
            royality: e.target.value
          })
        }} placeholder={'How much royality you want'}>Royality</InputField>
        <div className="mt-[2rem] overflow-visible">
          <DropDownInput width={'w-[100%]'} setValue={(value)=>{
            setFormData({
              ...formData,
              category: value
            })
          }} options={[{
            name: 'Yato',
            value: '0x66D9512e6Cf45ba95586a8E7E1544Cef71521f08'
          },
          {
            name: 'Saitama',
            value: '0xDeDDbF4a30C99Cb20E85806873ba603E6bA376CD'
          },
          {
            name: 'Goku',
            value: '0xF35871678B04E56a17531D92589BD62863CcF5FA'
          },
          {
            name: 'Vegeta',
            value: '0x06662846f8a08f74402A2d9e17A0b1aBCcE7A504',
          },
          ]}>Category</DropDownInput>
        </div>
        <button onClick={handleSubmit} className={`mt-[3rem] ${MagnetMedium.className} w-[13rem] h-[40px] rounded-md bg-[#000000] text-[#FFFFFF] text-[16px]`}>Submit for Review</button>
      </div>
      <CreateItemModal/>
    </div>
  )
}

export default CreateCollectionComponent