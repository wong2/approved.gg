import { useContractWrite } from "wagmi";
import { ERC721_ABI } from "../services/erc721";

export function useMutateApproved(contract: string) {
  return useContractWrite(
    {
      addressOrName: contract,
      contractInterface: ERC721_ABI,
    },
    "setApprovalForAll"
  );
}
