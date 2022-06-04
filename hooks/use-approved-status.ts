import { zipObject } from "lodash-es";
import useSWR from "swr";
import { MARKETS } from "../consts";
import { isApprovedForAll } from "../services/erc721";

async function fetchApprovedStatus(user: string, contract: string) {
  const results: boolean[] = await Promise.all(
    MARKETS.map((m) => isApprovedForAll(user, contract, m.contract))
  );
  return zipObject(
    MARKETS.map((m) => m.name),
    results
  );
}

export function useApprovedStatus(user: string, contract: string) {
  return useSWR(`approved:${user}:${contract}`, () => fetchApprovedStatus(user, contract));
}
