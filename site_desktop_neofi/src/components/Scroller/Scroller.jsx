import styles from './Scroller.module.css';
import CardAtivo from './CardAtivo';

import btcLogo from "../../assets/scrollerImages/btc.svg";
import ethLogo from "../../assets/scrollerImages/ethLogo.svg";
import daiLogo from "../../assets/scrollerImages/daiLogo.svg";
import goldTetLogo from "../../assets/scrollerImages/goldTetLogo.svg";
import uniLogo from "../../assets/scrollerImages/uniLogo.svg";
import usdtLogo from "../../assets/scrollerImages/usdtLogo.svg";
import wstethLogo from "../../assets/scrollerImages/wstethLogo.svg";
import chainlinkLogo from "../../assets/scrollerImages/chainlinkLogo.svg";

const cardArray = [
  {
    image: btcLogo,
    title: "Bitcoin(BTC)",
    description: "Principal reserva de valor digital global e descentralizada."
  },
  {
    image: ethLogo,
    title: "Ethereum(ETC)",
    description: "Plataforma líder para contratos inteligentes e aplicações descentralizadas."
  },
  {
    image: goldTetLogo,
    title: "Tether Gold(XAUT)",
    description: "Stablecoin pareada ao dólar, ideal para operações seguras."
  },
  {
    image: daiLogo,
    title: "Dai (DAI)",
    description: "Stablecoin descentralizada e estável, lastreada em ativos digitais."
  },
  {
    image: uniLogo,
    title: "Uniswap (UNI)",
    description: "Stablecoin descentralizada e estável, lastreada em ativos digitais."
  },
  {
    image: chainlinkLogo,
    title: "Chainlink (LINK)",
    description: "Stablecoin descentralizada e estável, lastreada em ativos digitais."
  },
  {
    image: usdtLogo,
    title: "Tether (USDT)",
    description: "Stablecoin pareada ao dólar, ideal para operações seguras."
  },
  {
    image: wstethLogo,
    title: "Wrapped Staked Ether (WSTETH)",
    description: "Token que representa ETH em staking com liquidez garantida."
  },
]

export default function Scroller() {

    return (
        <div className={styles.mainContainer}>
            <h2 className={styles.header}>Portfólio de garantias <br />que trabalhamos na NeoFi</h2>

            <div className={styles.viewport}>

                <div className={styles.scrollerContainer}>
                    {cardArray.map(atual => (
                        <CardAtivo key={atual.title} image={atual.image} title={atual.title} description={atual.description} />
                    ))}

                    {cardArray.map(atual => (
                        <CardAtivo key={`dup-${atual.title}`} image={atual.image} title={atual.title} description={atual.description} />
                    ))}
                </div>
            </div>
        </div>
    )
}
