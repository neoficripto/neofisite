import styles from './ProductHeroCard.module.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export default function ProductHeroCard({ name, description, image, imageAlt, style }) {
  return (
    <Card
      className={styles.card}
      style={{
        borderColor: 'rgba(var(--color-brand-rgb), 0.35)',
        boxShadow: 'none',
        backdropFilter: 'none',
        ...(style || {}),
      }}
    >
      <div className={styles.imageWrap}>
        <img className={styles.image} src={image} alt={imageAlt || name} />
      </div>
      <CardHeader className={styles.header}>
        <CardTitle className={styles.title}>{name}</CardTitle>
      </CardHeader>
      <CardContent className={styles.content}>
        <CardDescription className={styles.description}>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
