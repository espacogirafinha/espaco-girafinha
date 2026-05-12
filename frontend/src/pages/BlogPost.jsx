import React, { useEffect, useState } from 'react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft, MessageCircle, Tag, Share2, Facebook } from 'lucide-react';
import BlogLayout from '../components/BlogLayout';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { getPostBySlug, getRelatedPosts } from '../data/blog';
import { contactInfo } from '../data/mock';

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString('pt-PT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  } catch {
    return iso;
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = getPostBySlug(slug);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!post) return;

    document.title = `${post.title} | Espaço Girafinha`;

    const setMeta = (selector, attr, value) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', 'content', post.excerpt);
    setMeta('meta[property="og:title"]', 'content', post.title);
    setMeta('meta[property="og:description"]', 'content', post.excerpt);
    setMeta('meta[property="og:image"]', 'content', `https://espacogirafinha.pt${post.image}`);
    setMeta('meta[property="og:url"]', 'content', `https://espacogirafinha.pt/dicas/${post.slug}`);
    setMeta('meta[property="og:type"]', 'content', 'article');
    setMeta('meta[name="twitter:title"]', 'content', post.title);
    setMeta('meta[name="twitter:description"]', 'content', post.excerpt);
    setMeta('meta[name="twitter:image"]', 'content', `https://espacogirafinha.pt${post.image}`);

    return () => {
      // Reset og:type back to website when leaving
      setMeta('meta[property="og:type"]', 'content', 'website');
    };
  }, [post]);

  if (!post) return <Navigate to="/dicas" replace />;

  const related = getRelatedPosts(slug, 3);

  const openWhatsApp = () => {
    const msg = `Olá! Vi o artigo "${post.title}" no vosso blog e gostava de saber mais.`;
    window.open(
      `https://wa.me/${contactInfo.whatsapp.replace(/\+/g, '')}?text=${encodeURIComponent(msg)}`,
      '_blank'
    );
  };

  const postUrl = typeof window !== 'undefined'
    ? window.location.href
    : `https://espacogirafinha.pt/dicas/${post.slug}`;

  const shareWhatsApp = () => {
    const text = `📚 ${post.title}\n\n${post.excerpt}\n\nLeia o artigo completo:`;
    window.open(
      `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + postUrl)}`,
      '_blank'
    );
  };

  const shareFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`,
      '_blank',
      'width=600,height=500'
    );
  };

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: select via temporary input
      const input = document.createElement('input');
      input.value = postUrl;
      document.body.appendChild(input);
      input.select();
      try { document.execCommand('copy'); } catch (e) { /* noop */ }
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // BlogPosting JSON-LD
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: [`https://espacogirafinha.pt${post.image}`],
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: 'Espaço Girafinha',
      url: 'https://espacogirafinha.pt',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Espaço Girafinha',
      logo: {
        '@type': 'ImageObject',
        url: 'https://espacogirafinha.pt/android-chrome-512x512.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://espacogirafinha.pt/dicas/${post.slug}`,
    },
    keywords: post.tags.join(', '),
  };

  return (
    <BlogLayout>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }} />

      {/* Back link */}
      <div className="container mx-auto max-w-4xl px-4 pt-6">
        <Link
          to="/dicas"
          data-testid="back-to-blog-link"
          className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-semibold mb-6">
          <ArrowLeft className="h-4 w-4" /> Voltar ao blog
        </Link>
      </div>

      {/* Hero image + title */}
      <article className="container mx-auto max-w-4xl px-4 pb-12">
        <div className="aspect-[16/9] rounded-3xl overflow-hidden shadow-xl mb-8 bg-gray-100">
          <img src={post.image} alt={post.imageAlt} className="w-full h-full object-cover" />
        </div>

        <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">{post.category}</Badge>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> {formatDate(post.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" /> {post.readTime} de leitura
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight" data-testid="post-title">
          {post.title}
        </h1>

        <p className="text-lg text-gray-700 mb-8 leading-relaxed italic border-l-4 border-teal-500 pl-4">
          {post.excerpt}
        </p>

        {/* Article content */}
        <div
          data-testid="post-content"
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-li:leading-relaxed prose-strong:text-teal-700 prose-a:text-teal-600 prose-ul:my-4"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mt-10 pt-6 border-t border-gray-200">
            <Tag className="h-4 w-4 text-gray-500" />
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="bg-teal-50 text-teal-700 hover:bg-teal-50">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        {/* Share buttons */}
        <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-5 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Share2 className="h-5 w-5 text-teal-600" />
            <h3 className="text-base md:text-lg font-bold text-gray-900">Gostou? Partilhe com outros pais!</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={shareWhatsApp}
              data-testid="share-whatsapp-button"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-sm">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </button>
            <button
              onClick={shareFacebook}
              data-testid="share-facebook-button"
              className="inline-flex items-center gap-2 bg-[#1877F2] hover:bg-[#0e64d2] text-white px-4 py-2.5 rounded-full text-sm font-semibold transition-colors shadow-sm">
              <Facebook className="h-4 w-4" /> Facebook
            </button>
            <button
              onClick={copyLink}
              data-testid="share-copy-link-button"
              className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold transition-colors border ${
                copied
                  ? 'bg-teal-50 text-teal-700 border-teal-300'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}>
              <Share2 className="h-4 w-4" /> {copied ? 'Link copiado!' : 'Copiar link'}
            </button>
          </div>
        </div>

        {/* Inline CTA */}
        <div className="mt-10 bg-gradient-to-br from-teal-50 to-yellow-50 rounded-2xl p-6 md:p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">Gostou destas dicas?</h3>
          <p className="text-gray-700 mb-6">
            Fale connosco e ajudamos a transformar estas ideias numa festa inesquecível.
          </p>
          <Button
            size="lg"
            onClick={openWhatsApp}
            data-testid="post-cta-whatsapp"
            className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-base rounded-full font-bold shadow-lg">
            <MessageCircle className="h-5 w-5 mr-2" /> Pedir Orçamento
          </Button>
        </div>
      </article>

      {/* Related posts */}
      {related.length > 0 && (
        <section className="px-4 py-12 md:py-16 bg-white">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
              Outros artigos que pode gostar
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Card key={p.id} className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all">
                  <Link to={`/dicas/${p.slug}`} className="block">
                    <div className="aspect-[16/10] overflow-hidden bg-gray-100">
                      <img src={p.image} alt={p.imageAlt} loading="lazy" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                    </div>
                    <CardContent className="p-5">
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 text-xs mb-2">
                        {p.category}
                      </Badge>
                      <h3 className="text-lg font-bold text-gray-900 leading-snug hover:text-teal-600 transition-colors">
                        {p.title}
                      </h3>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </BlogLayout>
  );
};

export default BlogPost;
