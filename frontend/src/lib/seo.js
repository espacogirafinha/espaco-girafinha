export const siteUrl = 'https://espacogirafinha.pt';

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${siteUrl}/#localbusiness`,
  name: 'Espaço Girafinha',
  url: siteUrl,
  image: `${siteUrl}/hero-party.jpg`,
  telephone: '+351930650082',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Silves',
    addressRegion: 'Algarve',
    addressCountry: 'PT',
  },
  areaServed: ['Silves', 'Algarve', 'Portimão', 'Lagoa', 'Albufeira'],
  priceRange: '€€',
  sameAs: [
    'https://www.instagram.com/espacogirafinha.silves',
    'https://www.facebook.com/p/Girafinha-decora%C3%A7%C3%A3o-61559630369569/',
  ],
};

export const partyServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  serviceType: 'Festas infantis e aluguer de espaço para festas',
  provider: { '@id': `${siteUrl}/#localbusiness` },
  areaServed: {
    '@type': 'AdministrativeArea',
    name: 'Algarve',
  },
  offers: {
    '@type': 'AggregateOffer',
    lowPrice: '220',
    highPrice: '500',
    priceCurrency: 'EUR',
  },
};

export function setPageMeta({ title, description, path = '/', image = '/hero-party.jpg', type = 'website' }) {
  document.title = title;
  const absoluteUrl = `${siteUrl}${path}`;
  const absoluteImage = image.startsWith('http') ? image : `${siteUrl}${image}`;
  const setMeta = (selector, attr, value) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };

  setMeta('meta[name="description"]', 'content', description);
  setMeta('meta[property="og:title"]', 'content', title);
  setMeta('meta[property="og:description"]', 'content', description);
  setMeta('meta[property="og:url"]', 'content', absoluteUrl);
  setMeta('meta[property="og:type"]', 'content', type);
  setMeta('meta[property="og:image"]', 'content', absoluteImage);
  setMeta('meta[name="twitter:title"]', 'content', title);
  setMeta('meta[name="twitter:description"]', 'content', description);
  setMeta('meta[name="twitter:image"]', 'content', absoluteImage);
}
