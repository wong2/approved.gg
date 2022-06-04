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
      const contract = c.primary_asset_contracts[0];
      if (!contract || (contract.schema_name !== "ERC721" && contract.schema_name !== "ERC1155")) {
        return;
      }
      return {
        name: c.name,
        image_url: c.image_url,
        slug: c.slug,
        contract: { address: contract.address },
      };
    })
  );
}

export function useOwnedCollections(address: string) {
  return useSWRImmutable(`collections:${address}`, () => fetchOwnedCollections(address));
}
