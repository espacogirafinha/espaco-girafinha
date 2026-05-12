#!/usr/bin/env node
/**
 * Gera o sitemap.xml automaticamente a partir de src/data/blog.js
 * Uso: yarn sitemap
 */
const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://espacogirafinha.pt';
const blogModulePath = path.resolve(__dirname, '../src/data/blog.js');

// Lê o ficheiro blog.js e extrai posts via regex simples (não exec)
const blogSource = fs.readFileSync(blogModulePath, 'utf-8');
const postBlocks = [...blogSource.matchAll(/slug:\s*"([^"]+)"[\s\S]*?image:\s*"([^"]+)"[\s\S]*?date:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"/g)];

// Outro padrão (caso a ordem dos campos varie)
const posts = [...blogSource.matchAll(/{\s*id:\s*\d+,\s*slug:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"[\s\S]*?image:\s*"([^"]+)"[\s\S]*?date:\s*"([^"]+)"/g)].map((m) => ({
  slug: m[1],
  title: m[2],
  image: m[3],
  date: m[4],
}));

const staticUrls = [
  { loc: `${SITE_URL}/`, changefreq: 'weekly', priority: '1.0' },
  { loc: `${SITE_URL}/dicas`, changefreq: 'weekly', priority: '0.8' },
];

const xmlHeader = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/0.9">`;

const xmlUrls = [
  ...staticUrls.map((u) => `
  <url>
    <loc>${u.loc}</loc>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`),
  ...posts.map((p) => `
  <url>
    <loc>${SITE_URL}/dicas/${p.slug}</loc>
    <lastmod>${p.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
    <image:image>
      <image:loc>${SITE_URL}${p.image}</image:loc>
      <image:title>${p.title.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</image:title>
    </image:image>
  </url>`),
];

const xml = `${xmlHeader}${xmlUrls.join('')}\n\n</urlset>\n`;

const outPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(outPath, xml, 'utf-8');
console.log(`✅ sitemap.xml gerado com ${posts.length} artigos + ${staticUrls.length} páginas estáticas → ${outPath}`);
