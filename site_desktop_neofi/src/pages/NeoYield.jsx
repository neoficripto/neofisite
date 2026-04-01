import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

import CardIntrodutorio from '../components/CardIntrodutorio/CardIntrodutorio';
import ProductHeroCard from '../components/ProductHeroCard/ProductHeroCard';
import ProductKicker from '../components/ProductKicker/ProductKicker';
import ProductStrategySection from '../components/ProductStrategySection/ProductStrategySection';
import Footer from '../components/Footer/Footer';

import neoYieldCardImage from '../assets/Home/NeoFiToolsLogo2D.png';
import neoYieldIntroImage from '../assets/Home/neoyield-sec-image.png';
import usdcLogo from '../assets/Bouncing/usdc.png';
import usdtLogo from '../assets/Bouncing/usdt.png';
import daiLogo from '../assets/Bouncing/dai.png';

import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from '../lib/whatsapp';
import { BarChart3, DollarSign, Layers, SlidersHorizontal } from 'lucide-react';

function TokenIconUSDC(props) {
  const { className, style } = props || {};
  return <img src={usdcLogo} alt="USDC" className={className} style={style} />;
}

function TokenIconUSDT(props) {
  const { className, style } = props || {};
  return <img src={usdtLogo} alt="USDT" className={className} style={style} />;
}

function TokenIconDAI(props) {
  const { className, style } = props || {};
  return <img src={daiLogo} alt="DAI" className={className} style={style} />;
}

const ghoLogoDataUri =
  'data:image/svg+xml;base64,' +
  'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBp' +
  'ZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDov' +
  'L3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMDAgMzAwIj4K' +
  'ICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBm' +
  'aWxsOiAjMjhkMzU4OwogICAgICB9CgogICAgICAuY2xzLTEsIC5jbHMtMiB7' +
  'CiAgICAgICAgc3Ryb2tlLXdpZHRoOiAwcHg7CiAgICAgIH0KCiAgICAgIC5j' +
  'bHMtMiB7CiAgICAgICAgZmlsbDogI2ZmZjsKICAgICAgfQogICAgPC9zdHls' +
  'ZT4KICA8L2RlZnM+CiAgPGNpcmNsZSBjbGFzcz0iY2xzLTEiIGN4PSIxNTAi' +
  'IGN5PSIxNTAiIHI9IjE1MCIvPgogIDxwYXRoIGNsYXNzPSJjbHMtMiIgZD0i' +
  'TTk0Ljg0LDEzMC40MmMwLDEzLjQ5LDEwLjkzLDI0LjQyLDI0LjQyLDI0LjQy' +
  'czI0LjQyLTEwLjkzLDI0LjQyLTI0LjQyLTEwLjkzLTI0LjQyLTI0LjQyLTI0' +
  'LjQyLTI0LjQyLDEwLjkzLTI0LjQyLDI0LjQyWiIvPgogIDxwYXRoIGNsYXNz' +
  'PSJjbHMtMiIgZD0iTTE1Ni4zOSwxMzAuNDJjMCwxMy40OSwxMC45MywyNC40' +
  'MiwyNC40MiwyNC40MnMyNC40Mi0xMC45MywyNC40Mi0yNC40Mi0xMC45My0y' +
  'NC40Mi0yNC40Mi0yNC40Mi0yNC40MiwxMC45My0yNC40MiwyNC40MloiLz4K' +
  'ICA8cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0yNjUuNzMsMjQ1LjQ0di04My4y' +
  'M2gtMzEuNGMtNi4zNSw0MS45OC00MC45OCw3Mi41Ni04NC4zMyw3Mi41Ni00' +
  'Ny45LDAtODYuMTctMzcuMzMtODYuMTctODYuMTRzMzguMjctODYuODQsODYu' +
  'MTgtODYuODRjNDEuNzYsMCw3Ni4xOCwyOC45MSw4NC4zNCw2OC42NWgzMS40' +
  'Yy04LjU5LTU2LjUtNTcuODktOTkuNzctMTE1Ljc1LTk5Ljc3LTYzLjkzLDAt' +
  'MTE1Ljc1LDUyLjgyLTExNS43NSwxMTcuOTVzNTEuODIsMTE3Ljk1LDExNS43' +
  'NSwxMTcuOTVjNDAuMjMsMCw2OC4yOC0xOC42Myw4NS40OS00Ny45Ny40MS4x' +
  'Mi44My4yMSwxLjIyLjMzdjUzLjQ4YzEwLjgzLTcuNjgsMjAuNTktMTYuNzYs' +
  'MjkuMDItMjYuOThaIi8+Cjwvc3ZnPg==';

function TokenIconGHO(props) {
  const { className, style } = props || {};
  return <img src={ghoLogoDataUri} alt="GHO" className={className} style={style} />;
}

