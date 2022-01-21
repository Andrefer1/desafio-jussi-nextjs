import Image from "next/image";
import Link from "next/link";

import JussiOfficeImage from "../../../public/images/Presentation/image-jussi.png";

import styles from "./presentation.module.scss";

export function Presentation() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <section>
          <h3>OLÁ, SOMOS A JÜSSI</h3>

          <p>
            A Jüssi é uma agência integrante do grupo global WPP que vem há 10
            anos consolidando o pensamento voltado para produtos e resolução de
            problemas. Nosso área dedicada exclusivamente para Produtos Digitais
            é organizada em 6 especialidades: Product Managamenet, User
            Experience Design, SEO, Tecnologia, Agile e User Behavior Analytics.
          </p>
          <Link href="#conheca-a-jussi">
            <a>Conheça a Jüssi</a>
          </Link>
        </section>

        <Image
          src={JussiOfficeImage}
          alt="Imagem do escritório da Jüssi com funcionários trabalhando"
        />
      </div>
      <div className={styles.boxBackgroundImage}></div>
    </div>
  );
}
