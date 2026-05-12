import React from 'react';
import { Button } from '../ui/button';
import { useWhatsApp } from '../../hooks/useWhatsApp';

const About = () => {
  const { openWhatsApp } = useWhatsApp();

  return (
    <section id="sobre" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Sobre o Espaço Girafinha</h3>
          <div className="w-24 h-1 bg-teal-500 mx-auto rounded-full"></div>
        </div>

        <div className="bg-gradient-to-br from-teal-50 to-yellow-50 rounded-3xl p-8 md:p-12 shadow-xl">
          <div className="prose prose-lg max-w-none text-gray-700">
            <p className="text-xl leading-relaxed mb-6 text-center font-semibold text-gray-800">
              Transformamos aniversários em memórias inesquecíveis! ✨
            </p>
            <p className="text-lg leading-relaxed mb-6">
              O <strong className="text-teal-600">Espaço Girafinha</strong> nasceu do sonho de criar o local perfeito para celebrar
              momentos especiais com os mais pequenos. Localizado em <strong>Silves, Algarve</strong>, o nosso espaço oferece
              um ambiente <strong>seguro, colorido e totalmente privado</strong>, onde as crianças podem brincar,
              rir e criar memórias que vão guardar para sempre.
            </p>
            <p className="text-lg leading-relaxed mb-6">
              Sabemos que organizar uma festa infantil pode ser stressante. Por isso, criámos pacotes completos
              onde cuidamos de <strong>todos os detalhes</strong> — desde a decoração personalizada até à animação
              e lanche. Os pais podem finalmente relaxar e <strong>aproveitar o momento especial</strong> ao lado
              dos seus filhos, sem preocupações.
            </p>
            <p className="text-lg leading-relaxed text-center">
              <strong className="text-teal-600 text-xl">
                Mais do que um espaço de festas, somos parceiros na criação de sorrisos! 😊
              </strong>
            </p>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 mb-8">
            {[
              { icon: '✅', label: 'Licença de Funcionamento' },
              { icon: '🛡️', label: 'Seguro de Responsabilidade' },
              { icon: '🧼', label: 'Higienizado Diariamente' },
              { icon: '👨‍👩‍👧', label: 'Ambiente Familiar' },
            ].map((b) => (
              <div key={b.label} className="bg-white rounded-xl p-4 shadow-md text-center">
                <div className="text-3xl mb-2">{b.icon}</div>
                <p className="text-xs md:text-sm font-semibold text-gray-700">{b.label}</p>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex justify-center mt-8">
            <Button
              size="lg"
              data-testid="about-cta-visita"
              onClick={() => openWhatsApp()}
              className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-5 md:px-8 md:py-6 text-sm md:text-lg rounded-full font-semibold shadow-lg hover:shadow-xl transition-all whitespace-nowrap">
              📸 Marcar Visita sem Compromisso
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-3 text-center">Vem conhecer o espaço antes de reservar!</p>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-10 text-center">
            {[
              { value: '100+', label: 'Festas Realizadas' },
              { value: '100%', label: 'Pais Satisfeitos' },
              { value: '5★', label: 'Avaliação Google' },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-5 md:p-6 shadow-md">
                <p className="text-3xl md:text-4xl font-bold text-teal-600 mb-2">{s.value}</p>
                <p className="text-gray-700 text-sm md:text-base font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
