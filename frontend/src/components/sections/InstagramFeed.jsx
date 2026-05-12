import React from 'react';
import { Instagram } from 'lucide-react';
import { contactInfo } from '../../data/mock';

const InstagramFeed = () => (
  <section className="py-20 px-4 bg-gradient-to-b from-white to-teal-50">
    <div className="container mx-auto max-w-4xl text-center">
      <div className="mb-8">
        <h3 className="text-4xl font-bold text-gray-900 mb-4">Segue-nos no Instagram</h3>
        <div className="w-24 h-1 bg-teal-500 mx-auto rounded-full mb-4"></div>
        <p className="text-xl text-gray-600">Vê as festas mais recentes e inspira-te!</p>
      </div>

      <a
        href={`https://instagram.com/${contactInfo.instagram}`}
        target="_blank"
        rel="noopener noreferrer"
        className="group inline-block">
        <div className="bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 p-1 rounded-3xl hover:shadow-2xl transition-all duration-300">
          <div className="bg-white rounded-3xl p-8 group-hover:scale-105 transition-transform duration-300">
            <Instagram className="h-16 w-16 text-gray-800 mx-auto mb-4" />
            <p className="text-2xl font-bold text-gray-900 mb-2">@{contactInfo.instagram}</p>
            <p className="text-gray-600 mb-4">Festas • Decoração • Momentos Felizes</p>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full font-semibold">
              <Instagram className="h-5 w-5" />
              Seguir no Instagram
            </div>
          </div>
        </div>
      </a>

      <p className="text-gray-600 mt-6">📸 Vê vídeos e fotos das nossas festas</p>
    </div>
  </section>
);

export default InstagramFeed;
