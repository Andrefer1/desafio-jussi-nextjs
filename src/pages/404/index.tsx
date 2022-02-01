import Head from "next/head";

import styles from "./404.module.scss";

export default function Custom404(): JSX.Element {
  return (
    <div className={styles.container}>
      <Head>
        <title>404 - ops | Jüssi </title>
      </Head>

      <div className={styles.content}>
        <h1>404</h1>
        <p>Não foi possível encontrar este Pokémon! :{"("} </p>
      </div>
    </div>
  );
}
