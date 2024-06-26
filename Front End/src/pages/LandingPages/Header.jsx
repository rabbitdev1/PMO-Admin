import React, { useState, useEffect } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import {
    Button,
    Popover,
    PopoverContent,
    PopoverHandler
} from "@material-tailwind/react";
import { ReactComponent as Ic_dark_mode } from "../../assets/icon/ic_dark-mode.svg";
import { ReactComponent as Ic_light_mode } from "../../assets/icon/ic_light-mode.svg";
import DynamicButton from '../../components/common/DynamicButton';

const Header = ({ isDarkMode, toggleTheme, navigate, authToken, authApiKey }) => {
    const [headerClass, setHeaderClass] = useState('');

    const handleScroll = () => {
        if (window.scrollY >= 500) {
            console.log("asdad");
            setHeaderClass('-mt-16 fixed top-0 left-0 right-0 z-10');
        } else {
            setHeaderClass('-mt-0 fixed top-0 left-0 right-0 z-10');
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`flex flex-col transition-all duration-300 ${headerClass} `}>
            <div className="flex flex-col bg-lightColor dark:bg-darkColor">
                <div className="lg:container lg:mx-auto xl:max-w-screen-xl w-full flex border-b-[1px] border-[#dddddd] dark:border-[#ffffff20] flex-row gap-3 justify-between items-center p-3 py-2">
                    <div>
                        <LazyLoadImage
                            className="h-10 w-32 flex object-contain"
                            alt="logo"
                            src={require("../../assets/image/logo/light.png")}
                            effect="blur"
                        />
                    </div>
                    <div className="flex flex-row gap-3 items-center">
                        <DynamicButton
                            type="no-padding"
                            color={isDarkMode ? "#ffffff" : "#0185FF"}
                            iconLeft={isDarkMode ? <Ic_light_mode className={`h-5 w-5 aspect-square`} /> : <Ic_dark_mode className={`h-5 w-5 aspect-square`} />}
                            className="inline-flex"
                            onClick={toggleTheme}
                        />
                        {(authToken && authApiKey) ? (
                            <DynamicButton
                                initialValue={'Dashboard'}
                                color={"#ffffff"}
                                type="transparent"
                                className="bg-[#0185FF] text-[#ffffff] px-3"
                                onClick={() => 
                                    window.location.replace("/dashboard")}
                            />
                        ) : (
                            <DynamicButton
                                initialValue={'Masuk'}
                                color={"#ffffff"}
                                type="transparent"
                                className="bg-[#0185FF] text-[#ffffff] px-3"
                                onClick={() => navigate('/login')}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-col bg-lightColor dark:bg-darkColor">
                <div className="flex flex-row lg:container lg:mx-auto xl:max-w-screen-xl gap-2 py-2">
                    {[
                        { label: 'BERANDA' },
                        { label: 'PUSAT PENGADUAN' },
                        { label: 'BANTUAN' },
                    ].map((button, index) => (
                        <Popover
                            key={index}
                            animate={{
                                mount: { scale: 1, y: 0 },
                                unmount: { scale: 0, y: 25 },
                            }}
                            placement="bottom-end"
                        >
                            <PopoverHandler>
                                <Button className="py-0">
                                    <DynamicButton
                                        initialValue={button.label}
                                        color={isDarkMode ? "#ffffff" : "#0185FF"}
                                        type="transparent"
                                        className="bg-lightColor dark:bg-darkColor text-lightColor dark:text-darkColor rounded-none px-3"
                                    />
                                </Button>
                            </PopoverHandler>
                            <PopoverContent className="flex flex-col w-72 font-gilroy p-3 shadow-none bg-lightColor text-lightColor dark:text-darkColor dark:bg-cardDark border-[1px] border-[#dddddd] dark:border-[#ffffff20] z-10">
                                {button.label}
                            </PopoverContent>
                        </Popover>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Header;
