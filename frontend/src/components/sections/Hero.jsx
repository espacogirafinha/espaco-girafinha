import React from 'react';
import { Button } from '../ui/button';
import { useWhatsApp } from '../../hooks/useWhatsApp';

const Hero = () => {
  const { openWhatsApp } = useWhatsApp();

  const scrollToPackages = () => {
    document.getElementById('pacotes')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-24 pb-20 px-4 overflow-hidden min-h-[600px] md:min-h-[700px] flex items-center">
      <img
        src="/hero-party.jpg"
        alt="Festa infantil no Espaço Girafinha"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="container mx-auto relative z-10 text-center max-w-4xl">
        <h2 className="hidden md:block text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          🎉 A festa perfeita para o seu filho — sem stress para si
        </h2>
        <h2 className="block md:hidden text-4xl font-bold text-white mb-4 leading-tight">
          🎉 A Festa Perfeita <br />Sem Stress
        </h2>
        <p className="hidden md:block text-xl md:text-2xl text-white mb-4 font-semibold">
          Espaço privado em Silves com decoração, animação e catering incluído
        </p>
        <p className="block md:hidden text-lg text-white mb-3 font-semibold">
          Espaço privado em Silves
        </p>
        <p className="text-lg md:text-xl text-yellow-300 font-bold mb-8">
          ⚠️ Fins de semana esgotam rápido
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            data-testid="hero-cta-orcamento"
            className="w-auto bg-green-600 hover:bg-green-700 text-white text-lg md:text-xl px-8 py-6 rounded-full font-bold shadow-xl"
            onClick={() => openWhatsApp()}>
            💬 Pedir Orçamento
          </Button>
          <Button
            size="lg"
            data-testid="hero-cta-precos"
            className="w-auto bg-white text-teal-600 text-lg md:text-xl px-8 py-6 rounded-full font-bold shadow-xl hover:bg-gray-100"
            onClick={scrollToPackages}>
            Ver Preços
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10"></div>
    </section>
  );
};

export default Hero;
