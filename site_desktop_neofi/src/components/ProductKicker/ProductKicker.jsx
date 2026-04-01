import styles from './ProductKicker.module.css';

export default function ProductKicker({ text, variant = 'section' }) {
  const variantClass = variant === 'hero' ? styles.hero : styles.section;
  return <div className={`${styles.kicker} ${variantClass}`}>{text}</div>;
}
