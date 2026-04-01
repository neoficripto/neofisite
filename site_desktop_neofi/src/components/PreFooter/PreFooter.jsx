import styles from './PreFooter.module.css';

export default function PreFooter({ children }) {

    return (

        <div className={styles.preFooterContainer}>
            <div className={styles.centerPreFoot}>
                {children}
                <div className={styles.tempButton}></div>
            </div>
        </div>
    )
}