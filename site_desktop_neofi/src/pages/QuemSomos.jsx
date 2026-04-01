import NeoFiLogo from "../components/LogoInterativo/LogoInterativo";
import SpellingText from "../components/LogoInterativo/SpellingText";

import styles from "./QuemSomos.module.css";
import { useEffect } from "react";

export default function QuemSomos() {

    useEffect(() => {
            document.body.classList.add("background-class");
    
            return () => {
                document.body.classList.remove("background-class");
            };
        }, []);

    return (
        <>
        <div className={styles.logoContainer}>
            {/* <SpellingText name='NEOFI CAPITAL' /> */}
            <NeoFiLogo />
            
        </div>
        </>
    )
}
