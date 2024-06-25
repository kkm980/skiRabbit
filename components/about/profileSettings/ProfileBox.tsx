"use client"

import { Web3Context } from "@/context/Web3Context";
import profileConfig from "./profileConstant"
import "./style.css";
import { useContext, useEffect, useState } from "react";
const ProfileBox = () => {
    const [mounted, setMounted] = useState(false);
    const { account, balance, connectWallet, setUserProfile } = useContext(Web3Context);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null; // Avoid hydration mismatch by not rendering on the server
    }
    return (
        <div className="flex justify-between items-center flex-wrap m-2 mt-[20px]">
            {profileConfig?.map((el: any, index: number) => (
                <div className="m-2 hover:scale-[1.1] transition-transform duration-[1200ms]"
                onClick={(e) => {
                    e.stopPropagation();
                    setUserProfile(el.img, el.name);
                    // dispatch(setProfileType({ profilePicture:el.img, profileCategory:el.name }))
                }}
                >
                    <div className="cardProfile">
                        <div className="bg">
                            <div className="ml-1 mb-4 mt-2 text-black">
                                {el.name}
                            </div>
                            <div
                                className="imgContainer bg-contain bg-no-repeat w-[85%] h-[300px] z-[999]"
                                style={{ backgroundImage: `url(${el.img})` }}
                            >
                            </div>
                        </div>
                        <div className="blob"></div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProfileBox;