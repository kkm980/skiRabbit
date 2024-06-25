import { useContext } from "react";
import "./style.css";
import { Web3Context } from "@/context/Web3Context";
import Image from "next/image";
const TransactionRecords = () => {
    const { transactions } = useContext(Web3Context);
    const transactionArr = [
        {
            to: "0x1ef453dhk6exhk8765g98765jkg6fk875d0",
            transaction: "0x1ef453dhk6exhk8765g98765jkg6fk875d0",
            type: "transfer",
            burnt: "4 wei",
            tokens: 4
        },
        {
            transaction: "0x1ef453dhk6exhk8765g98765jkg6fk875d0",
            type: "mint",
            burnt: "4 wei",
            tokens: 4
        },
        {
            transaction: "0x1ef453dhk6exhk8765g98765jkg6fk875d0",
            type: "mint",
            burnt: "2 wei",
            tokens: 2
        },
        {
            to: "0x1ef453dhk6exhk8765g98765jkg6fk875d0",
            transaction: "0x1ef453dhk6exhk8765g98765jkg6fk875d0",
            type: "transfer",
            burnt: "3 wei",
            tokens: 3
        },
        {
            to: "0x1ef453dhk6exhk8765g98765jkg6fk875d0",
            transaction: "0x1ef453dhk6exhk8765g98765jkg6fk875d0",
            type: "transfer",
            burnt: "1 wei",
            tokens: 1
        }
    ]
    return (
        <div className="mt-[32px]">
            {transactions.length===0 && <>
                <span>Nothing to show,</span> <a href="/" className="font-bold text-md text-[blue] mr-1">mint</a><span>NFTs now!</span>
            </>}
            {transactions?.map((el:any, index: number) => (
                <div key={index} className="relative border-2 border-primary rounded-[8px] p-4 mb-4 max-w-[550px] h-[150px] cursor-default transactionCard"
                onClick={(e) => e.stopPropagation()}
                >
                    <div className="mb-4">
                    <a className="decoratedText" href={`https://sepolia.etherscan.io/tx/${el.transaction}`} target="_blank">{el.transaction.split("").slice(0, 7)}....{el.transaction.split("").slice(-7)}</a>
                    </div>

                    <div className="flex justify-between items-start">
                        <span>
                            {el?.type==="mint"?"Minted":"Transferred"} {el.tokens} Tokens
                        </span>

                        {
                            el.to ? <span>
                                <span className="mr-4">To</span>{" "} {el.to.split("").slice(0, 7)}....{el.transaction.split("").slice(-7)}
                            </span> : null
                        }
                        
                    </div>

                    <div className="flex justify-start items-start">

                        <span>
                            Burnt {el.burnt}
                        </span>
                        
                    </div>
                </div>
            ))}
        </div>
    )
}

export default TransactionRecords;