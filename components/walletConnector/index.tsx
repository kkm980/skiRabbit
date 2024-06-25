// components/WalletConnector.tsx
"use client"
import React, { useEffect } from 'react';
import Image from "next/image";
import { Button } from '../ui/button';
import { AnimatedTooltip } from '../ui/animatedTooltip';
import Link from 'next/link';
import { useContext } from 'react';
import { Web3Context } from '@/context/Web3Context';
import Loader from '../common/Loader';
// import { Web3Context } from '@/context/MetamaskProvider';

const WalletConnector: React.FC = () => {
    const [mounted, setMounted] = React.useState(false);
    
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <Loader/>; // Avoid hydration mismatch by not rendering on the server
    }
    // const { account, connectWallet, disconnectWallet, signMessage } = useWeb3();
    const { account, balance, connectWallet, userProfileConfig } = useContext(Web3Context);
    const handleSignMessage = async () => {
        const message = 'Sign this message to prove you own this wallet!';
    };


    return (
        <div className=''>
            {account ? (
                <div className='mr-2'>
                    <AnimatedTooltip children={<Link className='bg-transparent hover:bg-transparent' href="/about"><Image width={40} height={40} src={userProfileConfig?.profileImg} alt={userProfileConfig?.profileType} /></Link>} content="Profile"></AnimatedTooltip>
                </div>
            ) : (
                <AnimatedTooltip children={<Button className='bg-transparent hover:bg-transparent' onClick={()=>connectWallet()}><Image width={40} height={40} src="/images/home/connect.gif" alt="connect" /></Button>} content="Connect Metamask wallet"></AnimatedTooltip>
            )}
        </div>
    );
};

export default WalletConnector;
