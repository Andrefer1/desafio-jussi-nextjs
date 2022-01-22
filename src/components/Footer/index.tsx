import { FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";

import LogoWPP from "../../../public/images/Footer/wppcompany.png";

import styles from "./footer.module.scss";

export function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div>
          <Link href="#wpp-company">
            <a>
              <Image
                id={styles.logoWpp}
                src={LogoWPP}
                alt="Assinatura da WPP Company informando que a Jüssi é uma subsidiária"
              />
            </a>
          </Link>
        </div>

        <div>
          <Link href="#facebook">
            <a>
              <FaFacebookF className={styles.icon} size={22} />
            </a>
          </Link>
          <Link href="#instagram">
            <a>
              <BsInstagram className={styles.icon} size={22} />
            </a>
          </Link>
          <Link href="#linkedin">
            <a>
              <FaLinkedinIn className={styles.icon} size={22} />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
