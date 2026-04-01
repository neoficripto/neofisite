import styles from './InfiniteScrollBackground.module.css';

export default function InfiniteScrollBackground({
  image,
  tileSize = 720,
  speedSeconds = 26,
  opacity = 0.55
}) {
  return (
    <div
      className={styles.root}
      style={{
        '--bg-image': `url(${image})`,
        '--tile-size': `${tileSize}px`,
        '--speed': `${speedSeconds}s`,
        '--opacity': opacity
      }}
      aria-hidden="true"
    >
      <div className={styles.layerA} />
      <div className={styles.layerB} />
      <div className={styles.vignette} />
    </div>
  );
}

