import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Instagram, Facebook, MessageCircle, Menu, X } from 'lucide-react';
import { contactInfo } from '../data/mock';

const navLinks = [
  { label: 'Sobre', to: '/#sobre', testId: 'nav-sobre' },
  { label: 'Pacotes', to: '/#pacotes', testId: 'nav-pacotes' },
  { label: 'Galeria', to: '/#galeria', testId: 'nav-galeria' },
  { label: 'Contacto', to: '/#contacto', testId: 'nav-contacto' },
];

const BlogLayout = ({ children }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    setOpen(false);
  }, [location.pathname]);

  const openWhatsApp = () => {
    const url = `https://wa.me/${contactInfo.whatsapp.replace(/\+/g, '')}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-yellow-50 to-green-50 flex flex-col">
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-sm z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3" data-testid="header-logo-link">
              <img src="/Logotipo girafinha  (1).png" alt="Espaço Girafinha" className="h-12 w-auto" />
              <div>
                <h1 className="text-xl font-bold text-teal-600">Espaço Girafinha</h1>
                <p className="text-xs text-gray-600">Silves, Algarve</p>
              </div>
            </Link>

            <nav className="hidden md:flex gap-6 items-center">
              {navLinks.map((item) => (
                <Link key={item.to} to={item.to} className="text-gray-700 hover:text-teal-500 transition-colors" data-testid={item.testId}>
                  {item.label}
                </Link>
              ))}
              <Link to="/dicas" className="text-teal-600 font-semibold hover:text-teal-700 transition-colors" data-testid="nav-dicas">
                Dicas & Ideias
              </Link>
            </nav>

            <button
              type="button"
              onClick={() => setOpen((current) => !current)}
              className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-teal-100 bg-white text-teal-700 shadow-sm"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}>
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

          {open && (
            <nav className="md:hidden mt-4 rounded-xl border border-teal-100 bg-white p-2 shadow-lg">
              {navLinks.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-teal-50 hover:text-teal-700">
                  {item.label}
                </Link>
              ))}
              <Link
                to="/dicas"
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-sm font-semibold text-teal-700 hover:bg-teal-50"
                data-testid="mobile-nav-dicas">
                Dicas & Ideias
              </Link>
            </nav>
          )}
        </div>
      </header>

      <main className="flex-1 pt-24">{children}</main>

      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <img src="/Logotipo girafinha  (1).png" alt="Espaço Girafinha" className="h-16 w-auto mx-auto mb-4" />
          <h4 className="text-2xl font-bold mb-2">Espaço Girafinha</h4>
          <p className="text-gray-400 mb-6">Festas Infantis em Silves, Algarve</p>
          <div className="flex justify-center gap-6 mb-6">
            <a href={`https://instagram.com/${contactInfo.instagram}`} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors" aria-label="Instagram">
              <Instagram className="h-6 w-6" />
            </a>
            <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors" aria-label="Facebook">
              <Facebook className="h-6 w-6" />
            </a>
            <a href={`https://wa.me/${contactInfo.whatsapp.replace(/\+/g, '')}`} target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition-colors" aria-label="WhatsApp">
              <MessageCircle className="h-6 w-6" />
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-4 mb-4 text-sm">
            <Link to="/dicas" className="text-gray-400 hover:text-white transition-colors underline" data-testid="footer-blog-link">Dicas & Ideias</Link>
            <a href="https://www.livroreclamacoes.pt/Inicio/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors underline">
              Livro de Reclamações
            </a>
          </div>
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Espaço Girafinha. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      <button
        onClick={openWhatsApp}
        aria-label="Contactar via WhatsApp"
        data-testid="floating-whatsapp-button"
        className="fixed bottom-6 right-6 z-50 bg-green-600 hover:bg-green-700 text-white p-5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 animate-pulse">
        <MessageCircle className="h-7 w-7" />
      </button>
    </div>
  );
};

export default BlogLayout;
