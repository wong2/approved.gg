import { Avatar, Loading, Table, Text } from "@geist-ui/core";
import { TableColumnRender } from "@geist-ui/core/esm/table";
import Link from "next/link";
import { FC } from "react";
import { Collection, useOwnedCollections } from "../hooks/use-owned-collections";
import ApprovedIconGroup from "./ApprovedIconGroup";

const CollectionTable: FC<{ address: string }> = ({ address }) => {
  const { data, error } = useOwnedCollections(address);

  const renderCollection: TableColumnRender<Collection> = (_value, rowData) => {
    return (
      <Link href={`https://gem.xyz/collection/${rowData.contract.address}/`}>
        <a target="_blank" className="text-black">
          <div className="flex flex-row items-center">
            <Avatar src={rowData.image_url} isSquare text={rowData.name} />
            <Text className="ml-2 font-bold">{rowData.name}</Text>
          </div>
        </a>
      </Link>
    );
  };

  const renderApproved: TableColumnRender<Collection> = (_value, rowData) => {
    return <ApprovedIconGroup address={address} contractAddress={rowData.contract.address} />;
  };

  if (!data && !error) {
    return <Loading>Loading Collections</Loading>;
  }

  return (
    <div>
      <Table<Collection> data={data || []}>
        <Table.Column prop="name" label="Collection" render={renderCollection} />
        <Table.Column prop="contract" label="Approved?" render={renderApproved}>
          <Text className="text-center !w-full">Approved?</Text>
        </Table.Column>
      </Table>
    </div>
  );
};

export default CollectionTable;
