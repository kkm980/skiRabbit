import { ethers, Contract, BigNumberish } from "ethers";
import factoryContract from "../constant/factoryContract";
import Web3 from 'web3';
declare var window: any;
// declare var ethers: any;


// Load the contract address from .env file
const contractAddress = process.env.NEXT_PUBLIC_SMART_CONTRACT_ADDRESS;

const web3 = new Web3(window.ethereum);
// Set up the provider (Metamask in this case)
async function getProvider() {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const provider = new ethers.BrowserProvider(window.ethereum);
    return provider;
  }

  // Create a contract instance
async function getContract() {
    const provider = await getProvider();
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress||"", factoryContract, signer);
    return contract;
  }


export async function callMultipleFunctions() {
    try {
      const contract = await getContract();
  
      // Call the first function
      const result1 = await contract.getMintedTokens();
      return {result1};
    } catch (error) {
      console.error("Error calling contract functions:", error);
    }
  }

  export async function batchMintFun(totalNumber: number) {
    try {
        const contract = await getContract();
        const provider = await getProvider();
        // const signer = await provider.getSigner();
        // const value= BigInt(0.000000001 * totalNumber);
        // // const valueBigInt = BigInt(value);
        // // const amount = ethers.parseEther(`${value}`);
        // const amount = ethers.parseEther((0.000000001 * totalNumber).toString());
        // const totalNum = BigInt(totalNumber);
        const tx = await contract.mint(totalNumber
          , {
            value: 1,
            gasLimit: 2000000 // Set an appropriate gas limit
        }
        );

        // const newTx = await contract.mint("1", {
        //   value: ethers.parseEther((0.000000001).toString()), // Adjust the value as needed
        // });

        const receipt = await tx.wait(); // Wait for the transaction to be mined
        console.log("Transaction successful:", receipt);
        // CHECK_POINT_API->MINT_RESP
        return {success:true, receipt};
    } catch (error) {
      return {success:false};
        console.error("Error calling contract functions:", error);
    }
}


export async function burnTokens(tokensArr: number[]) {
  try {
    if(tokensArr.length<1){
      return;
    }
      const contract = await getContract();
      const provider = await getProvider();
      const tx = await contract.burn(tokensArr
        , {
          value: 1*(tokensArr?.length),
          gasLimit: 2000000 // Set an appropriate gas limit
      }
      );

      const receipt = await tx.wait(); // Wait for the transaction to be mined
      console.log("Transaction successful:", receipt);
      // CHECK_POINT_API->BURN_RESP
      return {success:true, receipt};
  } catch (error) {
    console.error("Error calling contract functions:", error);
    return {success:false};
      
  }
}


export async function transferTokens(guestAddress: string, tokensArr: number[]) {
  try {
    if(tokensArr.length<1 || !guestAddress){
      return;
    }
      const contract = await getContract();
      const provider = await getProvider();
      const tx = await contract.transferTokens(guestAddress, tokensArr
        , {
          value: 1*(tokensArr?.length),
          gasLimit: 2000000 // Set an appropriate gas limit
      }
      );

      const receipt = await tx.wait(); // Wait for the transaction to be mined
      console.log("Transaction successful:", receipt);
      // CHECK_POINT_API->TRANSFER_RESP
      return {success:true, receipt};
  } catch (error) {
    console.error("Error calling contract functions:", error);
    return {success:false};
      
  }
}

export async function totalSupplyFun(): Promise<number> {
  try {
      const contract = await getContract();
      const result = await contract.ourSupply();
      return result;
  } catch (error) {
      console.error("Error calling contract functions:", error);
      return 0; // Return a default value or handle the error appropriately
  }
}

export async function userHas(address: string) {
  try {
      const contract = await getContract();
      let result = await contract.getTokensOfWallet(address);
      result=JSON.stringify(result);
      result=JSON.parse(result);
      return result;
  } catch (error) {
      console.error("Error calling contract functions:", error);
  }
}
