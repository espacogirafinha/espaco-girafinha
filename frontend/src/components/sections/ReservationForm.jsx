import React, { useState } from 'react';
import { CalendarDays, MessageCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { supabase, isSupabaseConfigured } from '../../lib/supabase';
import { useWhatsApp } from '../../hooks/useWhatsApp';

const timeSlots = ['Manhã: 10h - 13h', 'Tarde: 16h - 19h', 'Ainda não sei'];

const ReservationForm = ({ packages = [] }) => {
  const { openWhatsApp } = useWhatsApp();
  const [form, setForm] = useState({
    parent_name: '',
    child_name: '',
    phone: '',
    email: '',
    event_date: '',
    event_time: '',
    package_name: '',
    guests_count: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  const update = (name, value) => setForm((current) => ({ ...current, [name]: value }));

  const buildWhatsAppMessage = () => [
    'Olá! Gostaria de fazer uma pré-reserva no Espaço Girafinha.',
    `Nome: ${form.parent_name}`,
    form.child_name ? `Criança/aniversariante: ${form.child_name}` : '',
    `Telefone: ${form.phone}`,
    form.email ? `Email: ${form.email}` : '',
    form.event_date ? `Data pretendida: ${form.event_date}` : '',
    form.event_time ? `Horário: ${form.event_time}` : '',
    form.package_name ? `Pacote: ${form.package_name}` : '',
    form.guests_count ? `Nº estimado de convidados: ${form.guests_count}` : '',
    form.message ? `Mensagem: ${form.message}` : '',
  ].filter(Boolean).join('\n');

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setStatus({ type: '', message: '' });

    if (isSupabaseConfigured) {
      const payload = {
        ...form,
        guests_count: form.guests_count ? Number(form.guests_count) : null,
        event_date: form.event_date || null,
        status: 'novo',
      };
      const { error } = await supabase.from('reservation_leads').insert(payload);
      if (error) {
        setStatus({ type: 'error', message: 'Não foi possível guardar a pré-reserva. O WhatsApp vai abrir para não perdermos o pedido.' });
      } else {
        setStatus({ type: 'success', message: 'Pré-reserva recebida. Vamos abrir o WhatsApp com a mensagem pronta.' });
      }
    }

    openWhatsApp(buildWhatsAppMessage());
    setSubmitting(false);
  };

  return (
    <section id="pre-reserva" className="py-20 px-4 bg-gradient-to-b from-white to-teal-50">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-teal-100 px-4 py-2 text-sm font-bold text-teal-700">
            <CalendarDays className="h-4 w-4" /> Pré-reserva
          </div>
          <h3 className="mt-4 text-4xl font-bold text-gray-900">Veja disponibilidade para a sua data</h3>
          <p className="mt-3 text-lg text-gray-600">Preencha os dados principais e respondemos com confirmação pelo WhatsApp.</p>
        </div>

        <form onSubmit={submit} className="grid gap-4 rounded-2xl border border-teal-100 bg-white p-5 md:p-8 shadow-lg" data-testid="reservation-form">
          <div className="grid md:grid-cols-2 gap-4">
            <Input placeholder="Nome do responsável" value={form.parent_name} onChange={(e) => update('parent_name', e.target.value)} required />
            <Input placeholder="Nome da criança" value={form.child_name} onChange={(e) => update('child_name', e.target.value)} />
            <Input type="tel" placeholder="Telefone / WhatsApp" value={form.phone} onChange={(e) => update('phone', e.target.value)} required />
            <Input type="email" placeholder="Email" value={form.email} onChange={(e) => update('email', e.target.value)} />
            <Input type="date" value={form.event_date} onChange={(e) => update('event_date', e.target.value)} />
            <select value={form.event_time} onChange={(e) => update('event_time', e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="">Horário pretendido</option>
              {timeSlots.map((slot) => <option key={slot} value={slot}>{slot}</option>)}
            </select>
            <select value={form.package_name} onChange={(e) => update('package_name', e.target.value)} className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm">
              <option value="">Pacote pretendido</option>
              {packages.map((pkg) => <option key={pkg.id} value={pkg.name}>{pkg.name}</option>)}
              <option value="Ainda não sei">Ainda não sei</option>
            </select>
            <Input type="number" min="1" placeholder="Nº estimado de convidados" value={form.guests_count} onChange={(e) => update('guests_count', e.target.value)} />
          </div>
          <Textarea placeholder="Tema, idade, dúvidas ou detalhes importantes" rows={4} value={form.message} onChange={(e) => update('message', e.target.value)} />
          {status.message && (
            <p className={`rounded-md p-3 text-sm ${status.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
              {status.message}
            </p>
          )}
          <Button type="submit" disabled={submitting} className="bg-green-600 hover:bg-green-700 text-white rounded-full py-6 text-base font-bold">
            <MessageCircle className="h-5 w-5 mr-2" /> {submitting ? 'A enviar...' : 'Enviar pré-reserva'}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ReservationForm;
