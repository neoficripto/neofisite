import styles from "./Botao.module.css";

export default function Botao({ image, stepNumber, isActive, onClick, subText }) {
  const styling = `${isActive ? styles.active : styles.inactive}`;

  return (
    <div className={styles.fullContainer}>
        <button key={stepNumber} className={styling} onClick={onClick}>
          <h2 className={styles.numberText}>{stepNumber}</h2>
          <div className={styles.iconWrapper}>
            <img src={image} className={styles.imgBotao} />
          </div>
          
        </button>
        {subText}
      </div>
      );

}
