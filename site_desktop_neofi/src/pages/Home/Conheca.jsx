import styles from './Conheca.module.css';

import { TextShimmer } from '../../components/TextShimmer/TextShimmer';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import logoNeofi from '../../assets/Header/logo-neofi.svg';
import { Link } from 'react-router-dom';

const NeoFiLogo = lazy(() => import('../../components/LogoInterativo/LogoInterativo'));


export default function Conheca(){
    const shouldReduceMotion = useReducedMotion();
    const MotionDiv = motion.div;
    const introRef = useRef(null);
    const [showScrollHint, setShowScrollHint] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        if (!introRef.current) return;

        const observer = new IntersectionObserver(
            ([entry]) => setShowScrollHint(!entry.isIntersecting),
            { threshold: 0.2 }
        );

        observer.observe(introRef.current);

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const media = window.matchMedia('(max-width: 899px)');
        const update = () => setIsMobile(media.matches);
        update();
        media.addEventListener?.('change', update);
        return () => media.removeEventListener?.('change', update);
    }, []);
     
    return (
<>
        <div className={styles.outerDiv}>
            <div className={styles.backgroundSticky} aria-hidden="true">
                <div className={styles.backgroundLogoWrap}>
                    <div className={styles.backgroundLogoContainer}>
                        <Suspense
                            fallback={
                                <div className={styles.fallbackLogoWrap}>
                                    <img className={styles.fallbackLogo} src={logoNeofi} alt="NeoFi" />
                                </div>
                            }
                        >
                            <NeoFiLogo
                                dpr={isMobile ? 1 : [1, 1.5]}
                                particleCount={isMobile ? 1600 : 5000}
                                particleRotationSpeed={shouldReduceMotion ? 0 : 0.005}
                                autoRotateSpeed={shouldReduceMotion ? 0 : 0.5}
                                modelScale={isMobile ? 1.65 : 2.0}
                                enableControls={!shouldReduceMotion}
                            />
                        </Suspense>
                    </div>
                </div>
                <div className={styles.heroOverlay} />
                {showScrollHint ? (
                    <button
                        type="button"
                        className={styles.scrollHintButton}
                        onClick={() => introRef.current?.scrollIntoView({ behavior: shouldReduceMotion ? 'auto' : 'smooth', block: 'start' })}
                        aria-label="Role para ver mais"
                    >
                        <ChevronDown size={22} />
                    </button>
                ) : null}
            </div>
        <div className={styles.contentWrapper}>
            <MotionDiv
                initial={shouldReduceMotion ? undefined : { opacity: 0, y: 24 }}
                whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.35 }}
                transition={shouldReduceMotion ? undefined : { type: 'spring', stiffness: 120, damping: 18 }}
                className={styles.contentInner}
                ref={introRef}
            >
                <TextShimmer className={styles.header}>NeoFi Cripto</TextShimmer>
                <h2 className={styles.description}>Um novo jeito de gerir seu portifólio</h2>
                <p className={styles.largeText}>Na NeoFi, oferecemos soluções financeiras baseadas em empréstimo com criptoativos. Conte com a gestão profissional do nosso time, do início ao fim, para fazer seu patrimônio crescer.</p>
                <div className={styles.buttonsContainer}>
                    <Link className={styles.contactButton} to="/contato">Fale com a NeoFi</Link>
                </div>
            </MotionDiv>
        </div>
        </div>
</>
    )
}
