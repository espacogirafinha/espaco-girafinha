import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { testimonials } from '../../data/mock';

const Testimonials = () => {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Scroll carousel when index changes
  useEffect(() => {
    const carousel = document.getElementById('testimonials-carousel');
    if (carousel) {
      const cardWidth = carousel.scrollWidth / testimonials.length;
      carousel.scrollTo({ left: cardWidth * current, behavior: 'smooth' });
    }
  }, [current]);

  return (
    <section className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">O que dizem os pais</h3>
          <div className="w-24 h-1 bg-teal-500 mx-auto rounded-full mb-4"></div>
          <p className="text-xl text-gray-600">Experiências reais de famílias que confiaram em nós</p>
        </div>

        <div className="relative group/testimonials">
          <button
            onClick={() => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 opacity-0 group-hover/testimonials:opacity-100 transition-opacity duration-300"
            aria-label="Anterior">
            <ChevronLeft className="w-6 h-6 text-teal-600" />
          </button>
          <button
            onClick={() => setCurrent((p) => (p + 1) % testimonials.length)}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-3 opacity-0 group-hover/testimonials:opacity-100 transition-opacity duration-300"
            aria-label="Próximo">
            <ChevronRight className="w-6 h-6 text-teal-600" />
          </button>

          <div id="testimonials-carousel" className="overflow-x-auto scrollbar-hide">
            <div className="flex gap-6 px-4 md:px-0">
              {testimonials.map((t, index) => (
                <div key={t.id} className="flex-none w-[90vw] sm:w-[70vw] md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]">
                  <Card className={`bg-white border-2 hover:shadow-2xl transition-all duration-500 h-full ${
                    index === current ? 'border-teal-300 shadow-xl scale-105' : 'border-gray-100 hover:border-teal-200'
                  }`}>
                    <CardHeader>
                      <div className="flex gap-1 mb-4">
                        {[...Array(t.rating)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 fill-teal-500" viewBox="0 0 20 20">
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        ))}
                      </div>
                      <Quote className="h-8 w-8 text-teal-200 mb-2" />
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-700 leading-relaxed mb-6 italic">"{t.text}"</p>
                      <div className="border-t border-gray-200 pt-4">
                        <p className="font-bold text-gray-900">{t.author}</p>
                        <p className="text-sm text-gray-600">{t.location}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === current ? 'w-8 h-3 bg-teal-600' : 'w-3 h-3 bg-gray-300 hover:bg-teal-400'
                }`}
                aria-label={`Ir para avaliação ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Google Reviews CTA */}
        <div className="text-center mt-12">
          <a
            href="https://share.google/WJZdIImo9oEzcB9ny"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-teal-50 hover:bg-teal-100 rounded-full px-6 py-3 border-2 border-teal-200 hover:border-teal-300 transition-all duration-300 hover:shadow-lg">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-teal-500" viewBox="0 0 20 20">
                  <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-800 font-semibold">5.0 • 17 Avaliações no Google</span>
          </a>
          <p className="text-sm text-gray-600 mt-3">⭐ Lê mais avaliações no Google Reviews</p>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
