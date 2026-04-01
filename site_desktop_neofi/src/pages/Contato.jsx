import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, MessageCircle, Clock, ArrowRight } from 'lucide-react';
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from '../lib/whatsapp';
import ProductKicker from '../components/ProductKicker/ProductKicker';
import Footer from '../components/Footer/Footer';
import styles from './Contato.module.css';

export function Contato() {
  const shouldReduceMotion = useReducedMotion();
  const MotionDiv = motion.div;
  const sectionVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } },
  };

  useEffect(() => {
    document.body.classList.add('background-class');

    return () => {
      document.body.classList.remove('background-class');
    };
  }, []);

  const whatsAppUrl = buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE);

  return (
    <>
      <MotionDiv variants={sectionVariants} initial={shouldReduceMotion ? false : 'hidden'} animate={shouldReduceMotion ? undefined : 'visible'}>
        <section className={styles.hero}>
          <div className={styles.inner}>
            <div className={styles.heroHeader}>
              <ProductKicker text="CONTATO" variant="hero" />
              <h2 className={styles.title}>Fale com um especialista da NeoFi</h2>
              <p className={styles.subtitle}>
                Tire dúvidas, entenda como funciona a gestão e receba uma recomendação do produto mais adequado ao seu momento.
              </p>
            </div>

            <div className={styles.heroActions}>
              <a className={styles.primaryCta} href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
                <MessageCircle size={18} />
                WhatsApp
                <ArrowRight size={18} />
              </a>
              <a className={styles.secondaryCta} href="mailto:contato@neofi.capital">
                <Mail size={18} />
                contato@neofi.capital
              </a>
            </div>
          </div>
        </section>
      </MotionDiv>

      <MotionDiv
        variants={sectionVariants}
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView={shouldReduceMotion ? undefined : 'visible'}
        viewport={{ once: true, amount: 0.25 }}
      >
        <section className={styles.cardsSection}>
          <div className={styles.inner}>
            <div className={styles.cards}>
              <div className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.iconWrap}>
                    <MessageCircle className={styles.icon} />
                  </div>
                </div>
                <h3 className={styles.cardTitle}>Atendimento por WhatsApp</h3>
                <p className={styles.cardText}>
                  Canal mais rápido para iniciar. Envie sua dúvida e receba direcionamento.
                </p>
                <a className={styles.cardLink} href={whatsAppUrl} target="_blank" rel="noopener noreferrer">
                  Iniciar conversa <ArrowRight size={16} />
                </a>
              </div>

              <div className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.iconWrap}>
                    <Mail className={styles.icon} />
                  </div>
                </div>
                <h3 className={styles.cardTitle}>E-mail</h3>
                <p className={styles.cardText}>
                  Para solicitações mais detalhadas ou para enviar informações complementares.
                </p>
                <a className={styles.cardLink} href="mailto:contato@neofi.capital">
                  Enviar e-mail <ArrowRight size={16} />
                </a>
              </div>

              <div className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.iconWrap}>
                    <Clock className={styles.icon} />
                  </div>
                </div>
                <h3 className={styles.cardTitle}>Como funciona</h3>
                <p className={styles.cardText}>
                  Uma call rápida para definir objetivo, parâmetros e entender riscos, prazos e custos.
                </p>
                <div className={styles.cardMeta}>Atendimento sob demanda</div>
              </div>
            </div>
          </div>
        </section>
      </MotionDiv>

      <MotionDiv
        variants={sectionVariants}
        initial={shouldReduceMotion ? false : 'hidden'}
        whileInView={shouldReduceMotion ? undefined : 'visible'}
        viewport={{ once: true, amount: 0.2 }}
      >
        <Footer />
      </MotionDiv>
    </>
  );
}

