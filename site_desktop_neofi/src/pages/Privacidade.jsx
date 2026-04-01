import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Footer from '../components/Footer/Footer';
import styles from './Privacidade.module.css';

export function Privacidade() {
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
              <h1 className={styles.title}>Política de Privacidade</h1>
              <p className={styles.meta}>Vigência: 01/04/2026</p>

              <div className={styles.content}>
                <p>
                  Esta Política de Privacidade descreve como a NeoFi Capital coleta, usa, compartilha e protege dados pessoais quando você acessa e
                  utiliza nossos canais digitais, incluindo este site, formulários e páginas de contato.
                </p>

                <h2>1. Controlador</h2>
                <p>
                  Para fins da LGPD (Lei nº 13.709/2018), a NeoFi é a controladora dos dados pessoais tratados neste site. Contato:
                  <a href="mailto:contato@neofi.capital">contato@neofi.capital</a>.
                </p>

                <h2>2. Dados coletados</h2>
                <ul>
                  <li>Dados fornecidos por você: nome, e-mail, mensagens, interesse em produtos e demais informações inseridas.</li>
                  <li>Dados de conta e autenticação: e-mail e metadados quando você cria conta e faz login.</li>
                  <li>Dados de pagamento: processados por provedores terceiros, conforme suas políticas.</li>
                  <li>Dados de navegação: IP, dispositivo, navegador, páginas acessadas, data e hora.</li>
                </ul>

                <h2>3. Finalidades</h2>
                <ul>
                  <li>Responder contatos e solicitações.</li>
                  <li>Gerenciar cadastro, login e segurança da conta.</li>
                  <li>Operar funcionalidades, prevenir fraudes e abusos.</li>
                  <li>Melhorar desempenho, conteúdo e experiência.</li>
                  <li>Cumprir obrigações legais e regulatórias.</li>
                </ul>

                <h2>4. Bases legais</h2>
                <ul>
                  <li>execução de contrato e procedimentos preliminares;</li>
                  <li>legítimo interesse;</li>
                  <li>consentimento, quando aplicável;</li>
                  <li>cumprimento de obrigação legal/regulatória.</li>
                </ul>

                <h2>5. Compartilhamento</h2>
                <p>Com fornecedores necessários para operar o serviço, por exemplo:</p>
                <ul>
                  <li>infraestrutura e autenticação (ex.: Supabase);</li>
                  <li>pagamentos (ex.: Mercado Pago);</li>
                  <li>hospedagem, monitoramento e segurança.</li>
                </ul>

                <h2>6. Cookies</h2>
                <p>Usamos cookies para funcionamento, segurança, medição e melhoria. Você pode gerenciar cookies no navegador.</p>

                <h2>7. Segurança</h2>
                <p>Adotamos medidas razoáveis para proteger dados pessoais. Nenhum sistema é completamente seguro.</p>

                <h2>8. Retenção</h2>
                <p>Mantemos dados pelo tempo necessário às finalidades, obrigações legais e segurança.</p>

                <h2>9. Direitos do titular</h2>
                <ul>
                  <li>acesso e confirmação;</li>
                  <li>correção;</li>
                  <li>anonimização, bloqueio ou eliminação;</li>
                  <li>portabilidade;</li>
                  <li>informação sobre compartilhamentos;</li>
                  <li>revogação de consentimento, quando aplicável.</li>
                </ul>

                <h2>10. Contato</h2>
                <p>Para exercer direitos ou tirar dúvidas, escreva para <a href="mailto:contato@neofi.capital">contato@neofi.capital</a>.</p>

                <h2>11. Alterações</h2>
                <p>A versão vigente será sempre publicada nesta página.</p>
              </div>
            </div>
          </div>
        </section>
      </MotionDiv>

      <Footer />
    </>
  );
}
