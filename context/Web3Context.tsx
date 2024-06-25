"use client"

// src/Web3Provider.tsx
import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

interface UserProfileConfig {
  profileImg: string;
  profileType: string;
}

interface UserProfileProps {
  userProfileConfig: UserProfileConfig;
  setUserProfile: (profileImg: string, profileType: string)=>void;
}

interface Web3ContextProps extends UserProfileProps {
  account: string | null;
  balance: string;
  network: string;
  connectWallet: () => Promise<void>;
  signMessage: (message: string) => Promise<string | null>;
  signMsg: string;
  ownedNft: number[];
  setNFTData: (ntData: number[]) => void;
  transactions: [];
  addTransactions: (transactionsArr: any[]) => void;
}

export const Web3Context = createContext<Web3ContextProps>({
  account: null,
  balance: '',
  network: '',
  connectWallet: async () => {},
  signMessage: async (message: string) => null,
  signMsg: '',
  userProfileConfig: { profileImg: "/images/about/eye.gif", profileType: "default" },
  setUserProfile: (profileImg: string, profileType: string) => {},
  ownedNft: [],
  setNFTData: () => {},
  transactions: [],
  addTransactions: (transactionsArr: any[]) => {}
});




interface Web3ProviderProps {
  children: ReactNode;
}

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [balance, setBalance] = useState<string>('');
  const [network, setNetwork] = useState<string>('');
  const [signMsg, setSignMsg] = useState<string>('');
  const [ownedNft, setOwnedNft] = useState<number[]>([]);
  const [userProfileConfig, setUserProfileConfig] = useState<{
    profileImg: string;
    profileType: string;
  }>({ profileImg: "/images/about/eye.gif", profileType: "default" });
  const [transactions, setTransactions] = useState<any>([]);

  const addTransactions = (transactionsArr: any[]) => {
    setTransactions([...transactions, ...transactionsArr]);
    let localUser: string | null = localStorage.getItem("skiRabbitUserData");
      let newUser: { [key: string]: any } = {};

      if (localUser) {
        const parsedUser = JSON.parse(localUser);
        if (typeof parsedUser === 'object' && parsedUser !== null) {
          newUser = { ...parsedUser };
        }
      }

      newUser.transactions = transactions;
      localStorage.setItem("skiRabbitUserData", JSON.stringify(newUser));
  }

  // Effect to initialize the Web3 instance and set up event listeners
  const init = async () => {
    const provider: any = await detectEthereumProvider();
    if (provider) {
      const web3Instance = new Web3(provider);
      setWeb3(web3Instance);

      // Event listener for account changes
      provider.on('accountsChanged', (accounts: string[]) => {
        setAccount(accounts[0] || '');
        fetchBalance(accounts[0], web3Instance);
      });

      // Event listener for network changes
      provider.on('chainChanged', (chainId: string) => {
        fetchNetwork(parseInt(chainId, 16));
      });

      // Connect to the wallet on load
      await connectWallet();
    } else {
      console.error('Please install MetaMask!');
    }
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    const userData = localStorage.getItem("skiRabbitUserData");
    if (userData) {
      let newData = JSON.parse(userData);
      if (newData?.account) {
        //  newData={...newData, account: account};
        setAccount(newData?.account)
      }
      if (+newData?.balance > 0) {
        setBalance(newData?.balance)
      }
      if (newData?.network.length > 0) {
        setNetwork(newData?.network)
      }
      if (newData?.signMsg > 0) {
        setSignMsg(newData?.signMsg);
      }
      if(newData?.userProfileConfig) {
        setUserProfileConfig({...newData?.userProfileConfig});
      }
      if(newData?.ownedNft) {
        setOwnedNft({...newData?.ownedNft});
      }
      if(newData?.transactions) {
        setOwnedNft({...newData?.transactions});
      }
    }
  }, [])

  const setUserProfile = (profileImg: string, profileType: string) => {
    setUserProfileConfig({profileImg, profileType});
    let localUser: string | null = localStorage.getItem("skiRabbitUserData");
      let newUser: { [key: string]: any } = {};

      if (localUser) {
        const parsedUser = JSON.parse(localUser);
        if (typeof parsedUser === 'object' && parsedUser !== null) {
          newUser = { ...parsedUser };
        }
      }

      newUser.userProfileConfig = {profileImg, profileType};
      localStorage.setItem("skiRabbitUserData", JSON.stringify(newUser));

  }

  // Function to connect to the Ethereum wallet
  const connectWallet = async () => {
    if (web3) {
      try {
        const accounts = await web3.eth.requestAccounts();
        const account = accounts[0];
        setAccount(account);
      let localUser: string | null = localStorage.getItem("skiRabbitUserData");
      let newUser: { [key: string]: any } = {};

      if (localUser) {
        const parsedUser = JSON.parse(localUser);
        if (typeof parsedUser === 'object' && parsedUser !== null) {
          newUser = { ...parsedUser };
        }
      }

      newUser.account = account;
      localStorage.setItem("skiRabbitUserData", JSON.stringify(newUser));
        fetchBalance(account, web3);
        const chainId = await web3.eth.getChainId();
        fetchNetwork(chainId);
      } catch (error: any) {
        console.error('Error connecting to MetaMask: ', error?.message);
      }
    }
  };

  // Function to fetch the balance of the connected account
  const fetchBalance = async (account: string, web3Instance: Web3) => {
    if (account) {
      const balanceWei = await web3Instance.eth.getBalance(account);
      setBalance(web3Instance.utils.fromWei(balanceWei, 'ether'));
      let localUser: string | null = localStorage.getItem("skiRabbitUserData");
      let newUser: { [key: string]: any } = {};

      if (localUser) {
        const parsedUser = JSON.parse(localUser);
        if (typeof parsedUser === 'object' && parsedUser !== null) {
          newUser = { ...parsedUser };
        }
      }

      newUser.balance = web3Instance.utils.fromWei(balanceWei, 'ether');
      localStorage.setItem("skiRabbitUserData", JSON.stringify(newUser));

    }
  };

  // Function to fetch the network name based on chain ID
  const fetchNetwork = (chainId: number | bigint) => {
    const networkName = getNetworkName(chainId);
    setNetwork(networkName);
    let localUser: string | null = localStorage.getItem("skiRabbitUserData");
      let newUser: { [key: string]: any } = {};

      if (localUser) {
        const parsedUser = JSON.parse(localUser);
        if (typeof parsedUser === 'object' && parsedUser !== null) {
          newUser = { ...parsedUser };
        }
      }

      newUser.network = networkName;
      localStorage.setItem("skiRabbitUserData", JSON.stringify(newUser));
  };

  // Function to get the network name from the chain ID
  const getNetworkName = (chainId: number|bigint) => {
    switch (chainId) {
      case 1:
        return 'Ethereum Mainnet';
      case 3:
        return 'Ropsten Testnet';
      case 4:
        return 'Rinkeby Testnet';
      case 5:
        return 'Goerli Testnet';
      case 42:
        return 'Kovan Testnet';
      default:
        return 'SepoliaETH';
    }
  };


  const setNFTData = (nftData:number[]) =>{
    setOwnedNft(nftData);
    let localUser: string | null = localStorage.getItem("skiRabbitUserData");
      let newUser: { [key: string]: any } = {};

      if (localUser) {
        const parsedUser = JSON.parse(localUser);
        if (typeof parsedUser === 'object' && parsedUser !== null) {
          newUser = { ...parsedUser };
        }
      }

      newUser.ownedNft = nftData;
      localStorage.setItem("skiRabbitUserData", JSON.stringify(newUser));
  }

  const disconnectWallet = () => {
    setAccount(null);
    setBalance('');
    setNetwork('');
    setSignMsg('');
  };

  const signMessage = async (message: string) => {
    if (web3 && account) {
      try {
        const signature = await web3.eth.personal.sign(message, account, '');
        setSignMsg(signature);
        let localUser: string | null = localStorage.getItem("skiRabbitUserData");
      let newUser: { [key: string]: any } = {};

      if (localUser) {
        const parsedUser = JSON.parse(localUser);
        if (typeof parsedUser === 'object' && parsedUser !== null) {
          newUser = { ...parsedUser };
        }
      }

      newUser.signMsg = signature;
      localStorage.setItem("skiRabbitUserData", JSON.stringify(newUser));
        return signature;
      } catch (error) {
        console.error('Failed to sign message', error);
        return null;
      }
    }
    return null;
  };

  return (
    <Web3Context.Provider value={{ account, balance, connectWallet, signMessage, network, signMsg, userProfileConfig, setUserProfile, ownedNft, setNFTData, transactions, addTransactions }}>
      {children}
    </Web3Context.Provider>
  );
};

// Custom hook to use the MetaMaskContext
export const useMetaMask = () => {
  return useContext(Web3Context);
};
