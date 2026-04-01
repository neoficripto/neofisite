import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import styles from './NeoBoost.module.css';

import CardIntrodutorio from "../components/CardIntrodutorio/CardIntrodutorio";
import imagemIntroBoost from "../assets/NeoBoost/imagemIntroBoost.png";
import neoBoostCardImage from "../assets/Home/NeoCommunityLogo2D.png";
import ProductHeroCard from "../components/ProductHeroCard/ProductHeroCard";
import ProductKicker from "../components/ProductKicker/ProductKicker";

import NeoBoostStrategy from "../components/NeoBoostStrategy/NeoBoostStrategy";
import Footer from "../components/Footer/Footer";

import BeneficiosNeoboost from "../components/BeneficiosNeoboost/BeneficiosNeoboost";

export function NeoBoost() {
    const shouldReduceMotion = useReducedMotion();
    const MotionDiv = motion.div;
    const sectionVariants = {
        hidden: { opacity: 0, y: 24 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } },
    };

    useEffect(() => {
        document.body.classList.add("background-class");

        return () => {
            document.body.classList.remove("background-class");
        };
    }, []);

    return (
        <>
            <MotionDiv
                variants={sectionVariants}
                initial={shouldReduceMotion ? false : "hidden"}
                animate={shouldReduceMotion ? undefined : "visible"}
            >
                <CardIntrodutorio
                    pathImg={imagemIntroBoost}
                    logoProduto={<ProductKicker text="NEOBOOST" variant="hero" />}
                    textoHeader={<h2 style={{ margin: 0 }}>Estratégia de acumulação com crédito controlado e gestão ativa.</h2>}
                    rightContent={
                        <ProductHeroCard
                            name="NeoBoost"
                            description="Uma estratégia estruturada sobre infraestrutura financeira em blockchain."
                            image={neoBoostCardImage}
                        />
                    }
                >
                    <p className={styles.introText}>
                        O NeoBoost organiza uma estrutura onde o capital trabalha com mais eficiência: usamos crédito de forma conservadora para ampliar posição em ativos líquidos, com regras de controle e rotina de acompanhamento.
                    </p>
                    <p className={styles.introText}>
                        A diferença não está em “operar mais”, e sim em operar com critérios: limites definidos, ajustes quando o cenário muda e prioridade total em evitar eventos de estresse. A gestão atua para manter a operação dentro do que foi combinado, sem atalhos.
                    </p>
                    <p className={styles.introText}>
                        Você acompanha posição, movimentos e parâmetros principais de risco em uma visão objetiva com trilha verificável do que foi executado.
                    </p>
                </CardIntrodutorio>
            </MotionDiv>

            <NeoBoostStrategy />
            <BeneficiosNeoboost />

            <MotionDiv
                variants={sectionVariants}
                initial={shouldReduceMotion ? false : "hidden"}
                whileInView={shouldReduceMotion ? undefined : "visible"}
                viewport={{ once: true, amount: 0.2 }}
            >
                <Footer />
            </MotionDiv>
        </>
    )
}
