import { BackgroundBeams } from "@/components/ui/backgroundBeams";
import NavBar from "@/components/navBar";
import Records from "@/components/about/records";
import ProfileSettings from "@/components/about/profileSettings";
import NFTContainer from "@/components/about/nftContainer";
import Image from "next/image";

export default function About() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <div className="fixed top-2 left-2 z-[999]">
        <Image src="/images/myLogo.png" alt="logo" width={100} height={100} />
      </div>
      <NavBar />
      <BackgroundBeams />
      <Records />
      <ProfileSettings />
      <NFTContainer />
    </main>
  );
}
