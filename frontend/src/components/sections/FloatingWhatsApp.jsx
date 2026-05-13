import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useWhatsApp } from '../../hooks/useWhatsApp';

const FloatingWhatsApp = () => {
  const { openWhatsApp } = useWhatsApp();
  const [showTooltip, setShowTooltip] = useState(false);

  // Tooltip appears after 3s, hides after 5s more
  useEffect(() => {
    const hideTimer = { current: null };
    const showTimer = setTimeout(() => {
      setShowTooltip(true);
      hideTimer.current = setTimeout(() => setShowTooltip(false), 5000);
    }, 3000);
    return () => {
      clearTimeout(showTimer);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:bottom-6 z-50">
      {showTooltip && (
        <div className="hidden md:block absolute bottom-full right-0 mb-2 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-xl whitespace-nowrap animate-bounce">
          💬 Dúvidas? Fala connosco!
          <div className="absolute bottom-0 right-8 transform translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
        </div>
      )}

      <button
        onClick={() => openWhatsApp()}
        data-testid="floating-whatsapp-button"
        className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-5 py-4 md:p-5 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 md:hover:scale-110 md:animate-pulse flex items-center justify-center gap-2 font-bold"
        aria-label="Contactar via WhatsApp">
        <MessageCircle className="h-7 w-7" />
        <span className="md:hidden">Pedir orçamento</span>
      </button>
    </div>
  );
};

export default FloatingWhatsApp;
