import styles from "./promotion.module.scss";

export function Promotion() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p>RECEBA NOVIDADES DA NOSSA ÁREA DE PRODUTOS DIGITAIS.</p>

        <div>
          <input type="email" name="email" placeholder="Digite seu e-mail" />
          <button type="submit">CADASTRAR</button>
        </div>
      </div>
    </div>
  );
}
