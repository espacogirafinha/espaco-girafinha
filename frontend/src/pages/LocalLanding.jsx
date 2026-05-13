import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Check, MapPin, MessageCircle, Sparkles } from 'lucide-react';
import SiteHeader from '../components/sections/SiteHeader';
import SiteFooter from '../components/sections/SiteFooter';
import FloatingWhatsApp from '../components/sections/FloatingWhatsApp';
import Packages from '../components/sections/Packages';
import FAQ from '../components/sections/FAQ';
import ReservationForm from '../components/sections/ReservationForm';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { useWhatsApp } from '../hooks/useWhatsApp';
import { useSiteContent } from '../hooks/useSiteContent';
import { localBusinessSchema, partyServiceSchema, setPageMeta, siteUrl } from '../lib/seo';

const pages = {
  'festas-infantis-silves': {
    title: 'Festas Infantis em Silves | Espaço Girafinha',
    description: 'Espaço privado para festas infantis em Silves com animação, decoração personalizada e catering. Pacotes desde 220€. Peça orçamento pelo WhatsApp.',
    h1: 'Festas Infantis em Silves',
    intro: 'Um espaço privado, seguro e preparado para crianças, no coração de Silves, para celebrar aniversários sem stress para os pais.',
    area: 'Silves',
    image: '/hero-party.jpg',
    highlights: ['Espaço privado em Silves', 'Animação incluída', 'Decoração e catering opcionais', 'Resposta rápida por WhatsApp'],
  },
  'festas-infantis-algarve': {
    title: 'Festas Infantis no Algarve | Espaço Privado em Silves',
    description: 'Organize uma festa infantil no Algarve com espaço privado, insuflável, animação, decoração e catering. Ideal para famílias de Silves, Lagoa, Portimão e Albufeira.',
    h1: 'Festas Infantis no Algarve',
    intro: 'Recebemos famílias de várias zonas do Algarve que procuram uma festa bonita, prática e pronta a acontecer.',
    area: 'Algarve',
    image: '/gallery/festa-aniversario.jpg',
    highlights: ['Localização prática em Silves', 'Pacotes completos', 'Ideal para 1 a 10 anos', 'Opções para crianças e adultos'],
  },
  'aluguer-espaco-festas-infantis': {
    title: 'Aluguer de Espaço para Festas Infantis | Espaço Girafinha',
    description: 'Aluguer de espaço para festas infantis com utilização exclusiva, brinquedos, insuflável, monitor e opções de decoração e catering em Silves, Algarve.',
    h1: 'Aluguer de Espaço para Festas Infantis',
    intro: 'Reserve um espaço exclusivo para a festa do seu filho, com atividades, apoio no dia e extras para tornar tudo mais simples.',
    area: 'Silves e Algarve',
    image: '/gallery/piscina-bolas-turquesa.jpg',
    highlights: ['Utilização exclusiva do espaço', 'Insuflável e brinquedos', 'Monitor/animador', 'Reserva flexível com sinal'],
  },
};

const LocalLanding = () => {
  const { slug } = useParams();
  const page = pages[slug];
  const { openWhatsApp } = useWhatsApp();
  const { content } = useSiteContent();

  useEffect(() => {
    if (!page) return;
    setPageMeta({ title: page.title, description: page.description, path: `/${slug}`, image: page.image });
  }, [page, slug]);

  if (!page) return <Navigate to="/" replace />;

  const pageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: page.title,
    description: page.description,
    url: `${siteUrl}/${slug}`,
    about: localBusinessSchema,
    mainEntity: partyServiceSchema,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-yellow-50 to-green-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([localBusinessSchema, partyServiceSchema, pageSchema]) }} />
      <SiteHeader />

      <main>
        <section className="relative pt-32 pb-20 px-4 overflow-hidden min-h-[560px] flex items-center">
          <img src={page.image} alt={page.h1} className="absolute inset-0 h-full w-full object-cover" loading="eager" fetchpriority="high" />
          <div className="absolute inset-0 bg-black/50" />
          <div className="container mx-auto relative z-10 max-w-4xl text-center text-white">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold backdrop-blur">
              <MapPin className="h-4 w-4" /> {page.area}
            </div>
            <h1 className="mt-6 text-4xl md:text-6xl font-bold leading-tight">{page.h1}</h1>
            <p className="mt-5 text-lg md:text-2xl font-semibold text-white/95">{page.intro}</p>
            <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" onClick={() => openWhatsApp(`Olá! Gostaria de pedir orçamento para ${page.h1}.`)} className="bg-green-600 hover:bg-green-700 text-white rounded-full px-8 py-6 text-lg font-bold">
                <MessageCircle className="h-5 w-5 mr-2" /> Pedir orçamento
              </Button>
              <Link to="/#pacotes" className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-lg font-bold text-teal-700 shadow-xl hover:bg-gray-100">
                Ver pacotes
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16">
          <div className="container mx-auto max-w-6xl">
            <div className="grid gap-6 md:grid-cols-4">
              {page.highlights.map((item) => (
                <Card key={item} className="border-teal-100">
                  <CardContent className="p-5 flex gap-3">
                    <Check className="h-5 w-5 text-teal-600 flex-shrink-0 mt-0.5" />
                    <p className="font-semibold text-gray-800">{item}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-16 bg-gradient-to-b from-yellow-50 to-white">
          <div className="container mx-auto max-w-5xl text-center">
            <Sparkles className="mx-auto h-9 w-9 text-teal-600" />
            <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">Tudo preparado para uma festa sem stress</h2>
            <p className="mt-4 text-lg text-gray-700">
              Tratamos do espaço, da diversão e dos detalhes para que os pais possam aproveitar o dia. Pode escolher um pacote simples ou uma solução completa com decoração e catering.
            </p>
          </div>
        </section>

        <Packages packages={content.packages} />
        <FAQ faqs={content.faqs} />
        <ReservationForm packages={content.packages} />
      </main>

      <SiteFooter />
      <FloatingWhatsApp />
    </div>
  );
};

export default LocalLanding;
