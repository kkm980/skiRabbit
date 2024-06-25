"use client"
import { useContext, useEffect, useState } from "react";
import "./style.css";
import { useToast } from "@/components/ui/use-toast"
import { Web3Context } from "@/context/Web3Context";
import { batchMintFun } from "@/utils/contractFunction";

const MintBtn = () => {
    const [mounted, setMounted] = useState(false);
    const { account, balance, connectWallet, setUserProfile, setNFTData, addTransactions, transactions } = useContext(Web3Context);
    const { toast } = useToast();
    const [count, setCount] = useState<number>(0);
    useEffect(() => {
      setMounted(true);
  }, []);

  if (!mounted) {
      return null; // Avoid hydration mismatch by not rendering on the server
  }

  return (
    <div className="group button flex justify-start relative pl-4">
      <div className="mr-4 w-[18px] invisible group-hover:visible" onClick={() => {
        setCount((prev) => {
          return prev === 4 ? 1 : prev + 1
        })
      }}>
        {count}
      </div>
      <button onClick={async () => {
        if(count<1||count>4) {
          toast({
          variant: "destructive",
          title: "Uh oh! Count must be from 1 to 4",
          description: "There was a problem with your request.",
        })
        return;
        }
        const result = await batchMintFun(count);
        // CHECK_POINT_API->MINT_RESP
        if(result?.success){
          setNFTData(result?.receipt?.nftArr);
          addTransactions([...transactions, {type:"mint", nftArr:result?.receipt?.nftArr}]);
          toast({
            variant: "success",
            title: `Successfully minted ${result?.receipt?.nftArr?.length} NFTs`,
            description: "Go to your profile to view, transfer or burn the minted NFTs.",
          });
          setCount(0);
        }
        else{
          toast({
            variant: "destructive",
            title: `Oh! Something went wrong`,
            description: "Please check your wallet and internet connection, try minting in correct way next time.",
          })
        }
      }}
      >
        Mint now!
      </button>

    </div>
  )
}

export default MintBtn;
