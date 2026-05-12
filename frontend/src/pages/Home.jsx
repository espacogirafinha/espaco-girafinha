import React, { useEffect, useState } from 'react';
import SiteHeader from '../components/sections/SiteHeader';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Packages from '../components/sections/Packages';
import FoodOptions from '../components/sections/FoodOptions';
import Gallery from '../components/sections/Gallery';
import WhyChooseUs from '../components/sections/WhyChooseUs';
import Testimonials from '../components/sections/Testimonials';
import FAQ from '../components/sections/FAQ';
import InstagramFeed from '../components/sections/InstagramFeed';
import Contact from '../components/sections/Contact';
import SiteFooter from '../components/sections/SiteFooter';
import { PrivacyModal, TermsModal } from '../components/sections/LegalModals';
import FloatingWhatsApp from '../components/sections/FloatingWhatsApp';

const Home = () => {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  // Reset SEO meta tags when returning to Home from blog pages
  useEffect(() => {
    document.title = 'Espaço Girafinha | Festas Infantis em Silves, Algarve';
    const setMeta = (selector, attr, value) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };
    const homeDesc = 'Festas infantis inesquecíveis em Silves e Algarve. Espaço privado, decoração personalizada, animação e catering — pacotes desde 220€. Marque a sua festa pelo WhatsApp.';
    const ogDesc = 'A festa perfeita para o seu filho — sem stress. Espaço privado em Silves com decoração, animação e catering incluído. Pacotes desde 220€.';
    setMeta('meta[name="description"]', 'content', homeDesc);
    setMeta('meta[property="og:title"]', 'content', 'Espaço Girafinha | Festas Infantis em Silves, Algarve');
    setMeta('meta[property="og:description"]', 'content', ogDesc);
    setMeta('meta[property="og:url"]', 'content', 'https://espacogirafinha.pt/');
    setMeta('meta[property="og:type"]', 'content', 'website');
    setMeta('meta[property="og:image"]', 'content', 'https://espacogirafinha.pt/hero-party.jpg');
    setMeta('meta[name="twitter:title"]', 'content', 'Espaço Girafinha | Festas Infantis em Silves, Algarve');
    setMeta('meta[name="twitter:description"]', 'content', ogDesc);
    setMeta('meta[name="twitter:image"]', 'content', 'https://espacogirafinha.pt/hero-party.jpg');
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-yellow-50 to-green-50">
      <SiteHeader />
      <Hero />
      <About />
      <Packages />
      <FoodOptions />
      <Gallery />
      <WhyChooseUs />
      <Testimonials />
      <FAQ />
      <InstagramFeed />
      <Contact />
      <SiteFooter onOpenPrivacy={() => setShowPrivacy(true)} onOpenTerms={() => setShowTerms(true)} />

      <PrivacyModal open={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <TermsModal open={showTerms} onClose={() => setShowTerms(false)} />

      <FloatingWhatsApp />
    </div>
  );
};

export default Home;