export function NeoYield() {
  const shouldReduceMotion = useReducedMotion();
  const MotionDiv = motion.div;
  const sectionVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } },
  };

  const strategyCards = [
    {
      number: '01',
      lines: [
        'Entrada e estrutura em dólar com foco em estabilidade.',
      ],
      tag: 'ALOCAÇÃO',
      title: 'Dólar como base',
      Icon: DollarSign,
    },
    {
      number: '02',
      lines: [
        'Limites, liquidez e disciplina definidos desde o início.',
      ],
      tag: 'REGRAS',
      title: 'Parâmetros claros',
      Icon: SlidersHorizontal,
    },
    {
      number: '03',
      lines: [
        'Operação em DeFi com rotinas de controle e monitoramento.',
      ],
      tag: 'EXECUÇÃO',
      title: 'Execução com método',
      Icon: Layers,
    },
    {
      number: '04',
      lines: ['Registros, eventos e relatórios para acompanhar a estratégia.'],
      tag: 'RELATÓRIOS',
      title: 'Transparência contínua',
      Icon: BarChart3,
    },
  ];

  const stablecoinCards = [
    {
      number: '01',
      lines: ['Regulada e transparente'],
      tag: 'TOKEN',
      title: 'USDC',
      Icon: TokenIconUSDC,
      iconWrapSize: 64,
      iconWrapStyle: { background: 'transparent', border: 'none' },
      iconStyle: { width: 64, height: 64, borderRadius: 9999, objectFit: 'contain', display: 'block' },
    },
    {
      number: '02',
      lines: ['Liquidez global em dólar'],
      tag: 'TOKEN',
      title: 'USDT',
      Icon: TokenIconUSDT,
      iconWrapSize: 64,
      iconWrapStyle: { background: 'transparent', border: 'none' },
      iconStyle: { width: 64, height: 64, borderRadius: 9999, objectFit: 'contain', display: 'block' },
    },
    {
      number: '03',
      lines: ['Descentralizada e colateral'],
      tag: 'TOKEN',
      title: 'DAI',
      Icon: TokenIconDAI,
      iconWrapSize: 64,
      iconWrapStyle: { background: 'transparent', border: 'none' },
      iconStyle: { width: 64, height: 64, borderRadius: 9999, objectFit: 'contain', display: 'block' },
    },
    {
      number: '04',
      lines: ['Nativa da Aave, on-chain'],
      tag: 'TOKEN',
      title: 'GHO',
      Icon: TokenIconGHO,
      iconWrapSize: 64,
      iconWrapStyle: { background: 'transparent', border: 'none' },
      iconStyle: { width: 64, height: 64, borderRadius: 9999, objectFit: 'contain', display: 'block' },
    },
  ];

  useEffect(() => {
    document.body.classList.add('background-class');

    return () => {
      document.body.classList.remove('background-class');
    };
  }, []);

  return (
    <>
      <MotionDiv variants={sectionVariants} initial={shouldReduceMotion ? false : 'hidden'} animate={shouldReduceMotion ? undefined : 'visible'}>
        <CardIntrodutorio
          pathImg={neoYieldIntroImage}
          logoProduto={<ProductKicker text="NEOYIELD" variant="hero" />}
          textoHeader={<h2 style={{ margin: 0 }}>Renda em dólar com regras, gestão e transparência.</h2>}
          rightContent={<ProductHeroCard name="NeoYield" description="Uma estrutura em blockchain que transforma dólar em renda com mais eficiência." image={neoYieldCardImage} />}
        >
          <p>
            O NeoYield é o produto de investimento da NeoFi para quem busca exposição ao dólar e uma estratégia mais estável, com foco em consistência e menor volatilidade dentro do universo cripto.
          </p>
          <p>
            A NeoFi estrutura operações em DeFi com parâmetros claros de risco, acompanhamento contínuo e rotinas de controle para manter a estratégia dentro do que foi definido, reduzindo exposição a decisões improvisadas.
          </p>
          <p>
            Indicado para quem quer construir posição em dólar com disciplina e previsibilidade operacional.
          </p>
        </CardIntrodutorio>
      </MotionDiv>

      <ProductStrategySection
        title={
          <span>
            NeoYield em <span style={{ color: 'var(--color-brand)' }}>4 passos</span>
          </span>
        }
        subtitle="Renda em dólar com regras, gestão e transparência verificável."
        cards={strategyCards}
        footerText="Estabilidade como prioridade."
        footerAccent="Gestão como diferencial."
        ctaText="Falar com um especialista"
        ctaHref={buildWhatsAppUrl(`${DEFAULT_WHATSAPP_MESSAGE}\n\nTenho interesse em: NeoYield.`)}
        ctaSubtext="Entenda regras, prazos e riscos antes de alocar."
      />

      <ProductStrategySection
        title={
          <span>
            Tokens em <span style={{ color: 'var(--color-brand)' }}>dólar</span>
          </span>
        }
        subtitle="Stablecoins utilizadas pela NeoFi."
        cards={stablecoinCards}
      />

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
