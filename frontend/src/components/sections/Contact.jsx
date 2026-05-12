import React, { useState } from 'react';
import { Phone, Instagram, Facebook, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { contactInfo } from '../../data/mock';
import { useWhatsApp } from '../../hooks/useWhatsApp';

const Contact = () => {
  const { openWhatsApp } = useWhatsApp();
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', message: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Olá! Sou ${formData.name}.\nTelefone: ${formData.phone}\nEmail: ${formData.email}\n\nMensagem: ${formData.message}`;
    openWhatsApp(msg);
  };

  return (
    <section id="contacto" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Reserve a Festa dos Sonhos</h3>
          <div className="w-24 h-1 bg-teal-500 mx-auto rounded-full mb-4"></div>
          <p className="text-xl text-gray-600 mb-2">Pronto para criar memórias inesquecíveis?</p>
          <p className="text-lg text-teal-600 font-bold animate-pulse mb-2">
            ⚠️ Vagas limitadas — garanta já a sua data preferida!
          </p>
          <p className="text-base text-green-600 font-semibold">⏱️ Resposta rápida em poucas horas</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h4 className="text-2xl font-bold text-gray-900 mb-6">Fale Connosco</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <Phone className="h-6 w-6 text-teal-600" />
                </div>
                <div>
                  <a href={`tel:${contactInfo.phone}`} className="text-gray-700 hover:text-teal-600 font-semibold">
                    {contactInfo.phone}
                  </a>
                  <p className="text-xs text-gray-500">(custo de chamada para rede móvel nacional)</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <Instagram className="h-6 w-6 text-teal-600" />
                </div>
                <a
                  href={`https://instagram.com/${contactInfo.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-teal-600 font-semibold">
                  @{contactInfo.instagram}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <Facebook className="h-6 w-6 text-teal-600" />
                </div>
                <a
                  href={contactInfo.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-teal-600 font-semibold">
                  Girafinha Decoração
                </a>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                  <MapPin className="h-6 w-6 text-teal-600" />
                </div>
                <span className="text-gray-700 font-semibold">{contactInfo.address}</span>
              </div>
            </div>

            <div className="mt-8 p-6 bg-teal-50 rounded-xl border-2 border-teal-200">
              <p className="text-gray-800 font-semibold mb-2">💡 Resposta rápida garantida!</p>
              <p className="text-gray-600 text-sm">
                Respondemos a todas as mensagens em menos de 2 horas durante o horário comercial
              </p>
            </div>
          </div>

          <div>
            <form onSubmit={handleSubmit} className="space-y-4" data-testid="contact-form">
              <Input
                type="text"
                name="name"
                placeholder="Nome completo"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="border-teal-200 focus:border-teal-600 h-12"
              />
              <Input
                type="tel"
                name="phone"
                placeholder="Telefone / WhatsApp"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="border-teal-200 focus:border-teal-600 h-12"
              />
              <Input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="border-teal-200 focus:border-teal-600 h-12"
              />
              <Textarea
                name="message"
                placeholder="Conte-nos sobre a festa que imagina (data pretendida, número de crianças, tema...)"
                rows={5}
                value={formData.message}
                onChange={handleInputChange}
                required
                className="border-teal-200 focus:border-teal-600"
              />
              <Button
                type="submit"
                data-testid="contact-submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white py-7 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl">
                💬 Pedir Orçamento por WhatsApp
              </Button>
              <p className="text-xs text-center text-gray-500">
                Ao enviar, será redirecionado para o WhatsApp com a sua mensagem pronta
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
