import styles from "./contacts.module.scss";

export function Contacts() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p>
          ESSA LOJA FOI CONSTRUÍDA USANDO UMAS DAS NOSSAS SOLUÇÕES DA PLATAFORMA
          VTEX. TENHA A SUA.
        </p>
        <div>Entre em contato</div>
        <span>comercial@jussi.com.br</span>
      </div>
    </div>
  );
}
