"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import "./style.css";
import ProfileBox from "./ProfileBox";

const FAQCard = ({ index, selectedFaqIndex, clickFun }: { index: number, selectedFaqIndex: null | number, clickFun: (num: number) => void }) => {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current) {
            if (index === selectedFaqIndex) {
                contentRef.current.style.maxHeight = `${contentRef.current.scrollHeight}px`;
            } else {
                contentRef.current.style.maxHeight = '64px';
            }
        }
    }, [index, selectedFaqIndex]);

    return (
        <div 
            className={`w-[100%] max-w-[800px] min-h-[64px] ${selectedFaqIndex === index ? "py-[30px]" : "py-[16px]"} px-[30px] mt-[20px] ${selectedFaqIndex === index ? "bg-[#D8EFD3]" : "bg-transparent"} flex justify-between items-start rounded-[8px] border border-darkCyan cursor-pointer cardContentProfile opacity-60 ${selectedFaqIndex === index ? "expanded" : ""}`}
            onClick={() => clickFun(index)}
            ref={contentRef}
        >
            <div className="w-[100%] max-w-[682px]">
                <div className={`text-[18px] font-semibold`}>
                    Settings
                </div>
                <div 
                    className={`text-[16px] mt-[6px] text-[#737373] overflow-hidden ${selectedFaqIndex === index ? "block" : "hidden"}`}
                >
                    Who are you Pal ?

                    
                </div>
                <ProfileBox />
            </div>
            <div className="h-[32px] w-[32px]">
                <Image src="/images/about/records/arrow.svg" alt="arrow" width={32} height={32} className={`arrow ${selectedFaqIndex === index ? "rotated" : ""}`} />
            </div>
        </div>
    );
};

const ProfileSettings = (): JSX.Element => {
    const [selectedFaqIndex, setSelectedFaqItem] = useState<null | number>(null);

    const clickFun = (num: number) => {
        setSelectedFaqItem(prevIndex => prevIndex === num ? null : num);
    };

    const TransactionData = Array.from({ length: 1 }).map((_, i) => (
        <FAQCard key={i} selectedFaqIndex={selectedFaqIndex} index={i} clickFun={clickFun} />
    ));

    return (
        <div className="faq-card-container w-[80%] mt-0 ml-16">
            {TransactionData}
        </div>
    );
};

export default ProfileSettings;
