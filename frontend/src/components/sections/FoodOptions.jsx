import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { foodOptions } from '../../data/mock';
import { useWhatsApp } from '../../hooks/useWhatsApp';

const FoodOptions = () => {
  const { openWhatsApp } = useWhatsApp();

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Opções de Lanche e Catering</h3>
          <div className="w-24 h-1 bg-teal-500 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {foodOptions.map((option) => (
            <Card key={option.id} className="border-2 border-teal-100 hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-teal-600 mb-2">{option.name}</CardTitle>
                {option.subtitle && (
                  <p className="text-sm font-semibold text-gray-700 bg-teal-50 rounded-lg px-3 py-2 inline-block">
                    {option.subtitle}
                  </p>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-xs font-bold text-gray-800 uppercase tracking-wide mb-3">Inclui:</p>
                <ul className="space-y-2">
                  {option.includes.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            data-testid="food-cta"
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 rounded-full font-semibold"
            onClick={() => openWhatsApp()}>
            💬 Pedir Informações sobre Lanche e Catering
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FoodOptions;
