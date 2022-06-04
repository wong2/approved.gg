import type { NextPage } from "next";
import { Page, Text } from "@geist-ui/core";
import Head from "next/head";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import CollectionTable from "../components/Table";
import Link from "next/link";

const Home: NextPage = () => {
  const { data: account } = useAccount();
  return (
    <div className="container mx-auto mt-5 max-w-2xl">
      <Head>
        <title>Approved.gg</title>
        <meta name="description" content="Simplest way to manage NFT approvals" />
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
        <Page.Footer>
          <p className="text-sm text-center">
            Created by&nbsp;
            <Link href="https://twitter.com/wong2_x">
              <a target="_blank">@wong2</a>
            </Link>
          </p>
        </Page.Footer>
      </Page>
    </div>
  );
};

export default Home;
