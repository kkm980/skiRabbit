"use client"

import { Progress } from "@/components/ui/progress";
import React, { useContext, useEffect, useState } from "react";
import RemoveBtn from "./RemoveBtn";
import "./style.css";
import AboutNftCard from "./abouyNftCard";
import Checkbox from "./checkbox";
import { TransferPopOver } from "./transferPopover";
import { BurnPopover } from "./burnPopover";
import { Web3Context } from "@/context/Web3Context";
import { burnTokens, transferTokens } from "@/utils/contractFunction";
import { useToast } from "@/components/ui/use-toast";

const NFTContainer = () => {
    const { toast } = useToast();
    const [selectedNum, setSelectedNum] = React.useState<any>([]);
    const [progress, setProgress] = React.useState(0);
    const [guestAddress, setGuestAddress] = useState<string>("");
    const { transactions, setNFTData, ownedNft, addTransactions } = useContext(Web3Context);


    const localBurnFunction = async () => {
        if(selectedNum.length===0) {
            return;
        }

        // CHECK_POINT_API->BURN_RESP
        const response: any =  await burnTokens(selectedNum);
        if(response.success) {
            setNFTData(ownedNft.filter((el: number) => !selectedNum?.has(el)));
            addTransactions([...transactions, {type:"burn", nftArr:selectedNum}]);
            toast({
                variant: "success",
                title: `You have successfully burnt ${selectedNum?.length} NFTs`,
                description: "Go to home page to mint more NFTs",
              })
              setSelectedNum([]);
        }
        else {
            toast({
                variant: "destructive",
                title: `Sorry, it did not work`,
                description: "Please check your connections, owned NFTs and try again(not giving up is the key!)",
              })
        }
    }

    const localTransferFun = async () => {
        if(selectedNum.length===0||guestAddress.length===0) {
            toast({
                variant: "destructive",
                title: `please choose the NFTs and the wallet address to transfer`,
                // description: "Go to home page to mint more NFTs",
              })
        }

        // CHECK_POINT_API->TRANSFER_RESP
        const response: any =  await transferTokens(guestAddress, selectedNum);
        if(response.success) {
            setNFTData(ownedNft.filter((el: number) => !selectedNum?.has(el)));
            addTransactions([...transactions, {type:"transfer", nftArr:selectedNum}]);
            toast({
                variant: "success",
                title: `You have successfully transferred ${selectedNum?.length} NFTs`,
                description: "Go to home page to mint more NFTs",
              })
              setSelectedNum([]);
        }
        else {
            toast({
                variant: "destructive",
                title: `Sorry, it did not work`,
                description: "Please check your connections, owned NFTs and try again(not giving up is the key!)",
              })
        }
    }

    const myArray = Array.from({ length: 50 }, (_, index) => `Item ${index + 1}`);

    React.useEffect(() => {
        const timer = setTimeout(() => setProgress(selectedNum?.length * 25), 500)
        return () => clearTimeout(timer);
    }, [selectedNum]);



    return (
        <div className="w-[100%] max-w-[800px] mt-[40px] bg-[#D8EFD3] rounded-[16px] p-4 z-0">
            <div className="max-w-[800px] flex justify-between items-center">
                <div className="w-[80%] h-16 flex justify-start items-center">
                    <Progress value={progress} className="w-[35%]" />
                    {selectedNum?.length>0 && <TransferPopOver localTransferFun={localTransferFun} guestAddress={guestAddress} setGuestAddress={setGuestAddress}/>}
                    {selectedNum?.length>0 && <BurnPopover localBurnFunction={localBurnFunction}/>}
                    
                </div>
                {
                    selectedNum?.length>0 && <RemoveBtn onClickFun={()=>{setSelectedNum([])}}/>
                }
                
            </div>
            <div className="flex justify-between items-start flex-wrap mt-4 w-[100%] z-0">
                {myArray.map((item, index) => (
                    <div key={index+1} className="CardCollectorItem shadow-2xl relative">
                        <Checkbox checkNum={index+1} setSelectedNum={setSelectedNum} selectedNum={selectedNum}/>
                        <AboutNftCard tokenId={index + 1} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default NFTContainer;