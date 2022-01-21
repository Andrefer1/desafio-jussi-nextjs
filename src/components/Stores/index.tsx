import { Store } from "./Store";

import LogoBrastemp from "../../../public/images/Stores/Brastemp/logo-brastemp.png";
import LogoCompraCerta from "../../../public/images/Stores/CompraCerta/logo-compra-certa.png";
import LogoConsul from "../../../public/images/Stores/Consul/logo-consul.png";
import LogoTheBar from "../../../public/images/Stores/TheBar/logo-thebar.png";

import styles from "./stores.module.scss";

export function Stores() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p>Nossas Principais lojas VTEX</p>

        <span id={styles.arrow}>→</span>

        <div id={styles.stores}>
          <Store
            className={styles.store}
            image={LogoBrastemp}
            alt="Logo da Brastemp"
            href="#brastemp"
          />
          <Store
            className={styles.store}
            image={LogoCompraCerta}
            alt="Logo da Compra Certa"
            href="#compra-certa"
          />
          <Store
            className={styles.store}
            image={LogoConsul}
            alt="Logo da Consul"
            href="#consul"
          />
          <Store
            className={styles.store}
            image={LogoTheBar}
            alt="Logo da The Bar"
            href="#the-bar"
          />
        </div>
      </div>
    </div>
  );
}
