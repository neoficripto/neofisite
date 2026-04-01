import styles from "./CryptoRain.module.css";
import { useMemo } from "react";

import btcLogo from "../../assets/Bouncing/bitcoin.png";
import bnbLogo from "../../assets/Bouncing/binance.png";
import daiLogo from "../../assets/Bouncing/dai.png";
import ethLogo from "../../assets/Bouncing/ethereum.png";
import polyLogo from "../../assets/Bouncing/polygon.png";
import solLogo from "../../assets/Bouncing/solana.png";
import uniLogo from "../../assets/Bouncing/uniswap.png";
import usdcLogo from "../../assets/Bouncing/usdc.png";
import usdtLogo from "../../assets/Bouncing/usdt.png";

const TOKENS = [btcLogo, bnbLogo, daiLogo, ethLogo, polyLogo, solLogo, uniLogo, usdcLogo, usdtLogo];

export default function CryptoRain() {

    const rainDrops = useMemo(() => {
    return new Array(20).fill(null).map((_, i) => ({
      id: i,
      token: TOKENS[Math.floor(Math.random() * TOKENS.length)],
      style: {
        left: `${Math.random() * 90}%`, // Random horizontal position
        animationDuration: `${Math.random() * 3 + 2}s`, // R andom speed (2s to 5s)
        animationDelay: `${Math.random() * 5}s`, // Random delay
      },
    }));
  }, []);

  return (
    <div className={styles.rainContainer}>
      {rainDrops.map((drop) => (
        <div className={styles.itemContainer} >
          <img key={drop.id} src={drop.token} className={styles.rainItem} style={drop.style} />
          </div>
      ))}
    </div>
  );

}