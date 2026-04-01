import HeaderButton from "./HeaderButton";
import styles from "./ButtonContainer.module.css";
import { Link } from 'react-router-dom';

export default function ButtonContainer({ variant, onNavigate }) {
  const isVertical = variant === 'vertical';
  const className = [styles.buttons, isVertical ? styles.vertical : null].filter(Boolean).join(' ');
  const handleClick = () => {
    onNavigate?.();
  };
  
  return (
    <div className={className}>
      <Link className={styles.link} to="/neoboost" onClick={handleClick}>
      <HeaderButton texto="NeoBoost"></HeaderButton>
      </Link>
      <Link className={styles.link} to="/neoline" onClick={handleClick}>
      <HeaderButton texto="NeoLine"></HeaderButton>
      </Link>
      <Link className={styles.link} to="/neoyield" onClick={handleClick}>
      <HeaderButton texto="NeoYield"></HeaderButton>
      </Link>
      <Link className={styles.link} to="/contato" onClick={handleClick}>
      <HeaderButton texto="Contato"></HeaderButton>
      </Link>
    </div>
  );
}
