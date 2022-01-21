import Link from "next/link";

import styles from "./product.module.scss";

type ProductProps = {
  image: string;
  name: string;
  description: string;
  features: string[];
};

export function Product({ image, name, description, features }: ProductProps) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h3>{image}</h3>

        <div>
          <strong>{name}</strong>
          <p>{description}</p>

          <ul>
            {features.map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>

        <Link href="#solucao">
          <a>Ver solução</a>
        </Link>
      </div>
    </div>
  );
}
