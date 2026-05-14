import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, MessageCircle } from 'lucide-react';
import { contactInfo } from '../../data/mock';

const SiteFooter = ({ onOpenPrivacy, onOpenTerms }) => (
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
        <Link to="/dicas" className="text-gray-400 hover:text-white transition-colors underline" data-testid="footer-blog-link">
          Dicas & Ideias
        </Link>
        <Link to="/galeria" className="text-gray-400 hover:text-white transition-colors underline">
          Galeria
        </Link>
        <Link to="/perguntas-frequentes" className="text-gray-400 hover:text-white transition-colors underline">
          Perguntas Frequentes
        </Link>
        <button onClick={onOpenPrivacy} className="text-gray-400 hover:text-white transition-colors underline">
          Política de Privacidade
        </button>
        <button onClick={onOpenTerms} className="text-gray-400 hover:text-white transition-colors underline">
          Termos e Condições
        </button>
        <a href="https://www.livroreclamacoes.pt/Inicio/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors underline">
          Livro de Reclamações
        </a>
      </div>

      <p className="text-gray-500 text-sm">
        © {new Date().getFullYear()} Espaço Girafinha. Todos os direitos reservados.
      </p>
    </div>
  </footer>
);

export default SiteFooter;
