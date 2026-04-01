import styles from './SobreNos.module.css';

import BouncingLogos from '../../components/2dBounce/BouncingLogos';

import btcLogo from "../../assets/Bouncing/bitcoin.png";
import bnbLogo from "../../assets/Bouncing/binance.png";
import daiLogo from "../../assets/Bouncing/dai.png";
import ethLogo from "../../assets/Bouncing/ethereum.png";
import polyLogo from "../../assets/Bouncing/polygon.png";
import solLogo from "../../assets/Bouncing/solana.png";
import uniLogo from "../../assets/Bouncing/uniswap.png";
import usdcLogo from "../../assets/Bouncing/usdc.png";
import usdtLogo from "../../assets/Bouncing/usdt.png";

export default function SobreNos({ children }) {

        const bouncingLogos = [
            { src: btcLogo },
            { src: ethLogo },
            { src: daiLogo},
            { src: uniLogo},
            { src: bnbLogo},
            { src: polyLogo},
            { src: solLogo},
            { src: usdcLogo},
            { src: usdtLogo},
    
        ];

    return (
            <div className={styles.container}>
                <div className={styles.leftColumn}>
                    {children}
                </div>
                <div className={styles.rightColumn}>
                    <BouncingLogos logos={bouncingLogos} containerHeight='100%'/>
                </div>
            </div>
        )
}