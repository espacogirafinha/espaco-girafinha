import { contactInfo } from '../data/mock';

/**
 * Helpers partilhados para abrir WhatsApp em vários contextos.
 */
export const useWhatsApp = () => {
  const phone = contactInfo.whatsapp.replace(/\+/g, '');

  const openWhatsApp = (text) => {
    const url = text
      ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
      : `https://wa.me/${phone}`;
    window.open(url, '_blank');
  };

  return { openWhatsApp };
};
