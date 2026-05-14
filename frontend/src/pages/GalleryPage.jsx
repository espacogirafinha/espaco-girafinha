import React, { useEffect } from 'react';
import BlogLayout from '../components/BlogLayout';
import Gallery from '../components/sections/Gallery';
import { useSiteContent } from '../hooks/useSiteContent';
import { localBusinessSchema, setPageMeta, siteUrl } from '../lib/seo';

const GalleryPage = () => {
  const { content } = useSiteContent();

  useEffect(() => {
    setPageMeta({
      title: 'Galeria de Festas Infantis | Espaço Girafinha',
      description:
        'Veja fotos reais do Espaço Girafinha: espaço para crianças felizes, decoração temática e catering para festas infantis em Silves.',
      path: '/galeria',
      image: '/gallery/festa-aniversario.jpg',
    });
  }, []);

  const gallerySchema = {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: 'Galeria do Espaço Girafinha',
    url: `${siteUrl}/galeria`,
    about: localBusinessSchema,
  };

  return (
    <BlogLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(gallerySchema) }} />
      <Gallery galleryImages={content.gallery} />
    </BlogLayout>
  );
};

export default GalleryPage;
