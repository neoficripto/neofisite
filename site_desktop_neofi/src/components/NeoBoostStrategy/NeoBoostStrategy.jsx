import ProductStrategySection from '../ProductStrategySection/ProductStrategySection';
import { Box, Eye, Share2 } from 'lucide-react';
import { buildWhatsAppUrl, DEFAULT_WHATSAPP_MESSAGE } from '../../lib/whatsapp';

const cards = [
  {
    number: '01',
    title: 'Estrutura',
    lines: [
      'Capital organizado em uma arquitetura eficiente.',
      'A operação é construída com regras claras e parâmetros definidos.',
    ],
    Icon: Box,
  },
  {
    number: '02',
    title: 'Estratégia',
    lines: [
      'Alocação inteligente em ativos fortes do mercado cripto.',
      'Cada movimento busca eficiência de capital e crescimento estrutural.',
    ],
    Icon: Share2,
  },
  {
    number: '03',
    title: 'Gestão',
    lines: [
      'Monitoramento contínuo e ajustes quando necessário.',
      'Disciplina operacional é o que sustenta a estratégia no longo prazo.',
    ],
    Icon: Eye,
  },
];

export default function NeoBoostStrategy() {
  const whatsAppUrl = buildWhatsAppUrl(`${DEFAULT_WHATSAPP_MESSAGE}\n\nTenho interesse em: NeoBoost.`);

  return (
    <ProductStrategySection
      kicker="NEOBOOST"
      title="Como a estratégia é construída"
      subtitle="Infraestrutura, estratégia e gestão trabalhando juntas."
      cards={cards}
      footerText="Cripto como infraestrutura."
      footerAccent="Estratégia como diferencial."
      ctaText="Falar com um especialista"
      ctaHref={whatsAppUrl}
    />
  );
}
