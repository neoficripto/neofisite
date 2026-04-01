import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import logo from '../../assets/Header/logo-neofi.svg';
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from '../../lib/whatsapp';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.cta}>
        <div className={styles.ctaInner}>
          <div className={styles.ctaText}>
            <h3 className={styles.ctaTitle}>Pronto para operar com padrão profissional?</h3>
            <p className={styles.ctaDesc}>
              Fale com um especialista e entenda qual produto faz sentido para o seu momento.
            </p>
          </div>
          <div className={styles.ctaActions}>
            <a
              className={styles.ctaPrimary}
              href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Falar com especialista
            </a>
          </div>
        </div>
      </div>

      <div className={styles.inner}>
        <div className={styles.brand}>
          <img className={styles.logo} src={logo} alt="NeoFi" />
        </div>

        <div className={styles.columns}>
          <div className={styles.col}>
            <div className={styles.colTitle}>Produtos</div>
            <Link className={styles.link} to="/neoboost">
              NeoBoost
            </Link>
            <Link className={styles.link} to="/neoline">
              NeoLine
            </Link>
            <Link className={styles.link} to="/neoyield">
              NeoYield
            </Link>
          </div>

          <div className={styles.col}>
            <div className={styles.colTitle}>Empresa</div>
            <Link className={styles.link} to="/quem-somos">
              Quem somos
            </Link>
              <Link className={styles.link} to="/privacidade">
                Privacidade
              </Link>
              <Link className={styles.link} to="/termos">
                Termos
              </Link>
            <span className={styles.linkMuted}>Parceiros</span>
            <span className={styles.linkMuted}>Blog</span>
          </div>

          <div className={styles.col}>
            <div className={styles.colTitle}>Contato</div>
            <Link className={styles.link} to="/contato">
              Página de contato
            </Link>
            <a className={styles.link} href="mailto:contato@neofi.capital">
              contato@neofi.capital
            </a>
            <span className={styles.linkMuted}>Atendimento sob demanda</span>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <span className={styles.copy}>© {year} NeoFi Capital. Todos os direitos reservados.</span>
          <div className={styles.bottomLinks}>
            <Link className={styles.linkMuted} to="/privacidade">Privacidade</Link>
            <span className={styles.dot} />
            <Link className={styles.linkMuted} to="/termos">Termos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
