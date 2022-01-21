import Image from "next/image";
import Link from "next/link";

import styles from "./store.module.scss";

type StoreProps = {
  className: string;
  image: StaticImageData;
  alt: string;
  href: string;
};

export function Store({ className, image, alt, href }: StoreProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.content}>
        <Link href={href}>
          <a>
            <Image src={image} alt={alt} objectFit="contain" />
          </a>
        </Link>
      </div>
    </div>
  );
}
