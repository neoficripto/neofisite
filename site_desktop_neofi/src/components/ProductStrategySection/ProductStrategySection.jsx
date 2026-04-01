import styles from './ProductStrategySection.module.css';
import { motion, useReducedMotion } from 'framer-motion';

export default function ProductStrategySection({
  kicker,
  title,
  subtitle,
  cards,
  footerText,
  footerAccent,
  ctaText,
  ctaHref,
  ctaSubtext,
}) {
  const shouldReduceMotion = useReducedMotion();
  const MotionDiv = motion.div;
  const MotionP = motion.p;

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
  };

  const item = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 140, damping: 18 } },
  };

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <MotionDiv
          className={styles.header}
          variants={container}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.35 }}
        >
          {kicker ? <div className={styles.kicker}>{kicker}</div> : null}
          <motion.h2 className={styles.title} variants={item}>
            {title}
          </motion.h2>
          <MotionP className={styles.subtitle} variants={item}>
            {subtitle}
          </MotionP>
        </MotionDiv>

        <MotionDiv
          className={styles.cards}
          variants={container}
          initial={shouldReduceMotion ? false : 'hidden'}
          whileInView={shouldReduceMotion ? undefined : 'visible'}
          viewport={{ once: true, amount: 0.25 }}
        >
          {cards.map((card, idx) => {
            const Icon = card.Icon;
            const connectorClass = idx < cards.length - 1 ? styles.cardConnector : '';
            const iconSize = typeof card.iconSize === 'number' ? card.iconSize : undefined;
            const iconWrapSize = typeof card.iconWrapSize === 'number' ? card.iconWrapSize : undefined;
            const iconStyle = card.iconStyle && typeof card.iconStyle === 'object' ? card.iconStyle : undefined;
            const iconWrapStyle = card.iconWrapStyle && typeof card.iconWrapStyle === 'object' ? card.iconWrapStyle : undefined;
            return (
              <MotionDiv key={card.number} className={`${styles.card} ${connectorClass}`} variants={item}>
                <div className={styles.cardTop}>
                  <div
                    className={styles.iconWrap}
                    style={
                      iconWrapSize || iconWrapStyle
                        ? {
                            ...(iconWrapSize ? { width: iconWrapSize, height: iconWrapSize, borderRadius: iconWrapSize / 2 } : null),
                            ...(iconWrapStyle || null),
                          }
                        : undefined
                    }
                  >
                    <Icon
                      className={styles.icon}
                      style={
                        iconSize || iconStyle
                          ? {
                              ...(iconSize ? { width: iconSize, height: iconSize } : null),
                              ...(iconStyle || null),
                            }
                          : undefined
                      }
                    />
                  </div>
                  <div className={styles.bigNumber}>{card.number}</div>
                </div>

                <div className={styles.cardBody}>
                  {card.tag ? <div className={styles.cardTag}>{card.tag}</div> : null}
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                  {card.lines.map((text) => (
                    <p key={text} className={styles.cardText}>
                      {text}
                    </p>
                  ))}
                </div>
              </MotionDiv>
            );
          })}
        </MotionDiv>

        {footerText ? (
          <MotionP
            className={styles.footerLine}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ type: 'spring', stiffness: 140, damping: 18 }}
          >
            {footerText}
            {footerAccent ? <span className={styles.footerLineAccent}> {footerAccent}</span> : null}
          </MotionP>
        ) : null}

        {ctaHref && ctaText ? (
          <MotionDiv
            className={styles.actions}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 14 }}
            whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ type: 'spring', stiffness: 140, damping: 18 }}
          >
            <a className={styles.ctaButton} href={ctaHref} target="_blank" rel="noopener noreferrer">
              {ctaText}
            </a>
            {ctaSubtext ? <div className={styles.ctaSubtext}>{ctaSubtext}</div> : null}
          </MotionDiv>
        ) : null}
      </div>
    </section>
  );
}
