import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductKicker from '../components/ProductKicker/ProductKicker';
import Footer from '../components/Footer/Footer';
import styles from './NotFound.module.css';

export function NotFound() {
  useEffect(() => {
    document.body.classList.add('background-class');

    return () => {
      document.body.classList.remove('background-class');
    };
  }, []);

  return (
    <>
      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.card}>
            <ProductKicker text="404" variant="hero" />
            <h2 className={styles.title}>Página não encontrada</h2>
            <p className={styles.subtitle}>O link pode estar incorreto ou a página foi movida.</p>
            <div className={styles.actions}>
              <Link className={styles.primaryCta} to="/">
                Voltar para o início <ArrowRight size={18} />
              </Link>
              <Link className={styles.secondaryCta} to="/contato">
                Falar com a NeoFi <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

