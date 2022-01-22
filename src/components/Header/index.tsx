import { FiShoppingCart, FiMenu } from "react-icons/fi";
import Image from "next/image";

import { Search } from "./Search";

import LogoJussi from "../../../public/images/Header/logoJussiVectorGreen.png";

import styles from "./header.module.scss";

export function Header() {
  function showMenu() {
    const navElement = document.querySelector("nav");

    if (!navElement) {
      return console.log(null);
    }

    if (!navElement.classList.contains("openMenu")) {
      navElement.classList.add("openMenu");
      return navElement.classList.add(styles.openMenu);
    } else {
      navElement.classList.remove("openMenu");
      return navElement.classList.remove(styles.openMenu);
    }
  }

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <div id={styles.divLogoJussi}>
          <Image
            id={styles.logoJussi}
            src={LogoJussi}
            alt="Jüssi: The Business Agency"
            priority
          />
        </div>

        <nav>
          <div id={styles.links}>
            <a href="#nossas-solucoes">Nossas soluções</a>
            <a href="#conheca-a-jussi">Conheça a Jüssi</a>
          </div>

          <div id={styles.buttonsAndSearch}>
            <Search />
            <button>Login</button>
            <button>
              <FiShoppingCart size={22} />
            </button>
          </div>
        </nav>

        <FiMenu size={25} id={styles.menu} onClick={showMenu} />
      </div>
    </header>
  );
}
