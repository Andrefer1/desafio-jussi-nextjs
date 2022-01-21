import { Card } from "./Card";

import FoodMixer from "../../../public/images/Banner/FoodMixer.svg";
import Fridge from "../../../public/images/Banner/Fridge.svg";
import Whisky from "../../../public/images/Banner/Whisky.svg";

import styles from "./banner.module.scss";

export function Banner() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <section className={styles.information}>
          <h1>CRIAMOS LOJAS QUE VENDEM MAIS.</h1>
          <p>
            A Jüssi é especialista na criação de lojas usando a plataforma VTEX.
            Precisa criar sua loja ou migrar de plataforma?
          </p>

          <a href="#nossas-solucoes">Veja nossas soluções</a>
        </section>

        <section className={styles.cards}>
          <Card
            id={styles.card1}
            image={Fridge}
            alt="Geladeira cinza com duas portas e detalhes em preto"
            text="Mais detalhes"
            href="#geladeira-cinza"
          />
          <Card
            id={styles.card2}
            image={FoodMixer}
            alt="Batedeira de bolo vermelha no estilo retrô"
            text="Comprar em 12x"
            href="#batedeira-bolo"
          />
          <Card
            id={styles.card3}
            image={Whisky}
            alt="Garrafa cheia de whisky Black Label"
            text="Adicionar à sacola"
            href="#garrafa-whisky"
          />
        </section>
      </div>
    </div>
  );
}
