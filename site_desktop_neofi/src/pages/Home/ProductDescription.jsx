import { Children, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import ProductCard from '../../components/SpinningProductCard/ProductCard';
import styles from './ProductDescription.module.css';
import MPBrickWrapper from '../../PagamentoMercadoPago';
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from '../../lib/whatsapp';

export default function ProductDescription({ 
    isReversed, 
    product, 
    cryptoCheckoutLink,
    children, 
    userEmail // We accept the email prop here
}) { 
    const outerClass = `${styles.container} ${isReversed ? styles.reversed : ''}`;

    const [selectedProduct, setSelectedProduct] = useState(null);
    const shouldReduceMotion = useReducedMotion();
    const MotionDiv = motion.div;
    const MotionA = motion.a;
    const MotionLink = motion(Link);

    const childBlocks = useMemo(() => Children.toArray(children), [children]);

    const containerVariants = {
        hidden: { opacity: 0, y: 16 },
        visible: {
            opacity: 1,
            y: 0,
            transition: shouldReduceMotion
                ? { duration: 0 }
                : { type: 'spring', stiffness: 120, damping: 18, staggerChildren: 0.08 },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: shouldReduceMotion
            ? { opacity: 1, y: 0 }
            : { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 140, damping: 16 } },
    };

    // const handleBuyClick = () => {
    //     // 1. Security Check: Are they logged in?
    //     if (!userEmail) {
    //         alert("Você precisa fazer login para continuar a compra.");
    //         navigate('/login'); // Redirect to login page
    //         return;
    //     }

    //     // 2. If logged in, open the payment modal
    //     setSelectedProduct(product);
    // };

    return (
        <MotionDiv
            className={outerClass}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.35 }}
            variants={containerVariants}
        >
            <MotionDiv className={styles.leftColumn} variants={itemVariants}>
                <MotionDiv variants={containerVariants}>
                    {childBlocks.map((node, idx) => (
                        <MotionDiv key={idx} variants={itemVariants}>
                            {node}
                        </MotionDiv>
                    ))}
                </MotionDiv>
                <MotionDiv className={styles.buttonsContainer} variants={itemVariants}>
                    <MotionA 
                        href={buildWhatsAppUrl(DEFAULT_WHATSAPP_MESSAGE)}
                        className={`${styles.baseButton} ${styles.infoButton}`} 
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
                        whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                    >
                        Falar com especialista
                    </MotionA>
                    
                    {cryptoCheckoutLink ? (
                        typeof cryptoCheckoutLink === 'string' && /^https?:\/\//i.test(cryptoCheckoutLink) ? (
                            <MotionA 
                                href={cryptoCheckoutLink} 
                                className={`${styles.baseButton} ${styles.contactButton}`}
                                target="_blank" 
                                rel="noopener noreferrer"
                                whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
                                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                            >
                                Saiba mais
                            </MotionA>
                        ) : (
                            <MotionLink
                                to={cryptoCheckoutLink}
                                className={`${styles.baseButton} ${styles.contactButton}`}
                                whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
                                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                            >
                                Saiba mais
                            </MotionLink>
                        )
                    ) : null}
                </MotionDiv>
            </MotionDiv>

            <MotionDiv
                className={styles.rightColumn}
                variants={itemVariants}
                whileHover={
                    shouldReduceMotion
                        ? undefined
                        : {
                              y: -6,
                              scale: 1.01,
                              boxShadow: '0 18px 45px rgba(0,0,0,0.30)',
                          }
                }
                transition={shouldReduceMotion ? undefined : { type: 'spring', stiffness: 160, damping: 18 }}
            >
                <ProductCard
                    key={product.id}
                    background={product.background}
                    modelPath={product.model}
                />
            </MotionDiv>

            {/* PAYMENT MODAL */}
            {selectedProduct && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        
                        <button 
                            className={styles.closeButton} 
                            onClick={() => setSelectedProduct(null)}
                        >
                            ✕
                        </button>
                        
                        <h3 className={styles.modalTitle}>Finalizar Compra</h3>
                        
                        {/* 3. Pass the email to the wrapper so the payment is linked */}
                        <MPBrickWrapper 
                            product={selectedProduct} 
                            userEmail={userEmail}
                            onClose={() => setSelectedProduct(null)}
                        />
                        
                    </div>
                </div>
            )}
        </MotionDiv>
    )
}
