import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useWhatsApp } from '../../hooks/useWhatsApp';

const CATEGORIES = [
  { key: 'Espaço & Crianças felizes', label: 'Espaço & Crianças felizes', carouselId: 'carousel-espaco' },
  { key: 'Decoração', label: 'Decoração', carouselId: 'carousel-decoracao' },
  { key: 'Catering', label: 'Catering', carouselId: 'carousel-catering' },
];

const GalleryCategory = ({ label, carouselId, images }) => {
  const [active, setActive] = useState(0);

  const scrollCarousel = (direction) => {
    const el = document.getElementById(carouselId);
    if (!el) return;
    const scrollAmount = el.offsetWidth * 0.8;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const scrollToIndex = (index) => {
    const el = document.getElementById(carouselId);
    if (!el) return;
    const cardWidth = el.scrollWidth / images.length;
    el.scrollTo({ left: cardWidth * index, behavior: 'smooth' });
    setActive(index);
  };

  return (
    <div className="mb-16">
      <h4 className="text-2xl font-bold text-gray-900 mb-6 px-4">{label}</h4>
      <div className="relative group/carousel">
        <button
          onClick={() => scrollCarousel('left')}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300"
          aria-label="Anterior">
          <ChevronLeft className="w-6 h-6 text-teal-600" />
        </button>
        <button
          onClick={() => scrollCarousel('right')}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300"
          aria-label="Próximo">
          <ChevronRight className="w-6 h-6 text-teal-600" />
        </button>

        <div id={carouselId} className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-4 md:gap-6 px-4 md:px-0 snap-x snap-mandatory">
            {images.map((image) => (
              <div key={image.id} className="flex-none w-[85vw] sm:w-[45vw] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)] snap-center">
                <div className="relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 aspect-square group cursor-pointer">
                  <img
                    src={image.src}
                    alt={image.alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-white text-sm font-semibold">{image.alt}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dots Indicator - Mobile Only */}
        <div className="flex md:hidden justify-center gap-2 mt-4">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => scrollToIndex(index)}
              className={`transition-all duration-300 rounded-full ${
                index === active ? 'w-6 h-2 bg-teal-600' : 'w-2 h-2 bg-gray-300'
              }`}
              aria-label={`Imagem ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const Gallery = ({ galleryImages = [] }) => {
  const { openWhatsApp } = useWhatsApp();

  return (
    <section id="galeria" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Galeria de Momentos Felizes</h3>
          <div className="w-24 h-1 bg-teal-500 mx-auto rounded-full mb-4"></div>
          <p className="text-xl text-gray-600">Fotos reais das festas realizadas no nosso espaço — momentos inesquecíveis!</p>
        </div>

        {CATEGORIES.map((cat) => (
          <GalleryCategory
            key={cat.key}
            label={cat.label}
            carouselId={cat.carouselId}
            images={galleryImages.filter((img) => img.category === cat.key)}
          />
        ))}

        <div className="text-center mt-16">
          <p className="text-lg text-gray-600 mb-4">Quer ver a sua festa aqui? 📸</p>
          <Button
            size="lg"
            data-testid="gallery-cta"
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-6 rounded-full font-semibold"
            onClick={() => openWhatsApp()}>
            Reserve Já a Sua Data
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
