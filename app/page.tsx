import Image from "next/image";
import { BackgroundBeams } from "@/components/ui/backgroundBeams";
import NavBar from "@/components/navBar";
import { CardStackDemo } from "@/components/cards";
import AccountCard from "@/components/accountCard";
import NFTCard from "@/components/nftCard";
import MintButton from "@/components/home/mintButton";
import InfoBtn from "@/components/home/infoButton";
import { Toaster } from "@/components/ui/toaster";

export default function Home() {
  const myArray = Array.from({ length: 50 }, (_, index) => `Item ${index + 1}`);
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <Toaster />
      <div className="fixed top-2 left-2 z-[999]">
        <Image src="/images/myLogo.png" alt="logo" width={100} height={100} />
      </div>
      <NavBar />
      <BackgroundBeams />
      <div className="relative h-80 w-auto mt-[100px] px-8 flex justify-between items-center overflow-hidden">
        <AccountCard />
        <CardStackDemo />
      </div>
      <div className="w-[1100px] overflow-x-hidden">
        <div className="flex justify-between items-center">
          <div>
            <MintButton/>
            <span className="text-xs mt-1 mt-2">*Click on number to adjust number<strong>(max 4) </strong>and click on "Mint now" to mint nft</span>
          </div>

          <div>
            <InfoBtn/>
           </div>
          
        </div>
        <div className="w-[100%] flex justify-start items-start flex-wrap">
        {myArray.map((item, index) => (
          <div key={index} className="item">
            <NFTCard tokenId={index + 1} />
          </div>
        ))}
        </div>
      </div>
    </main>
  );
}
