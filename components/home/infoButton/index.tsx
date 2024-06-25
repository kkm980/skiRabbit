"use client"
import { useContext, useEffect, useState } from "react";
import "./style.css";
import { totalSupplyFun, userHas } from "@/utils/contractFunction";
import { Web3Context } from "@/context/Web3Context";


const InfoBtn = () => {
    const { account } = useContext(Web3Context);
    const [totalMints, setTotalMints] = useState<number>(0);
    const [userMint, setUserMint] = useState<number>(0);
    useEffect(() => {
        const fetchTotalSupply = async () => {
            try {
                const total = await totalSupplyFun();
                setTotalMints(Number(total));
            } catch (error) {
                console.error("Error fetching total supply:", error);
            }
        };
        const fetchUserSupply = async (account: string) => {
            try {
                const userTokens = await userHas(account);
                setUserMint(userTokens?.length);
            } catch (error) {
                console.error("Error fetching total supply:", error);
            }
        };

        fetchTotalSupply();

        if (account) {
            fetchUserSupply(account);
        }
    }, [account]);

    return (
        <div className="infobutton">
            <div>
                <span>
                    <p>Your mints: {userMint}</p>
                </span>
            </div>
            <div>
                <span>
                   <p>Total mints: {totalMints}</p>
                </span>
            </div>
        </div>
    )
}

export default InfoBtn;