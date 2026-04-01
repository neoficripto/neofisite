import styles from "./BotoesResponsivos.module.css";
import { useState } from "react";
import Botao from "./Botao";

export default function BotoesResponsivos({ arrayInfo }) {
  const [etapaAtivoAtual, setEtapaAtivoAtual] = useState(1);

  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.buttonContainer}>

          {arrayInfo.map((BotaoAtual) => (
            <Botao
              key={BotaoAtual.id}
              image={BotaoAtual.image}
              stepNumber={BotaoAtual.stepNumber}
              isActive={etapaAtivoAtual === BotaoAtual.id ? true : false}
              onClick={() => setEtapaAtivoAtual(BotaoAtual.id)}
              subText={BotaoAtual.description}
            />
          ))}
        </div>
        <div className={styles.textoContainer}>
          <p className={styles.text}>{arrayInfo[etapaAtivoAtual - 1].subtext}</p>
        </div>
      </div>
    </>
  );
}
