import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Footer from '../components/Footer/Footer';
import styles from './Termos.module.css';

export function Termos() {
  const shouldReduceMotion = useReducedMotion();
  const MotionDiv = motion.div;

  useEffect(() => {
    document.body.classList.add('background-class');

    return () => {
      document.body.classList.remove('background-class');
    };
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 120, damping: 18 } },
  };

  return (
    <>
      <MotionDiv variants={sectionVariants} initial={shouldReduceMotion ? false : 'hidden'} animate={shouldReduceMotion ? undefined : 'visible'}>
        <section className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.card}>
              <h1 className={styles.title}>Termos de Uso</h1>
              <p className={styles.meta}>Vigência: 01/04/2026</p>

              <div className={styles.content}>
                <p>
                  Estes Termos de Uso regem o acesso e uso do site e dos canais digitais da NeoFi Capital. Ao acessar ou usar o site, você concorda com
                  estes Termos e com a nossa <a href="/privacidade">Política de Privacidade</a>.
                </p>

                <h2>1. Quem pode usar</h2>
                <p>
                  Você declara ter capacidade legal para contratar e usar o site. Se estiver usando em nome de uma empresa, declara ter poderes para
                  vincular essa empresa a estes Termos.
                </p>

                <h2>2. Escopo do site</h2>
                <p>
                  O site apresenta informações institucionais e de produtos (NeoBoost, NeoLine, NeoYield), conteúdos e canais de contato. Podemos
                  disponibilizar cadastro/login e fluxos de pagamento por provedores terceiros.
                </p>

                <h2>3. Natureza das informações e riscos</h2>
                <ul>
                  <li>Conteúdos têm caráter informativo e não constituem recomendação personalizada ou promessa de rentabilidade.</li>
                  <li>Ativos digitais e DeFi envolvem riscos relevantes (volatilidade, liquidez, falhas técnicas, smart contracts, contraparte, regulação).</li>
                  <li>Você é responsável por avaliar se a operação faz sentido para seu perfil e buscar aconselhamento independente, quando necessário.</li>
                </ul>

                <h2>4. Cadastro, conta e segurança</h2>
                <ul>
                  <li>Você é responsável pelas informações fornecidas e por manter seus dados atualizados.</li>
                  <li>Você deve proteger suas credenciais e notificar suspeitas de uso indevido.</li>
                  <li>Podemos suspender ou bloquear acessos em caso de indícios de fraude, abuso ou violação destes Termos.</li>
                </ul>

                <h2>5. Pagamentos e terceiros</h2>
                <p>
                  Quando houver pagamentos, podem ser processados por provedores terceiros (ex.: Mercado Pago). O tratamento de dados e as condições de
                  pagamento podem ser regidos também por termos e políticas desses provedores.
                </p>

                <h2>6. Propriedade intelectual</h2>
                <p>
                  Todo conteúdo do site é de titularidade da NeoFi ou licenciado a ela. Você não pode copiar, reproduzir, distribuir ou explorar
                  comercialmente sem autorização.
                </p>

                <h2>7. Uso proibido</h2>
                <ul>
                  <li>Violar leis, regulamentos ou direitos de terceiros.</li>
                  <li>Tentar acessar áreas restritas ou sistemas sem autorização.</li>
                  <li>Interferir no funcionamento do site ou introduzir malware.</li>
                  <li>Usar o site para práticas abusivas, fraudulentas ou que comprometam a segurança.</li>
                </ul>

                <h2>8. Links externos</h2>
                <p>
                  Podemos conter links para páginas de terceiros. Não controlamos esses sites e não nos responsabilizamos por seus conteúdos e políticas.
                </p>

                <h2>9. Isenção e limitação de responsabilidade</h2>
                <ul>
                  <li>O site é disponibilizado “como está”, sujeito a interrupções e atualizações.</li>
                  <li>Na extensão permitida pela lei, não seremos responsáveis por danos indiretos, lucros cessantes ou perda de dados.</li>
                </ul>

                <h2>10. Rescisão e suspensão</h2>
                <p>
                  Podemos suspender ou encerrar seu acesso a qualquer momento em caso de violação destes Termos, solicitação de autoridade competente,
                  riscos à segurança ou indisponibilidade técnica.
                </p>

                <h2>11. Alterações</h2>
                <p>A versão vigente estará publicada nesta página com a data de vigência.</p>

                <h2>12. Lei aplicável e foro</h2>
                <p>Estes Termos são regidos pelas leis do Brasil. Fica eleito o foro do domicílio do usuário, quando aplicável.</p>

                <h2>13. Contato</h2>
                <p>Para dúvidas, fale conosco em <a href="mailto:contato@neofi.capital">contato@neofi.capital</a>.</p>
              </div>
            </div>
          </div>
        </section>
      </MotionDiv>

      <Footer />
    </>
  );
}
