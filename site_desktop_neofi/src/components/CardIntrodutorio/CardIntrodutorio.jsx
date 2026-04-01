import styles from './CardIntrodutorio.module.css';

export default function CardIntrodutorio({ pathImg, logoProduto, textoHeader, children, ctaHref, ctaText, rightContent }) {

    return (
        <div className={styles.heroContainer}>
            <div className={styles.colunaConteudo}>
                {logoProduto}
                <div className={styles.headerNeoline}>
                    {textoHeader}
                </div>
                <div className={styles.textContainer}>
                    <>{children}</>
                </div>
                {ctaHref && ctaText ? (
                    <a className={styles.botaoContato} href={ctaHref} target="_blank" rel="noopener noreferrer">
                        {ctaText}
                    </a>
                ) : null}
            </div>

            <div className={styles.imageContainer}>
                {rightContent ? rightContent : <img src={pathImg} className={styles.imgIntroLine} />}
            </div>
        </div>
    );
}
