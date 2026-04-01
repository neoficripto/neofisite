import styles from './CardBeneficios.module.css';

export default function CardBeneficios({header, description}){

    return (
        <div className={styles.cardContainer}>
            {header}
            {description}
        </div>
    )
}