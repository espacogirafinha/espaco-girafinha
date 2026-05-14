import React, { useEffect } from 'react';
import BlogLayout from '../components/BlogLayout';
import FAQ from '../components/sections/FAQ';
import { useSiteContent } from '../hooks/useSiteContent';
import { setPageMeta, siteUrl } from '../lib/seo';

const FAQPage = () => {
  const { content } = useSiteContent();

  useEffect(() => {
    setPageMeta({
      title: 'Perguntas Frequentes | Espaço Girafinha',
      description:
        'Perguntas frequentes sobre festas infantis no Espaço Girafinha: reservas, horários, pacotes, catering, decoração e condições.',
      path: '/perguntas-frequentes',
    });
  }, []);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
    url: `${siteUrl}/perguntas-frequentes`,
  };

  return (
    <BlogLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <FAQ faqs={content.faqs} />
    </BlogLayout>
  );
};

export default FAQPage;
