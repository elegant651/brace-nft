import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import Layout from '../components/Layout';
import Prose from '../components/Prose';
import Minting from '../components/Minting';
import TokenList from '../components/TokenList';
import projectConfig from '../config/projectConfig';
import topImage from '../public/assets/main.jpg';

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>{projectConfig.nftName}</title>
      </Head>

      <div className="bg-gray-800 py-8">
        <Prose>
          <h1 className="text-5xl font-bold mb-2">{projectConfig.nftName}</h1>
          <p className="text-xl">
            It operates on the polygon mumbai testnet.
          </p>
        </Prose>
      </div>

      <div className="py-8">
        <Prose>
          <Minting />
          {/* <TokenList /> */}
        </Prose>
      </div>
    </Layout>
  );
};

export default Home;
