import { Product } from "./Product";

import styles from "./solutions.module.scss";

type ProductProps = {
  id: string;
  name: string;
  description: string;
  features: string[];
};

type SolutionsProps = {
  products: ProductProps[];
};

const products = [
  {
    id: "1",
    name: "Nome do Produto #1",
    description: "Descrição do produto #1",
    features: ["Feature 1", "Feature 2", "Feature 3"],
  },
  {
    id: "2",
    name: "Nome do Produto #2",
    description: "Descrição do produto #2",
    features: ["Feature 1", "Feature 2", "Feature 3"],
  },
  {
    id: "3",
    name: "Nome do Produto #3",
    description: "Descrição do produto #3",
    features: ["Feature 1", "Feature 2", "Feature 3"],
  },
  {
    id: "4",
    name: "Nome do Produto #4",
    description: "Descrição do produto #4",
    features: ["Feature 1", "Feature 2", "Feature 3"],
  },
];

export function Solutions() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h2>
          <span>{"//"}</span> {""}NOSSAS SOLUÇÕES
        </h2>

        <div className={styles.products}>
          {products.map((product) => (
            <Product
              key={product.id}
              image={`P${product.id}`}
              name={product.name}
              description={product.description}
              features={product.features}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
