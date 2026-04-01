import styles from "./Header.module.css";
import logo_neofi from "../../assets/Header/logo-neofi.svg";
import ButtonContainer from "./ButtonContainer";
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from "../../lib/supaBaseClient";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header({ session }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const loginUrl = "https://www.neoficrypto.app/auth/sign-in?after_auth_return_to=%2Fdashboard";

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  return (
    <div className={styles.headerMain}>
      <div className={styles.neofiLogo}>
        <Link to="/">
          <img src={logo_neofi} className={styles.logoImage} alt="NeoFi" />
        </Link>
      </div>
      <div className={styles.buttonDiv}>
        <ButtonContainer />
      </div>

      <div className={styles.authArea}>
        {!session ? (
          <a
            href={loginUrl}
            className={styles.loginLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <p className={styles.login}>Entrar</p>
          </a>
        ) : (
          <button onClick={handleLogout} className={styles.sairButton}>
            Sair
          </button>
        )}
      </div>

      <button
        type="button"
        className={styles.menuButton}
        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((prev) => !prev)}
      >
        {menuOpen ? <X size={22} /> : <Menu size={22} />}
      </button>

      {menuOpen ? (
        <div className={styles.mobileOverlay} onClick={() => setMenuOpen(false)} role="presentation">
          <div className={styles.mobilePanel} onClick={(e) => e.stopPropagation()} role="presentation">
            <div className={styles.mobileTopRow}>
              <img src={logo_neofi} className={styles.mobileLogo} alt="NeoFi" />
              <button
                type="button"
                className={styles.menuButton}
                aria-label="Fechar menu"
                onClick={() => setMenuOpen(false)}
              >
                <X size={22} />
              </button>
            </div>

            <ButtonContainer variant="vertical" onNavigate={() => setMenuOpen(false)} />

            <div className={styles.mobileActions}>
              {!session ? (
                <a
                  className={`${styles.mobileCta} ${styles.mobileCtaPrimary}`}
                  href={loginUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Entrar
                </a>
              ) : (
                <button
                  type="button"
                  className={`${styles.mobileCta} ${styles.mobileCtaPrimary}`}
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                >
                  Sair
                </button>
              )}
              <a className={`${styles.mobileCta} ${styles.mobileCtaSecondary}`} href="mailto:contato@neofi.capital">
                contato@neofi.capital
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
