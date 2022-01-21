import { FiShoppingCart, FiMenu } from "react-icons/fi";
import Image from "next/image";

import { Search } from "./Search";

import LogoJussi from "../../../public/image/Header/logoJussiVectorGreen.png";

import styles from "./header.module.scss";

export function Header() {
  function showMenu() {
    const navElement = document.querySelector("nav");

    if (!navElement) {
      return console.log(null);
    }

    if (!navElement.classList.contains("openSidebar")) {
      navElement.classList.add("openSidebar");
      return navElement.classList.add(styles.openSidebar);
    } else {
      navElement.classList.remove("openSidebar");
      return navElement.classList.remove(styles.openSidebar);
    }
  }

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Image
          id={styles.logoJussi}
          src={LogoJussi}
          alt="Jüssi: The Business Agency"
          priority
        />

        <nav>
          <div>
            <a href="#nossas-solucoes">Nossas soluções</a>
            <a href="#conheca-a-jussi">Conheça a Jüssi</a>
          </div>

          <div>
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
