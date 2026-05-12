import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { packages } from '../../data/mock';
import { useWhatsApp } from '../../hooks/useWhatsApp';

const Packages = () => {
  const { openWhatsApp } = useWhatsApp();

  return (
    <section id="pacotes" className="py-20 px-4 bg-gradient-to-b from-yellow-50 to-teal-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Pacotes de Festas</h3>
          <div className="w-24 h-1 bg-teal-500 mx-auto rounded-full mb-4"></div>
          <p className="text-sm md:text-xl text-gray-600 mb-2 whitespace-nowrap">Escolha o pacote perfeito para a festa do seu filho</p>
          <p className="text-xs md:text-lg text-teal-600 font-bold animate-pulse mb-4 whitespace-nowrap">
            ⚠️ Disponibilidade limitada — garanta já a sua data!
          </p>
          <p className="text-xs md:text-lg text-gray-700 font-semibold mb-2 whitespace-nowrap">
            👇 Escolha o pack ideal para a festa do seu filho
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg) => (
            <Card
              key={pkg.id}
              data-testid={`package-card-${pkg.id}`}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                pkg.popular ? 'border-3 border-teal-500 shadow-xl bg-white' : 'border border-gray-200 bg-white'
              }`}>
              {pkg.popular && (
                <div className="absolute top-0 left-0 right-0 bg-teal-500 text-white text-center py-2 text-sm font-bold">
                  ⭐ MAIS POPULAR
                </div>
              )}
              {pkg.isPromotion && (
                <div className={`${pkg.popular ? 'mt-10' : 'mt-0'} bg-gradient-to-r from-teal-500 to-teal-600 text-white text-center py-2 px-4 text-sm font-bold`}>
                  🎉 Promoção Especial de 1º Aniversário
                </div>
              )}

              <CardHeader className={pkg.popular && pkg.isPromotion ? 'pt-4' : pkg.popular ? 'pt-12' : pkg.isPromotion ? 'pt-4' : 'pt-6'}>
                <CardTitle className="text-2xl font-bold text-gray-900 mb-3">{pkg.name}</CardTitle>

                <div className="mb-4">
                  {pkg.isPromotion && pkg.originalPrice && (
                    <div className="mb-2">
                      <span className="text-lg text-gray-400 line-through font-medium">{pkg.originalPrice}</span>
                    </div>
                  )}
                  <div className="text-4xl font-bold text-teal-600">{pkg.price}</div>
                  {pkg.isPromotion && (
                    <p className="text-xs text-teal-600 font-semibold mt-2">
                      ⏰ Aproveite esta oferta por tempo limitado
                    </p>
                  )}
                </div>

                <div className="bg-teal-50 rounded-lg p-3 mb-4">
                  {pkg.schedules.map((schedule, index) => (
                    <p key={index} className="text-sm font-semibold text-gray-700">{schedule}</p>
                  ))}
                </div>

                <div className="flex items-center justify-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2 mb-4">
                  <span className="text-green-700 font-bold text-sm">✅ Reserva Flexível</span>
                  <span className="text-green-600 text-xs">• Sinal de apenas 20%</span>
                </div>
              </CardHeader>

              <CardContent>
                <div className="border-t border-gray-200 mb-4"></div>

                <div className="mb-4">
                  <p className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-3">Inclui:</p>
                  <ul className="space-y-2">
                    {pkg.includes.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {pkg.extras && pkg.extras.length > 0 && (
                  <div className="mb-4 bg-yellow-50 rounded-lg p-3">
                    <p className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-2">Extras:</p>
                    <ul className="space-y-1">
                      {pkg.extras.map((extra, index) => (
                        <li key={index} className="text-sm text-gray-700 font-semibold">• {extra}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {pkg.notes && pkg.notes.length > 0 && (
                  <div className="mb-6 border-t border-gray-200 pt-4">
                    <p className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-2">Notas:</p>
                    <ul className="space-y-1.5">
                      {pkg.notes.map((note, index) => (
                        <li key={index} className="text-xs text-gray-600 leading-relaxed">• {note}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <Button
                  data-testid={`package-cta-${pkg.id}`}
                  className={`w-full text-white rounded-full font-semibold py-6 ${
                    pkg.popular ? 'bg-teal-600 hover:bg-teal-700 shadow-lg' : 'bg-teal-500 hover:bg-teal-600'
                  }`}
                  onClick={() => openWhatsApp()}>
                  💬 Saber disponibilidade
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-gray-600">Todos os preços incluem IVA à taxa legal em vigor.</p>
        </div>
      </div>
    </section>
  );
};

export default Packages;
