import React from 'react';
import { Button } from '../ui/button';
import { useWhatsApp } from '../../hooks/useWhatsApp';

const FAQ = ({ faqs = [] }) => {
  const { openWhatsApp } = useWhatsApp();

  return (
    <section className="py-20 px-4 bg-gradient-to-b from-yellow-50 to-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Perguntas Frequentes</h3>
          <div className="w-24 h-1 bg-teal-500 mx-auto rounded-full mb-4"></div>
          <p className="text-xl text-gray-600">Esclarecemos as suas dúvidas</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
              <details className="group">
                <summary className="flex justify-between items-center cursor-pointer p-6 hover:bg-teal-50 transition-colors">
                  <h4 className="font-bold text-lg text-gray-900">{faq.question}</h4>
                  <span className="text-teal-600 text-2xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-6 pt-2 text-gray-700 leading-relaxed">{faq.answer}</div>
              </details>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <p className="text-gray-600 mb-4">Ainda tens dúvidas?</p>
          <Button
            size="lg"
            data-testid="faq-cta"
            onClick={() => openWhatsApp()}
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold">
            💬 Fala Connosco pelo WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
