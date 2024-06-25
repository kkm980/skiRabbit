import Image from "next/image";
import "./style.css"

const NFTCard = ({tokenId}:{tokenId: number}) => {
    return (
        <div className="parent group my-4 m-3">
            <div className={`card h-full rounded-3xl flex justify-center items-center dark:bg-gradient-to-br dark:from-gray-900 dark:to-[#374151] bg-gradient-to-br from-cyan-400 to-[#06b6d4] transition-all duration-500 ease-in-out`}>
                <div className="logo">
                    {/* <span className="circle circle1"></span>
                    <span className="circle circle2"></span> */}
                    <span className="circle circle3"></span>
                    <span className="circle circle4"></span>
                    <span className={`circle circle5 relative dark:bg-[#94a3b8] opacity-25`}>
                        <Image src="/images/home/nftCard/skiRabbit.png" alt="skiRabbit" width={24} height={24} />
                        <button className={`social-button .social-button3 absolute rounded-full w-[25px] bg-transparent top-4 -right-2`}>
                            <Image src="/images/home/nftCard/tick.gif" alt="add" width={32} height={32} />
                        </button>
                    </span>
                </div>

                <div className={`glass dark:bg-gradient-to-br dark:from-[#475569] dark:to-[#1e293b] bg-gradient-to-br from-[#bbf7d0] to-[#67e8f9] opacity-85 hidden group-hover:block`}>
                </div>
                <div
                    className="imgContainer bg-contain bg-no-repeat w-[85%] h-[300px] z-[999]"
                    style={{ backgroundImage: `url('https://plum-sophisticated-turkey-938.mypinata.cloud/ipfs/QmQ8zHxHU94hy98AdA1PJM5JtC8UTE8EhPUCaX1wxPKGJ6/${tokenId}.png')` }}
                >
                </div>

                <div className={`content hidden group-hover:block`}>
                    <div className="mb-16">
                        <span className={`title dark:text-[#a8a29e] text-[#059669]`}>UIVERSE (3D UI)</span>
                        <div className="view-more">
                            <button className="view-more-button">View more</button>
                        </div>
                    </div>
                    <span className={`text dark:text-[#a8a29e] text-[#059669]`}>Create, share, and use beautiful custom elements made with CSS</span>
                </div>
                <div className="bottom">

                    <div className={`social-buttons-container p-1 rounded-full dark:bg-black bg-white`}>
                        <button className={`social-button .social-button1`}>
                            <Image src="/images/home/nftCard/add.gif" alt="add" width={32} height={32} />
                        </button>
                        <button className={`social-button .social-button2`}>
                            <Image src="/images/home/nftCard/minus.gif" alt="add" width={32} height={32} />
                        </button>
                        <button className={`social-button .social-button3`}>
                            <Image src="/images/home/nftCard/transfer.gif" alt="add" width={32} height={32} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NFTCard;