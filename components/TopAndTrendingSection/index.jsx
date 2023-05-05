import { MagnetLight } from 'pages/_app';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

export function TopAndTrendingSection() {
    const [selectedTab, setSeletctedTab] = useState("Trending");
    const [deployedItems, setDeployedItems] = useState([]);
    const [showingItems, setShowingItems] = useState([]);
    const [selectedNavigation, setSelectedNavigation] = useState('');
    const [options, setOptions] = useState([
        {
            name: "Trending",
            selected: true,
        },
        {
            name: "Top",
            selected: false,
        },
    ]);
    const [navigations, setNavigations] = useState([]);

    useEffect(() => {
        if (deployedItems.length > 0) {
            const newShowingItems = deployedItems.filter((item) => {
                if (selectedNavigation === '') {
                    return true;
                } else {
                    return item.category === selectedNavigation;
                }
            });
            setShowingItems(newShowingItems);
        }
    }, [deployedItems, selectedNavigation]);

    useEffect(() => {
        const getCategoies = async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category`);
            const categories = data.categories;
            let newNavigations = categories.map((category) => {
                return {
                    name: category.name,
                    isActive: false,
                    value: category.value,
                    isHided: category.isHided
                };
            });
            newNavigations = [
                {
                    name: 'All',
                    isActive: true,
                    value: '',
                    isHided: false
                },
                ...newNavigations
            ];

            setNavigations(newNavigations);
        };


        getCategoies();
    }, []);

    const handleSelectTab = (name) => {
        const newOptions = options.map((option) => {
            if (option.name === name) {
                return {
                    ...option,
                    selected: true
                };
            } else {
                return {
                    ...option,
                    selected: false
                };
            }
        });
        setSeletctedTab(name);
        setOptions(newOptions);
    };

    const getItems = async () => {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/items/deployed`);
        setDeployedItems(data.items);
    };

    useEffect(() => {
        getItems();
    }, []);


    return (
        <div className=" bg-[#f5dfc2] w-[100vw] pb-[125px] flex justify-center">
            <div className='w-[95vw]'>
                <div className="flex items-end mt-[32px] w-[90vw] ">
                    <div className="flex flex-wrap items-end justify-center xl:flex-nowrap">
                        {options.map((option, index) => {
                            return (
                                <>
                                    <div key={option.name} onClick={() => handleSelectTab(option.name)} className="flex xl:mt-[0] mt-[1rem] cursor-pointer">
                                        <div>
                                            <p className={`${MagnetLight.className} whitespace-nowrap text-[20px] leading-[25px] ${option.selected ? "" : "opacity-50"}`}>{option.name}</p>
                                            <div className={`w-full ${option.selected ? "" : "opacity-20"} h-[2px] mt-[15px] bg-black`} />
                                        </div>
                                    </div>
                                    {index !== options.length - 1 && <div className={`w-[40px] h-[2px] opacity-20 mt-[5px] bg-black`} />}
                                </>
                            );
                        })}
                    </div>
                    <div className="w-[80vw]">
                        <div className={`w-full h-[2px] opacity-20 bg-black`} />
                    </div>
                </div>
                <div className='flex w-[90vw] mt-[2rem] gap-[5rem]'>
                    <div>
                        <TableHeader />
                        {deployedItems.map((item, index) => {
                            if (index < 4) {
                                return <TableRow key={item._id} idx={index} item={item} />;
                            }
                        }
                        )}
                    </div>
                    {deployedItems.length > 4 && <div>
                        <TableHeader />
                        {deployedItems.map((item, index) => {
                            if (index >= 4 && index < 8) {
                                return <TableRow idx={index} key={item.id} item={item} />;
                            }
                        }
                        )}
                    </div>}
                </div>
            </div>
        </div>);
}
