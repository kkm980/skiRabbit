import Link from "next/link";
import { ThemeSetter } from "../themeSetter";
import WalletConnector from "../walletConnector";

const NavBar = () => {
    return (
        <div className="bg-white dark:bg-black flex justify-between items-center h-[66px] w-[550px] rounded-[25px] sticky top-[10px] shadow-xl shadow-[#CAF4FF] dark:shadow-[#344C64] z-[999]">
          <ThemeSetter/>
          <a className='' href="/">Home</a>
          <WalletConnector />
        </div>
    )
}

export default NavBar;