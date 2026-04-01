import CardBeneficios from "./CardBeneficios";
import { motion, useReducedMotion } from "framer-motion";
import styles from "./BeneficiosNeoboost.module.css";

const cardArray = [
  {
    id: 1,
    header: (
      <h2>
        Eficiência de capital,
        <br />
        com regras
      </h2>
    ),
    description: (
      <p>
        Estrutura que busca melhorar o uso do capital sem abrir mão de limites operacionais definidos desde o início.
      </p>
    ),
  },
  {
    id: 2,
    header: (
      <h2>
        Gestão de risco
        <br />
        no centro
      </h2>
    ),
    description: (
      <p>
        A operação roda com parâmetros, margens de segurança, gatilhos e respostas por cenário.
      </p>
    ),
  },
  {
    id: 3,
    header: (
      <h2>
        Transparência operacional
        <br />
        em tempo real
      </h2>
    ),
    description: (
      <p>
        Visão clara de posição, eventos, movimentações e alertas, com histórico e contexto do que foi feito e por quê.
      </p>
    ),
  },
  {
    id: 4,
    header: (
      <h2>
        Execução profissional,
        <br />
        sem improviso
      </h2>
    ),
    description: (
      <p>
        Rotina padronizada de execução e ajuste de exposição com disciplina, reduzindo decisões reativas e erro operacional.
      </p>
    ),
  },
  {
    id: 5,
    header: (
      <h2>
        Crédito como ferramenta
      </h2>
    ),
    description: (
      <p>
        Uso de crédito com controle de exposição, dentro de uma política de limites.
      </p>
    ),
  },
  {
    id: 6,
    header: (
      <h2>
        Resiliência em
        <br />
        diferentes cenários
      </h2>
    ),
    description: (
      <p>
        Estrutura desenhada para agir em mercado adverso com modos e ações predefinidas.
      </p>
    ),
  },
  {
    id: 7,
    header: (
      <h2>
        Prestação de contas
        <br />
        contínua
      </h2>
    ),
    description: (
      <p>
        Acompanhamento com dados e relatórios, focado em clareza do processo e rastreabilidade das decisões.
      </p>
    ),
  },
  {
    id: 8,
    header: (
      <h2>
        Estrutura para
        <br />
        perfis exigentes
      </h2>
    ),
    description: (
      <p>
        Uma estrutura desenhada para quem prioriza método, acompanhamento e consistência operacional.
      </p>
    ),
  },
];

export default function BeneficiosNeoboost() {
  const shouldReduceMotion = useReducedMotion();
  const MotionDiv = motion.div;

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };

  const item = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 140, damping: 18 } },
  };

  return (
    <MotionDiv
      className={styles.mainContainer}
      variants={container}
      initial={shouldReduceMotion ? false : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.25 }}
    >
      <motion.h2 className={styles.header} variants={item}>
        Principais benefícios<br />da solução NeoBoost
      </motion.h2>
      <MotionDiv className={styles.gridContainer} variants={container}>
        {cardArray.map((atual) => (
          <MotionDiv key={atual.id} variants={item}>
            <CardBeneficios header={atual.header} description={atual.description} />
          </MotionDiv>
        ))}
      </MotionDiv>
    </MotionDiv>
  );
}
