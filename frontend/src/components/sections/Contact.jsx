import React from 'react';
import { CalendarCheck, Facebook, Instagram, MapPin, MessageCircle, Phone } from 'lucide-react';
import { Button } from '../ui/button';
import { contactInfo } from '../../data/mock';
import { useWhatsApp } from '../../hooks/useWhatsApp';

const Contact = () => {
  const { openWhatsApp } = useWhatsApp();

  return (
    <section id="contacto" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Reserve a Festa dos Sonhos</h3>
          <div className="w-24 h-1 bg-teal-500 mx-auto rounded-full mb-4"></div>
          <p className="text-xl text-gray-600 mb-2">Pronto para criar memórias inesquecíveis?</p>
          <p className="text-lg text-teal-600 font-bold animate-pulse mb-2">
            Vagas limitadas - garanta já a sua data preferida!
          </p>
          <p className="text-base text-green-600 font-semibold">Resposta rápida em poucas horas</p>
        </div>

        <div className="grid md:grid-cols-[1fr_1.05fr] gap-12 items-start">
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
              <p className="text-gray-800 font-semibold mb-2">Resposta rápida garantida</p>
              <p className="text-gray-600 text-sm">
                Respondemos a todas as mensagens em menos de 2 horas durante o horário comercial.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-teal-100 bg-gradient-to-br from-teal-50 via-white to-pink-50 p-6 shadow-sm">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white">
                <CalendarCheck className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-gray-900">Quer reservar uma data?</h4>
                <p className="mt-3 text-gray-600">
                  Use a pré-reserva para nos enviar a data, horário, pacote e contactos. Assim recebemos tudo organizado
                  e conseguimos responder mais depressa.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <Button
                asChild
                data-testid="contact-reservation-link"
                className="w-full rounded-full bg-green-600 py-7 text-lg font-bold text-white shadow-xl hover:bg-green-700 hover:shadow-2xl">
                <a href="#pre-reserva">Preencher pré-reserva</a>
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => openWhatsApp()}
                className="w-full rounded-full border-teal-200 py-6 text-base font-bold text-teal-700 hover:bg-teal-50">
                <MessageCircle className="mr-2 h-5 w-5" />
                Falar por WhatsApp
              </Button>
            </div>

            <p className="mt-4 text-center text-xs text-gray-500">
              O formulário antigo foi substituído pela pré-reserva para evitar pedidos duplicados.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
