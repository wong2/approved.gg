import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcBatchProvider("https://rpc.ankr.com/eth");

export const ERC721_ABI = [
  "function setApprovalForAll(address _operator, bool _approved)",
  "function isApprovedForAll(address _owner, address _operator) view returns (bool)",
];

export async function isApprovedForAll(user: string, collectionContract: string, operator: string) {
  const contract = new ethers.Contract(collectionContract, ERC721_ABI, provider);
  return contract.isApprovedForAll(user, operator);
}
