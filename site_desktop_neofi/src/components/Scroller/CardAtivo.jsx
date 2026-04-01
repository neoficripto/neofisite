import styles from './CardAtivo.module.css';

export default function CardAtivo({image, title, description}) {

    return (
        <div className={styles.cardContainer}>
            <img src={image} className={styles.image}/>
            <h3 className={styles.head}>{title}</h3>
            <p className={styles.par}>{description}</p>
        </div>
    )
}