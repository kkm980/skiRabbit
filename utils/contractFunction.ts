import { ethers } from "ethers";
import factoryContract from "../constant/factoryContract";
import Web3 from 'web3';
declare var window: any;
const contractAddress = process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS;

let web3;
if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
  web3 = new Web3(window.ethereum);
}

// Set up the provider (Metamask in this case)
async function getProvider() {
  if (typeof window !== 'undefined' && typeof window.ethereum !== 'undefined') {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.BrowserProvider(window.ethereum);
    return provider;
  } else {
    throw new Error("Ethereum provider not found");
  }
}

// Create a contract instance
async function getContract() {
  const provider = await getProvider();
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress || "", factoryContract, signer);
  return contract;
}

export async function callMultipleFunctions() {
  try {
    const contract = await getContract();
    const result1 = await contract.getMintedTokens();
    return { result1 };
  } catch (error) {
    console.error("Error calling contract functions:", error);
  }
}

export async function batchMintFun(totalNumber: number) {
  try {
    const contract = await getContract();
    const tx = await contract.mint(totalNumber, {
      value: 1,
      gasLimit: 2000000
    });
    const receipt = await tx.wait();
    console.log("Transaction successful:", receipt);
    return { success: true, receipt };
  } catch (error) {
    console.error("Error calling contract functions:", error);
    return { success: false };
  }
}

export async function burnTokens(tokensArr: number[]) {
  try {
    if (tokensArr.length < 1) {
      return;
    }
    const contract = await getContract();
    const tx = await contract.burn(tokensArr, {
      value: 1 * (tokensArr?.length),
      gasLimit: 2000000
    });
    const receipt = await tx.wait();
    console.log("Transaction successful:", receipt);
    return { success: true, receipt };
  } catch (error) {
    console.error("Error calling contract functions:", error);
    return { success: false };
  }
}

export async function transferTokens(guestAddress: string, tokensArr: number[]) {
  try {
    if (tokensArr.length < 1 || !guestAddress) {
      return;
    }
    const contract = await getContract();
    const tx = await contract.transferTokens(guestAddress, tokensArr, {
      value: 1 * (tokensArr?.length),
      gasLimit: 2000000
    });
    const receipt = await tx.wait();
    console.log("Transaction successful:", receipt);
    return { success: true, receipt };
  } catch (error) {
    console.error("Error calling contract functions:", error);
    return { success: false };
  }
}

export async function totalSupplyFun() {
  try {
    const contract = await getContract();
    const result = await contract.ourSupply();
    return result;
  } catch (error) {
    console.error("Error calling contract functions:", error);
    return 0;
  }
}

export async function userHas(address: string) {
  try {
    const contract = await getContract();
    let result = await contract.getTokensOfWallet(address);
    result = JSON.stringify(result);
    result = JSON.parse(result);
    return result;
  } catch (error) {
    console.error("Error calling contract functions:", error);
  }
}
