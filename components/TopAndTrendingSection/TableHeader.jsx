import { MagnetRegular } from 'pages/_app';

export const TableHeader = () => {
    return (
        <div className='flex gap-[1rem] w-[40vw]'>
            <div className='w-[5vw]' />
            <p className={`${MagnetRegular.className} text-[#000000] opacity-50 w-[20vw] text-[16px]`}>ITEM</p>
            <p className={`${MagnetRegular.className} text-[#000000] opacity-50 w-[10vw] text-[16px]`}>FLOOR PRICE</p>
            <p className={`${MagnetRegular.className} text-[#000000] opacity-50 w-[5vw] text-[16px]`}>VOLUME</p>
        </div>
    );
};
