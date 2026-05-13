import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Sobre', href: '#sobre' },
  { label: 'Pacotes', href: '#pacotes' },
  { label: 'Galeria', href: '#galeria' },
  { label: 'Contacto', href: '#contacto' },
];

const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
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
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className="text-gray-700 hover:text-teal-500 transition-colors">
                {item.label}
              </a>
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
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={close}
                className="block rounded-lg px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-teal-50 hover:text-teal-700">
                {item.label}
              </a>
            ))}
            <Link
              to="/dicas"
              onClick={close}
              className="block rounded-lg px-4 py-3 text-sm font-semibold text-teal-700 hover:bg-teal-50"
              data-testid="mobile-nav-dicas">
              Dicas & Ideias
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default SiteHeader;
