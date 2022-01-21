import Image from "next/image";

import styles from "./card.module.scss";

type CardProps = {
  id: string;
  image: string;
  alt: string;
  text: string;
  href: string;
};

export function Card({ id, image, alt, text, href }: CardProps) {
  return (
    <div id={id} className={styles.container}>
      <div className={styles.content}>
        <Image src={image} alt={alt} height={500} />
        <a href={href}>{text}</a>
      </div>
    </div>
  );
}
