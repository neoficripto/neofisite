import Conheca from "./Conheca";
import TresSolucoes from "./TresSolucoes";
import ProductDescription from "./ProductDescription";
import SobreNos from "./SobreNos";
import ProductSection from "./ProductSection";
import Footer from "../../components/Footer/Footer";

import { useEffect } from "react";

import neoCommunityBackground from '../../assets/Home/neocommunity_model_background.png';
import neoResearchBackground from '../../assets/Home/neoresearch_model_background.png';
import neoToolsBackground from '../../assets/Home/neotools_model_background.png';
import { assetUrl } from '../../lib/assetUrl';

import styles from './Home.module.css';

export default function Home( {session} ) {

    useEffect(() => {
        document.body.classList.add("background-class");

        return () => {
            document.body.classList.remove("background-class");
        };
    }, []);

    const products = [
        { id: 1, name: 'NeoCommunity', model: assetUrl('NeoBoostLogo.glb'), background: neoCommunityBackground, price: 100},
        { id: 2, name: 'NeoResearch', model: assetUrl('NeoYieldLogo.glb'), background: neoResearchBackground, price: 100},
        { id: 3, name: 'NeoTools', model: assetUrl('NeoLineLogo.glb'), background: neoToolsBackground, price: 100 }
    ];

    return (
        <div>
            <Conheca />
            {/* <TresSolucoes /> */}
            <ProductSection />
            <ProductDescription
                isReversed={false}
                product={products[0]}
                cryptoCheckoutLink="/neoboost"
                yampiCheckoutLink={"https://neofi-capital.pay.yampi.com.br/r/ET6D1JJLRV"}
                userEmail={session?.user?.email}>
                <h3 className={`${styles.prodDescription} ${styles.prodDescriptionBoost}`}>NEOBOOST</h3>
                <h2 className={styles.prodHeader}>Investimento em blockchain com execução profissional.</h2>
                <p className={styles.columnText}>
                    O NeoBoost é a frente de investimento da NeoFi para quem quer ir além da exposição passiva e investir com método, regras e eficiência de capital.
                    <br /><br />
                    A NeoFi estrutura e opera posições com tecnologia e ferramentas on chain, combinando leitura de cenário, disciplina de risco e execução eficiente para buscar melhor uso do capital em diferentes condições de mercado.
                    <br /><br />
                    Para quem já investe e quer um nível mais técnico de operação, com rotina clara, parâmetros definidos e acompanhamento contínuo.
                    <br /><br />
                    Cripto com gestão, transparência e padrão profissional.
                </p>
            </ProductDescription>
            <ProductDescription
                isReversed={true}
                product={products[2]}
                cryptoCheckoutLink="/neoline"
                yampiCheckoutLink={"https://neofi-capital.pay.yampi.com.br/r/ET6D1JJLRV"}
                userEmail={session?.user?.email}>
                <h3 className={styles.prodDescription}>NEOLINE</h3>
                <h2 className={styles.prodHeader}>Gestão de crédito com garantia em Bitcoin, via infraestrutura blockchain.</h2>
                <p className={styles.columnText}>
                    O NeoLine é o serviço de gestão da NeoFi para estruturar e administrar empréstimos colateralizados em BTC, com foco em oferecer  credito sem venda do ativo e com regras claras de risco.
                    <br /><br />
                    A NeoFi opera a estratégia em blockchain com parâmetros conservadores, monitoramento contínuo e rotinas de controle para manter a operação dentro do que foi definido, com trilha de evidências e prestação de contas verificável.
                    <br /><br />
                    Indicado para pessoas e empresas que querem acessar até 35% de liquidez sobre o BTC dado em garantia.
                </p>
            </ProductDescription>
            <ProductDescription
                isReversed={false}
                product={products[1]}
                cryptoCheckoutLink="/neoyield"
                yampiCheckoutLink={"https://neofi-capital.pay.yampi.com.br/r/ET6D1JJLRV"}
                userEmail={session?.user?.email}>
                <h3 className={styles.prodDescription}>NEOYIELD</h3>
                <h2 className={styles.prodHeader}>Renda em dólar com regras, gestão e transparência.</h2>
                <p className={styles.columnText}>
                    O NeoYield é o produto de investimento da NeoFi para quem busca exposição ao dólar e uma estratégia mais estável, com foco em consistência e menor volatilidade dentro do universo cripto.
                    <br /><br />
                    A NeoFi estrutura operações em DeFi com parâmetros claros de risco, acompanhamento contínuo e rotinas de controle para manter a estratégia dentro do que foi definido, reduzindo exposição a decisões improvisadas.
                    <br /><br />
                    Indicado para quem quer construir posição em dólar com disciplina e previsibilidade operacional, sem depender de acertos de timing em BTC ou ETH.
                </p>
            </ProductDescription>
            <SobreNos>
                <h3 className={styles.prodDescription}>Sobre Nós</h3>
                <h2 className={styles.prodHeader}>Inovação que conecta<br />você ao futuro financeiro</h2>
                <p className={styles.columnText}>A NeoFi Capital une tecnologia e estratégia para destravar liquidez e ampliar investimentos com segurança. Ajudamos você a transformar seus criptoativos em crédito de baixo custo, sem vender patrimônio, mantendo a exposição à valorização, com processos simples e uma equipe experiente em finanças e DeFi.<br /><br />
                    Somos uma empresa especializada em estruturar crédito colateralizado em cripto e operar em DeFi com padrão profissional. Unimos metodologia própria, smart contracts e execução assistida para que você entenda limites, custos e prazos antes de decidir.Do diagnóstico ao acompanhamento contínuo, entregamos transparência, governança e suporte humano, conectando o presente ao futuro do seu patrimônio com previsibilidade e confiança.</p>
            </SobreNos>
            <Footer />
        </div>
    )
}
