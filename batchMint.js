import { ThirdwebSDK } from "@thirdweb-dev/sdk/evm";
import * as fs from "fs";
import dotenv from "dotenv";
dotenv.config()

//prepare thirdweb sdk
const sdk = ThirdwebSDK.fromPrivateKey(process.env.PRIVATE_KEY, process.env.NETWORK);
//grab the contract from thirdweb
const contract = await sdk.getContract(process.env.CONTRACT_ADDRESS);

// Address of the wallet you want to mint the NFT to
const walletAddress = process.env.WALLET_ADDRESS;

// Custom metadata of the NFTs
const metadatas = [{
  name: "Cool NFT #1",
  description: "This is some description about cool NFT 1",
  image: fs.readFileSync("images/nft_1.png"),
}, {
  name: "Cool NFT #2",
  description: "This is some description about cool NFT 2",
  image: fs.readFileSync("images/nft_2.png"),
},
{
  name: "Cool NFT #3",
  description: "This is some description about cool NFT 3",
  image: fs.readFileSync("images/nft_3.png"),
}];

//invoke batch mint
const tx = await contract.erc721.mintBatchTo(walletAddress, metadatas);
const receipt = tx[0].receipt; // same transaction receipt for all minted NFTs
const firstTokenId = tx[0].id; // token id of the first minted NFT
const firstNFT = await tx[0].data(); // (optional) fetch details of the first minted NFT
//print output
console.log("Transaction Successful.\nFirst Token ID: "+firstTokenId+"\nFirst NFT Owner: "+firstNFT.owner)