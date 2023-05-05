import { MagnetRegular } from 'pages/_app';

export const TableRow = ({ item, idx }) => {
    return (
        <div className='flex gap-[1rem] mt-[1rem] items-center w-[40vw]'>
            <div className='w-[5vw]'>
                <p className={`${MagnetRegular.className} text-[#000000] text-[16px]`}>{idx + 1}</p>
            </div>
            <div className='w-[20vw] flex gap-[5px] items-center'>
                <img src={item.image} className='w-[55px] rounded-md h-[55px]' />
                <p className={`${MagnetRegular.className} text-[#000000] text-[16px]`}>
                    {item.name}
                </p>
            </div>
            <p className={`${MagnetRegular.className} text-[#000000] text-[16px] w-[10vw]`}>{item.pricePerFraction} ETH</p>
            <p className={`${MagnetRegular.className} text-[#000000] text-[16px] w-[5vw]`}>{item.maxFractions}</p>
        </div>
    );
};
