import React from 'react';
import { Shield, Lock, PartyPopper, Heart } from 'lucide-react';
import { Card, CardHeader, CardTitle } from '../ui/card';
import { features } from '../../data/mock';

const iconMap = { Shield, Lock, PartyPopper, Heart };

const WhyChooseUs = () => (
  <section className="py-20 px-4 bg-gradient-to-b from-green-50 to-yellow-50">
    <div className="container mx-auto">
      <div className="text-center mb-16">
        <h3 className="text-4xl font-bold text-gray-900 mb-4">Porque Escolher o Espaço Girafinha?</h3>
        <div className="w-24 h-1 bg-teal-500 mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {features.map((feature) => {
          const IconComponent = iconMap[feature.icon];
          return (
            <Card key={feature.id} className="hover:shadow-xl transition-shadow duration-300 border-2 border-teal-100">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {IconComponent && <IconComponent className="h-7 w-7 text-teal-600" />}
                  </div>
                  <div>
                    <CardTitle className="text-xl text-gray-900 mb-3">{feature.title}</CardTitle>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
