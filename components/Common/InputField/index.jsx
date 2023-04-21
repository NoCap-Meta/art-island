import { MagnetMedium, MagnetRegular } from '@/pages/_app'

const InputField = ({placeholder,value, children, type, isArea, width, preIcon, disabledDiv, desc, onChange=()=>{}}) => {
  return (
    <div className='mt-[1rem] relative'>
      {preIcon && <div className='absolute left-[0.8rem] bottom-[0.8rem]'>{preIcon}</div>}
      <p className={`text-[#000000] text-[16px] ${MagnetMedium.className}`}>{children}</p>
      {desc &&  <p className={`text-[15px] ${MagnetMedium.className} opacity-50 text-[#000000]`}>{desc}</p>}
      {disabledDiv && <div className={`${width?width:'w-[100%]'} ${MagnetRegular.className} flex items-center relative h-[40px] mt-[5px]  rounded-md border-[1px] border-[#000] text-[#000000] text-[14px] focus:outline-none focus:border-none`}>
        <p className='opacity-50 text-[14px] ml-[1rem]'>{placeholder}</p>
        <img src='Images/SVG/Copy.svg' onClick={()=>{
          navigator.clipboard.writeText(placeholder)
        }}  className='absolute cursor-pointer right-[0.8rem] bottom-[0.5rem]'/>
      </div>}
      {!isArea && !disabledDiv && <input value={value} onChange={(e)=>{onChange(e)}} autoComplete="new-password" className={`${width?width:'w-[100%]'} ${MagnetRegular.className} h-[40px] mt-[5px]  rounded-md bg-[rgb(255,255,255,0.5)] ${preIcon ? 'pl-[3rem] pr-[1rem]':'px-[1rem]'} text-[#000000] text-[14px] focus:outline-none focus:border-none`} type={type||'text'} placeholder={placeholder}/>}
      {isArea && !disabledDiv && <textarea value={value} onChange={(e)=>{onChange(e)}} autoComplete="new-password" className={`${width?width:'w-[100%]'} ${MagnetRegular.className} h-[100px] mt-[5px] pt-[10px]  rounded-md bg-[rgb(255,255,255,0.5)] ${preIcon ? 'pl-[3rem] pr-[1rem]':'px-[1rem]'} text-[#000000] text-[14px] focus:outline-none focus:border-none`} type={type||'text'} placeholder={placeholder}/>}
    </div>
  )
}

export default InputField