import axios from "axios";
import { compact } from "lodash-es";
import useSWRImmutable from "swr/immutable";

export interface Collection {
  name: string;
  image_url: string;
  slug: string;
  contract: {
    address: string;
  };
}

async function fetchOwnedCollections(address: string): Promise<Collection[]> {
  const resp = await axios.get("https://api.opensea.io/api/v1/collections", {
    params: {
      asset_owner: address,
      offset: 0,
      limit: 300,
    },
  });
  return compact(
    resp.data.map((c: any) => {
      const contractAddress: string | undefined = c.primary_asset_contracts[0]?.address;
      if (!contractAddress) {
        return;
      }
      return {
        name: c.name,
        image_url: c.image_url,
        slug: c.slug,
        contract: { address: contractAddress },
      };
    })
  );
}

export function useOwnedCollections(address: string) {
  return useSWRImmutable(`collections:${address}`, () => fetchOwnedCollections(address));
}
