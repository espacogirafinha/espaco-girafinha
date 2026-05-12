import React from 'react';
import { contactInfo } from '../../data/mock';

const ModalShell = ({ title, onClose, children }) => (
  <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4" onClick={onClose}>
    <div className="bg-white rounded-lg max-w-3xl max-h-[80vh] overflow-y-auto p-6 md:p-8" onClick={(e) => e.stopPropagation()}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Fechar">
          <span className="text-3xl">×</span>
        </button>
      </div>
      <div className="prose prose-sm max-w-none text-gray-700 space-y-4">
        <p className="text-sm text-gray-500">Última atualização: {new Date().toLocaleDateString('pt-PT')}</p>
        {children}
        <div className="mt-8 pt-6 border-t">
          <button
            onClick={onClose}
            className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Fechar
          </button>
        </div>
      </div>
    </div>
  </div>
);

export const PrivacyModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <ModalShell title="Política de Privacidade" onClose={onClose}>
      <h3 className="font-bold text-lg mt-6">1. Informações que Recolhemos</h3>
      <p>O Espaço Girafinha recolhe informações pessoais quando você:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Preenche o formulário de contacto (nome, telefone, email, mensagem)</li>
        <li>Entra em contacto via WhatsApp ou telefone</li>
        <li>Visita o nosso website (através de cookies de navegação)</li>
      </ul>

      <h3 className="font-bold text-lg mt-6">2. Como Utilizamos os Seus Dados</h3>
      <p>Os seus dados pessoais são utilizados para:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Responder aos seus pedidos de informação e orçamentos</li>
        <li>Processar reservas de festas e eventos</li>
        <li>Comunicar sobre os nossos serviços e promoções (com o seu consentimento)</li>
        <li>Melhorar a experiência do website</li>
      </ul>

      <h3 className="font-bold text-lg mt-6">3. Proteção de Dados</h3>
      <p>O Espaço Girafinha compromete-se a proteger os seus dados pessoais. Implementamos medidas de segurança técnicas e organizacionais adequadas para proteger as suas informações contra acesso não autorizado, perda ou destruição.</p>

      <h3 className="font-bold text-lg mt-6">4. Os Seus Direitos (RGPD)</h3>
      <p>De acordo com o Regulamento Geral sobre a Proteção de Dados (RGPD), tem o direito de:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Aceder aos seus dados pessoais</li>
        <li>Retificar dados incorretos</li>
        <li>Eliminar os seus dados ("direito ao esquecimento")</li>
        <li>Limitar o processamento dos seus dados</li>
        <li>Portabilidade dos dados</li>
        <li>Opor-se ao processamento</li>
      </ul>

      <h3 className="font-bold text-lg mt-6">5. Partilha de Dados</h3>
      <p>Não vendemos, alugamos ou partilhamos os seus dados pessoais com terceiros para fins de marketing. Os seus dados podem ser partilhados apenas com:</p>
      <ul className="list-disc pl-5 space-y-2">
        <li>Fornecedores de serviços essenciais (ex: hosting)</li>
        <li>Autoridades legais, quando legalmente obrigatório</li>
      </ul>

      <h3 className="font-bold text-lg mt-6">6. Cookies</h3>
      <p>O nosso website utiliza cookies essenciais para o funcionamento do site. Não utilizamos cookies de tracking ou publicidade.</p>

      <h3 className="font-bold text-lg mt-6">7. Contacto</h3>
      <p>Para exercer os seus direitos ou esclarecer dúvidas sobre privacidade:</p>
      <p className="font-semibold">WhatsApp/Telefone: {contactInfo.phone}</p>
      <p className="font-semibold">Instagram: @{contactInfo.instagram}</p>
    </ModalShell>
  );
};

export const TermsModal = ({ open, onClose }) => {
  if (!open) return null;
  return (
    <ModalShell title="Termos e Condições" onClose={onClose}>
      <h3 className="font-bold text-lg mt-6">1. Serviços Prestados</h3>
      <p>O Espaço Girafinha oferece serviços de aluguer de espaço para festas infantis, incluindo decoração, animação, catering e outras atividades conforme descrito nos pacotes disponíveis.</p>

      <h3 className="font-bold text-lg mt-6">2. Reservas e Pagamento</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>A reserva é confirmada mediante pagamento de <strong>20% do valor total</strong> do pacote escolhido</li>
        <li>O pagamento restante (80%) deve ser efetuado <strong>no dia do evento</strong></li>
        <li>O sinal de reserva <strong>não é reembolsável</strong> em caso de cancelamento</li>
        <li>Recomendamos reservas com pelo menos 5 semanas de antecedência</li>
      </ul>

      <h3 className="font-bold text-lg mt-6">3. Cancelamentos e Alterações</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>O depósito de reserva (20%) não é reembolsável</li>
        <li>Alterações de data estão sujeitas a disponibilidade</li>
        <li>Pedidos de alteração devem ser comunicados com antecedência mínima de 15 dias</li>
      </ul>

      <h3 className="font-bold text-lg mt-6">4. Capacidade e Horários</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Capacidade máxima: 50 pessoas (adultos + crianças)</li>
        <li>Horários disponíveis: Manhã (10h-13h) / Tarde (16h-19h)</li>
        <li>Horas extra: 75€ por hora adicional</li>
        <li>Tolerância de 15 minutos no final do horário</li>
      </ul>

      <h3 className="font-bold text-lg mt-6">5. Decoração e Personalização</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>É permitido trazer decoração própria</li>
        <li>Fixação de decoração deve ser feita sem danificar as instalações</li>
        <li>Proibido uso de confetti, glitter ou materiais de difícil limpeza</li>
        <li>Decoração fornecida pelo Espaço Girafinha (em pacotes com decoração incluída) será montada e desmontada pela nossa equipa</li>
      </ul>

      <h3 className="font-bold text-lg mt-6">6. Catering e Alimentos</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>É permitido trazer comida e bolo próprios</li>
        <li>Catering fornecido pelo Espaço Girafinha é preparado com ingredientes de qualidade</li>
        <li>Alergias e restrições alimentares devem ser comunicadas com antecedência</li>
      </ul>

      <h3 className="font-bold text-lg mt-6">7. Responsabilidade e Segurança</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>O Espaço Girafinha não se responsabiliza por objetos pessoais perdidos ou danificados</li>
        <li>Os pais/responsáveis devem supervisionar as crianças durante o evento</li>
        <li>Danos às instalações ou equipamentos serão cobrados aos responsáveis</li>
        <li>O espaço dispõe de seguro de responsabilidade civil</li>
      </ul>

      <h3 className="font-bold text-lg mt-6">8. Regras do Espaço</h3>
      <ul className="list-disc pl-5 space-y-2">
        <li>Proibido fumar em todo o espaço</li>
        <li>Proibido consumo de bebidas alcoólicas em excesso</li>
        <li>Respeitar os horários acordados</li>
        <li>Deixar o espaço nas condições em que foi encontrado</li>
      </ul>

      <h3 className="font-bold text-lg mt-6">9. Contacto</h3>
      <p>Para dúvidas ou esclarecimentos:</p>
      <p className="font-semibold">WhatsApp/Telefone: {contactInfo.phone}</p>
      <p className="font-semibold">Instagram: @{contactInfo.instagram}</p>
    </ModalShell>
  );
};
