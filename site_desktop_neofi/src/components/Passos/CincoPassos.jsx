import styles from "./CincoPassos.module.css";
import BotoesResponsivos from "./BotoesResponsivos";

export default function CincoPassos({ descricao, subTexto, arrayDadosBotoes }) {
  return (
    <div className={styles.containerPrincipal}>
      <div className={styles.headerContainer}>
        <h2 className={styles.descricao}>{descricao}</h2>
        <p className={styles.subTexto}>{subTexto}</p>
      </div>
      <div className={styles.buttonContainer}>
        <BotoesResponsivos arrayInfo={arrayDadosBotoes} />
      </div>
    </div>
  );
}
