import styles from './PageLoader.module.css';

export default function PageLoader() {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.title}>Carregando</div>
        <div className={styles.subtitle}>Só um instante…</div>
      </div>
    </div>
  );
}

