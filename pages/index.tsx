import type { NextPage } from "next";
import { Page, Text } from "@geist-ui/core";
import Head from "next/head";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import CollectionTable from "../components/Table";

const Home: NextPage = () => {
  const { data: account } = useAccount();
  return (
    <div className="container mx-auto mt-5 max-w-2xl">
      <Head>
        <title>Approved.gg</title>
      </Head>
      <Page dotBackdrop padding={0.5} width="100%">
        <Page.Header>
          <div className="flex flex-row justify-between items-center">
            <Text h4>Approved.gg</Text>
            {account && <ConnectButton showBalance={false} />}
          </div>
        </Page.Header>
        <Page.Content>
          {account ? <CollectionTable address={account.address!} /> : <ConnectButton />}
        </Page.Content>
      </Page>
    </div>
  );
};

export default Home;
