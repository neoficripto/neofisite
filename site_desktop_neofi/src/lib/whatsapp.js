export const WHATSAPP_NUMBER = '5511958102229';

export const buildWhatsAppUrl = (message) => {
  const text = typeof message === 'string' ? message : '';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
};

export const DEFAULT_WHATSAPP_MESSAGE =
  'Olá! Conheci a NeoFi pelo site e gostaria de conversar com um especialista para entender qual estrutura pode ser mais adequada ao meu momento.';
