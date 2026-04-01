import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";

import CardIntrodutorio from "../components/CardIntrodutorio/CardIntrodutorio";
import imagemIntroLine from "../assets/NeoLine/imagemIntroLine.png";
import neoLineCardImage from "../assets/Home/NeoFiResearchProLogo2D.png";

import ProductKicker from "../components/ProductKicker/ProductKicker";
import ProductHeroCard from "../components/ProductHeroCard/ProductHeroCard";
import ProductStrategySection from "../components/ProductStrategySection/ProductStrategySection";
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from "../lib/whatsapp";
import { ClipboardCheck, Link2, Lock, SlidersHorizontal } from "lucide-react";

import Footer from "../components/Footer/Footer";

import SimuladorEmprestimo from "../components/SimuladorEmprestimo/SimuladorEmprestimo";

export function NeoLine() {
  const shouldReduceMotion = useReducedMotion();
  const MotionDiv = motion.div;
  const sectionVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 18 } },
  };

  const strategyCards = [
    {
      number: "01",
      tag: "PARÂMETROS",
      title: "Defina limites e objetivo",
      lines: ["Valor, prazo e limites de risco antes de executar."],
      Icon: SlidersHorizontal,
    },
    {
      number: "02",
      tag: "FORMALIZAÇÃO",
      title: "Estrutura pronta",
      lines: ["Regras, responsabilidades e checklist de segurança."],
      Icon: ClipboardCheck,
    },
    {
      number: "03",
      tag: "EXECUÇÃO",
      title: "Execução com disciplina",
      lines: ["Operação em blockchain dentro dos parâmetros definidos."],
      Icon: Link2,
    },
    {
      number: "04",
      tag: "ENCERRAMENTO",
      title: "Quite e recupere a garantia",
      lines: ["Quitação organizada e saque do colateral conforme as regras."],
      Icon: Lock,
    },
  ];

  useEffect(() => {
    document.body.classList.add("background-class");

    return () => {
      document.body.classList.remove("background-class");
    };
  }, []);

  return (
    <>
    {/* <NeoFiLogo /> */}
      <MotionDiv variants={sectionVariants} initial={shouldReduceMotion ? false : "hidden"} animate={shouldReduceMotion ? undefined : "visible"}>
        <CardIntrodutorio
          pathImg={imagemIntroLine}
          logoProduto={<ProductKicker text="NEOLINE" variant="hero" />}
          textoHeader= {<h2 style={{margin: 0}}>Liquidez com Bitcoin como garantia, com regras claras e gestão da operação.</h2>}
          rightContent={
            <ProductHeroCard
              name="NeoLine"
              description="Crédito com Bitcoin como garantia, com regras claras e gestão da operação."
              image={neoLineCardImage}
            />
          }
        >
          <p>
            O NeoLine é o serviço da NeoFi para estruturar e administrar uma linha de liquidez colateralizada em BTC, para quem quer acessar capital sem vender o ativo e sem depender de decisões no impulso.
          </p>
          <p>
            A NeoFi organiza os parâmetros da operação e conduz as rotinas de acompanhamento, com foco em manter o uso de liquidez dentro do que foi definido no onboarding. Custos, taxas e condições são apresentados de forma transparente e podem variar conforme mercado, rede e estrutura escolhida.
          </p>
        </CardIntrodutorio>
      </MotionDiv>

      <ProductStrategySection
        kicker="COMO FUNCIONA"
        title={
          <span>
            NeoLine em <span style={{ color: 'var(--color-brand)' }}>4 passos</span>
          </span>
        }
        subtitle="Uma rotina de gestão com regras, monitoramento e trilha verificável."
        cards={strategyCards}
        footerText="Cripto como infraestrutura."
        footerAccent="Regras como proteção."
        ctaText="Falar com um especialista"
        ctaHref={buildWhatsAppUrl(`${DEFAULT_WHATSAPP_MESSAGE}\n\nTenho interesse em: NeoLine.`)}
        ctaSubtext="Defina parâmetros com a NeoFi em uma call rápida."
      />
      <SimuladorEmprestimo />
      <Footer />
    </>
  );
}
