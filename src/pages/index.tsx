import type { NextPage } from "next";
import Head from "next/head";

import { Banner } from "../components/Banner";
import { Stores } from "../components/Stores";
import { Solutions } from "../components/Solutions";
import { Presentation } from "../components/Presentation";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Desafio Jüssi</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Banner />
      <Stores />
      <Solutions />
      <Presentation />
    </div>
  );
};

export default Home;
