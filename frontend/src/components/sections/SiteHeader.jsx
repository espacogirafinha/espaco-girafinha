import React from 'react';
import { Link } from 'react-router-dom';

const SiteHeader = () => (
  <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md shadow-sm z-50">
    <div className="container mx-auto px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/Logotipo girafinha  (1).png" alt="Espaço Girafinha" className="h-12 w-auto" />
          <div>
            <h1 className="text-xl font-bold text-teal-600">Espaço Girafinha</h1>
            <p className="text-xs text-gray-600">Silves, Algarve</p>
          </div>
        </div>
        <nav className="hidden md:flex gap-6 items-center">
          <a href="#sobre" className="text-gray-700 hover:text-teal-500 transition-colors">Sobre</a>
          <a href="#pacotes" className="text-gray-700 hover:text-teal-500 transition-colors">Pacotes</a>
          <a href="#galeria" className="text-gray-700 hover:text-teal-500 transition-colors">Galeria</a>
          <Link to="/dicas" className="text-teal-600 font-semibold hover:text-teal-700 transition-colors" data-testid="nav-dicas">Dicas & Ideias</Link>
          <a href="#contacto" className="text-gray-700 hover:text-teal-500 transition-colors">Contacto</a>
        </nav>
      </div>
    </div>
  </header>
);

export default SiteHeader;
