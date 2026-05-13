import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { ArrowDown, ArrowUp, Copy, Eye, LogOut, Plus, Save, Trash2, Upload } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import { fetchAdminContent, getFallbackContent, tableForKey } from '../lib/cms';

const emptyItems = {
  packages: {
    name: '',
    price: '',
    original_price: '',
    is_promotion: false,
    popular: false,
    schedules: [],
    includes: [],
    extras: [],
    notes: [],
    sort_order: 0,
    is_published: true,
  },
  gallery: {
    src: '',
    alt: '',
    category: 'Espaço & Crianças felizes',
    sort_order: 0,
    is_published: true,
  },
  blog: {
    slug: '',
    title: '',
    excerpt: '',
    image: '',
    image_alt: '',
    date: new Date().toISOString().slice(0, 10),
    read_time: '5 min',
    category: 'Dicas',
    tags: [],
    content: '',
    sort_order: 0,
    is_published: true,
  },
  faqs: {
    question: '',
    answer: '',
    sort_order: 0,
    is_published: true,
  },
  testimonials: {
    text: '',
    author: '',
    location: '',
    rating: 5,
    sort_order: 0,
    is_published: true,
  },
};

const sections = [
  { key: 'packages', label: 'Pacotes' },
  { key: 'gallery', label: 'Galeria' },
  { key: 'blog', label: 'Blog' },
  { key: 'faqs', label: 'FAQ' },
  { key: 'testimonials', label: 'Testemunhos' },
];

const galleryCategories = ['Espaço & Crianças felizes', 'Decoração', 'Catering'];

const fields = {
  packages: [
    ['name', 'Nome'],
    ['price', 'Preço'],
    ['original_price', 'Preço original'],
    ['schedules', 'Horários', 'json'],
    ['includes', 'Inclui', 'json'],
    ['extras', 'Extras', 'json'],
    ['notes', 'Notas', 'json'],
  ],
  gallery: [
    ['src', 'Imagem'],
    ['alt', 'Texto alternativo'],
    ['category', 'Categoria'],
  ],
  blog: [
    ['slug', 'Slug'],
    ['title', 'Título'],
    ['excerpt', 'Resumo', 'textarea'],
    ['image', 'Imagem'],
    ['image_alt', 'Texto alternativo'],
    ['date', 'Data', 'date'],
    ['read_time', 'Tempo de leitura'],
    ['category', 'Categoria'],
    ['tags', 'Tags', 'json'],
    ['content', 'Conteúdo HTML', 'textarea'],
  ],
  faqs: [
    ['question', 'Pergunta'],
    ['answer', 'Resposta', 'textarea'],
  ],
  testimonials: [
    ['text', 'Texto', 'textarea'],
    ['author', 'Nome'],
    ['location', 'Localidade'],
    ['rating', 'Avaliação', 'number'],
  ],
};

const toDbPayload = (key, item) => {
  const payload = { ...item };
  delete payload.id;
  delete payload.created_at;
  delete payload.updated_at;

  if (key === 'packages') {
    payload.original_price = item.original_price ?? item.originalPrice ?? '';
    payload.is_promotion = item.is_promotion ?? item.isPromotion ?? false;
    delete payload.originalPrice;
    delete payload.isPromotion;
  }

  if (key === 'blog') {
    payload.image_alt = item.image_alt ?? item.imageAlt ?? '';
    payload.read_time = item.read_time ?? item.readTime ?? '5 min';
    delete payload.imageAlt;
    delete payload.readTime;
  }

  return payload;
};

const toAdminItem = (key, item) => {
  if (key === 'packages') {
    return {
      ...emptyItems.packages,
      ...item,
      original_price: item.original_price ?? item.originalPrice ?? '',
      is_promotion: item.is_promotion ?? item.isPromotion ?? false,
    };
  }
  if (key === 'blog') {
    return {
      ...emptyItems.blog,
      ...item,
      image_alt: item.image_alt ?? item.imageAlt ?? '',
      read_time: item.read_time ?? item.readTime ?? '5 min',
    };
  }
  return { ...emptyItems[key], ...item };
};

const parseJsonList = (value) => {
  if (Array.isArray(value)) return value;
  if (!value.trim()) return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return value.split('\n').map((line) => line.trim()).filter(Boolean);
  }
};

const arrayMove = (items, from, to) => {
  const next = [...items];
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
};

const ListEditor = ({ label, value = [], onChange }) => {
  const items = Array.isArray(value) ? value : [];

  const updateItem = (index, nextValue) => {
    onChange(items.map((item, itemIndex) => (itemIndex === index ? nextValue : item)));
  };

  const removeItem = (index) => {
    onChange(items.filter((_, itemIndex) => itemIndex !== index));
  };

  const moveItem = (index, direction) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= items.length) return;
    onChange(arrayMove(items, index, nextIndex));
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-semibold text-gray-700">{label}</span>
        <Button type="button" variant="outline" size="sm" onClick={() => onChange([...items, ''])}>
          <Plus className="h-3 w-3 mr-1" /> Adicionar
        </Button>
      </div>
      <div className="mt-2 space-y-2">
        {items.length === 0 && <p className="text-xs text-gray-500 rounded-md border border-dashed p-3">Sem itens nesta lista.</p>}
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <Input value={item} onChange={(event) => updateItem(index, event.target.value)} />
            <button type="button" onClick={() => moveItem(index, -1)} className="rounded-md border p-2 text-gray-600 hover:bg-gray-50" aria-label="Subir item">
              <ArrowUp className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => moveItem(index, 1)} className="rounded-md border p-2 text-gray-600 hover:bg-gray-50" aria-label="Descer item">
              <ArrowDown className="h-4 w-4" />
            </button>
            <button type="button" onClick={() => removeItem(index)} className="rounded-md border p-2 text-red-600 hover:bg-red-50" aria-label="Apagar item">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const BlogPreview = ({ post }) => (
  <div className="rounded-xl border bg-white p-5">
    <div className="flex items-center gap-2 mb-4 text-teal-700">
      <Eye className="h-4 w-4" />
      <span className="text-sm font-bold">Preview do artigo</span>
    </div>
    {post.image && (
      <div className="aspect-[16/8] overflow-hidden rounded-lg bg-gray-100 mb-4">
        <img src={post.image} alt={post.image_alt || post.title || ''} className="h-full w-full object-cover" />
      </div>
    )}
    <p className="text-xs font-semibold uppercase tracking-wide text-teal-600">{post.category || 'Dicas'}</p>
    <h2 className="text-2xl font-bold text-gray-900 mt-1">{post.title || 'Título do artigo'}</h2>
    <p className="text-sm text-gray-600 mt-2">{post.excerpt || 'Resumo do artigo.'}</p>
    <div className="prose prose-sm max-w-none mt-4" dangerouslySetInnerHTML={{ __html: post.content || '<p>Conteúdo do artigo.</p>' }} />
  </div>
);

const RichHtmlEditor = ({ label, value = '', onChange }) => {
  const textareaRef = useRef(null);

  const applyFormat = ({ before, after = '', placeholder = 'texto' }) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = value.slice(start, end) || placeholder;
    const next = `${value.slice(0, start)}${before}${selected}${after}${value.slice(end)}`;
    onChange(next);

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  };

  const insertBlock = (tag) => applyFormat({ before: `<${tag}>`, after: `</${tag}>`, placeholder: tag === 'p' ? 'Novo parágrafo' : 'Novo título' });
  const insertList = (tag) => applyFormat({ before: `<${tag}>\n  <li>`, after: `</li>\n</${tag}>`, placeholder: 'Item da lista' });
  const insertLink = () => {
    const url = window.prompt('URL do link');
    if (!url) return;
    applyFormat({ before: `<a href="${url}" target="_blank" rel="noopener noreferrer">`, after: '</a>', placeholder: 'texto do link' });
  };

  const toolbar = [
    { label: 'P', title: 'Parágrafo', action: () => insertBlock('p') },
    { label: 'H2', title: 'Título grande', action: () => insertBlock('h2') },
    { label: 'H3', title: 'Título médio', action: () => insertBlock('h3') },
    { label: 'B', title: 'Negrito', action: () => applyFormat({ before: '<strong>', after: '</strong>' }) },
    { label: 'I', title: 'Itálico', action: () => applyFormat({ before: '<em>', after: '</em>' }) },
    { label: 'Peq.', title: 'Texto pequeno', action: () => applyFormat({ before: '<span style="font-size: 0.875rem;">', after: '</span>' }) },
    { label: 'Gr.', title: 'Texto grande', action: () => applyFormat({ before: '<span style="font-size: 1.25rem;">', after: '</span>' }) },
    { label: '• Lista', title: 'Lista com pontos', action: () => insertList('ul') },
    { label: '1. Lista', title: 'Lista numerada', action: () => insertList('ol') },
    { label: 'Quote', title: 'Citação', action: () => applyFormat({ before: '<blockquote>', after: '</blockquote>', placeholder: 'Citação' }) },
    { label: 'Link', title: 'Link', action: insertLink },
  ];

  return (
    <div>
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      <div className="mt-2 rounded-lg border bg-white">
        <div className="flex flex-wrap gap-2 border-b bg-gray-50 p-2">
          {toolbar.map((item) => (
            <button
              key={item.title}
              type="button"
              title={item.title}
              onClick={item.action}
              className="rounded-md border bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-700 hover:bg-teal-50 hover:text-teal-700">
              {item.label}
            </button>
          ))}
        </div>
        <Textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          rows={12}
          className="min-h-[260px] border-0 font-mono text-sm focus-visible:ring-0"
        />
      </div>
      <p className="mt-2 text-xs text-gray-500">Seleciona texto e carrega num botão para aplicar o formato. O preview aparece abaixo.</p>
    </div>
  );
};

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
    if (signInError) setError(signInError.message);
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-teal-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Espaço Girafinha</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700" disabled={submitting}>
              {submitting ? 'A entrar...' : 'Entrar'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const Field = ({ field, item, onChange, onUpload }) => {
  const [name, label, type] = field;
  const value = item[name] ?? '';

  if (type === 'json') {
    return <ListEditor label={label} value={parseJsonList(Array.isArray(value) ? value : String(value ?? ''))} onChange={(next) => onChange(name, next)} />;
  }

  if (type === 'textarea') {
    if (name === 'content') {
      return <RichHtmlEditor label={label} value={value} onChange={(next) => onChange(name, next)} />;
    }

    return (
      <label className="block">
        <span className="text-sm font-semibold text-gray-700">{label}</span>
        <Textarea value={value} onChange={(event) => onChange(name, event.target.value)} rows={6} className="mt-1" />
      </label>
    );
  }

  const isImageField = ['src', 'image'].includes(name);

  if (name === 'category' && item.src !== undefined) {
    return (
      <label className="block">
        <span className="text-sm font-semibold text-gray-700">{label}</span>
        <select
          value={value}
          onChange={(event) => onChange(name, event.target.value)}
          className="mt-1 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
          {galleryCategories.map((category) => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </label>
    );
  }

  return (
    <label className="block">
      <span className="text-sm font-semibold text-gray-700">{label}</span>
      <div className="mt-1 flex gap-2">
        <Input
          type={type || 'text'}
          value={value}
          onChange={(event) => onChange(name, type === 'number' ? Number(event.target.value) : event.target.value)}
        />
        {isImageField && (
          <label className="inline-flex items-center justify-center rounded-md border border-gray-300 px-3 cursor-pointer hover:bg-gray-50">
            <Upload className="h-4 w-4" />
            <input type="file" accept="image/*" className="hidden" onChange={(event) => onUpload(name, event.target.files?.[0])} />
          </label>
        )}
      </div>
    </label>
  );
};

const ContentEditor = ({ active, items, onReload }) => {
  const [editing, setEditing] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const isGallery = active === 'gallery';

  useEffect(() => {
    setEditing(null);
    setError('');
    setNotice('');
  }, [active]);

  const startNew = () => setEditing({ ...emptyItems[active] });
  const startEdit = (item) => setEditing(toAdminItem(active, item));

  const update = (name, value) => {
    setNotice('');
    setEditing((current) => ({ ...current, [name]: value }));
  };

  const upload = async (name, file) => {
    if (!file) return;
    setError('');
    const safeName = file.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9._-]/g, '-');
    const path = `${active}/${Date.now()}-${safeName}`;
    const { error: uploadError } = await supabase.storage.from('cms-media').upload(path, file, { upsert: false });
    if (uploadError) {
      setError(uploadError.message);
      return;
    }
    const { data } = supabase.storage.from('cms-media').getPublicUrl(path);
    update(name, data.publicUrl);
  };

  const save = async () => {
    setSaving(true);
    setError('');
    const table = tableForKey(active);
    const payload = toDbPayload(active, editing);
    const request = editing.id
      ? supabase.from(table).update(payload).eq('id', editing.id)
      : supabase.from(table).insert(payload);
    const { error: saveError } = await request;
    if (saveError) setError(saveError.message);
    else {
      setEditing(null);
      await onReload();
      setNotice('Guardado com sucesso.');
    }
    setSaving(false);
  };

  const remove = async (item) => {
    if (!window.confirm('Apagar este item?')) return;
    const { error: deleteError } = await supabase.from(tableForKey(active)).delete().eq('id', item.id);
    if (deleteError) setError(deleteError.message);
    else {
      await onReload();
      setNotice('Item apagado.');
    }
  };

  const duplicate = async (item) => {
    setSaving(true);
    setError('');
    setNotice('');
    const copyItem = toAdminItem(active, item);
    delete copyItem.id;
    copyItem.sort_order = (item.sort_order ?? item.id ?? 0) + 1;
    if (active === 'blog') copyItem.slug = `${copyItem.slug || 'artigo'}-copia-${Date.now()}`;
    if (copyItem.name) copyItem.name = `${copyItem.name} (cópia)`;
    if (copyItem.title) copyItem.title = `${copyItem.title} (cópia)`;
    if (copyItem.question) copyItem.question = `${copyItem.question} (cópia)`;
    const { error: duplicateError } = await supabase.from(tableForKey(active)).insert(toDbPayload(active, copyItem));
    if (duplicateError) setError(duplicateError.message);
    else {
      await onReload();
      setNotice('Item duplicado.');
    }
    setSaving(false);
  };

  const moveSavedItem = async (item, direction) => {
    const sorted = [...items].sort((a, b) => (a.sort_order ?? a.id ?? 0) - (b.sort_order ?? b.id ?? 0));
    const currentIndex = sorted.findIndex((entry) => entry.id === item.id);
    const nextIndex = currentIndex + direction;
    if (currentIndex < 0 || nextIndex < 0 || nextIndex >= sorted.length) return;

    const reordered = arrayMove(sorted, currentIndex, nextIndex);
    setSaving(true);
    setError('');
    setNotice('');
    const updates = reordered.map((entry, index) =>
      supabase.from(tableForKey(active)).update({ sort_order: index }).eq('id', entry.id)
    );
    const results = await Promise.all(updates);
    const updateError = results.find((result) => result.error)?.error;
    if (updateError) setError(updateError.message);
    else {
      await onReload();
      setNotice('Ordem atualizada.');
    }
    setSaving(false);
  };

  const importInitialContent = async () => {
    const fallback = getFallbackContent()[active] ?? [];
    if (!fallback.length) return;

    setSaving(true);
    setError('');
    const rows = fallback.map((item, index) => toDbPayload(active, {
      ...item,
      sort_order: item.sort_order ?? index,
      is_published: true,
    }));
    const { error: importError } = await supabase.from(tableForKey(active)).insert(rows);
    if (importError) setError(importError.message);
    else {
      await onReload();
      setNotice('Conteúdo importado.');
    }
    setSaving(false);
  };

  const renderListItem = (item) => (
    <div key={item.id} className="border rounded-lg p-3 bg-white">
      <button onClick={() => startEdit(item)} className="text-left w-full">
        <div className={isGallery ? 'flex items-center gap-3' : ''}>
          {isGallery && (
            <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-md bg-gray-100 border">
              {item.src ? (
                <img src={item.src} alt={item.alt || ''} loading="lazy" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full bg-gray-100" />
              )}
            </div>
          )}
          <div className="min-w-0">
            <p className="font-semibold text-gray-900 line-clamp-2">{item.name || item.title || item.question || item.author || item.alt}</p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary">{item.is_published ? 'Publicado' : 'Rascunho'}</Badge>
              <span className="text-xs text-gray-500">#{item.sort_order ?? item.id}</span>
            </div>
          </div>
        </div>
      </button>
      <div className="mt-3 flex flex-wrap gap-2">
        <button onClick={() => moveSavedItem(item, -1)} className="text-xs text-gray-600 hover:text-teal-700 inline-flex items-center gap-1">
          <ArrowUp className="h-3 w-3" /> Subir
        </button>
        <button onClick={() => moveSavedItem(item, 1)} className="text-xs text-gray-600 hover:text-teal-700 inline-flex items-center gap-1">
          <ArrowDown className="h-3 w-3" /> Descer
        </button>
        <button onClick={() => duplicate(item)} className="text-xs text-gray-600 hover:text-teal-700 inline-flex items-center gap-1">
          <Copy className="h-3 w-3" /> Duplicar
        </button>
        <button onClick={() => remove(item)} className="text-xs text-red-600 hover:text-red-700 inline-flex items-center gap-1">
          <Trash2 className="h-3 w-3" /> Apagar
        </button>
      </div>
    </div>
  );

  return (
    <div className="grid lg:grid-cols-[360px_1fr] gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-3">
            <CardTitle>{sections.find((section) => section.key === active)?.label}</CardTitle>
            <Button onClick={startNew} size="sm" className="bg-teal-600 hover:bg-teal-700">
              <Plus className="h-4 w-4 mr-1" /> Novo
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
          {notice && <p className="rounded-md bg-green-50 p-3 text-sm text-green-700">{notice}</p>}

          {items.length === 0 && (
            <div className="rounded-lg border border-dashed border-teal-300 bg-teal-50 p-4">
              <p className="text-sm text-teal-900 font-semibold mb-2">Esta secção ainda não tem dados.</p>
              <p className="text-xs text-teal-800 mb-3">Pode importar o conteúdo atual do site e depois editar.</p>
              <Button onClick={importInitialContent} disabled={saving} size="sm" className="bg-teal-600 hover:bg-teal-700">
                {saving ? 'A importar...' : 'Importar conteúdo atual'}
              </Button>
            </div>
          )}

          {isGallery ? (
            galleryCategories.map((category) => {
              const categoryItems = items.filter((item) => item.category === category);
              if (categoryItems.length === 0) return null;
              return (
                <div key={category} className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wide text-gray-500">{category}</h3>
                  {categoryItems.map(renderListItem)}
                </div>
              );
            })
          ) : (
            items.map(renderListItem)
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>{editing?.id ? 'Editar item' : editing ? 'Novo item' : 'Selecione ou crie um item'}</CardTitle>
        </CardHeader>
        <CardContent>
          {editing ? (
            <div className="space-y-4">
              {isGallery && editing.src && (
                <div>
                  <span className="text-sm font-semibold text-gray-700">Pré-visualização</span>
                  <div className="mt-2 overflow-hidden rounded-lg border bg-gray-100 max-w-md">
                    <img src={editing.src} alt={editing.alt || ''} className="h-64 w-full object-cover" />
                  </div>
                </div>
              )}

              {fields[active].map((field) => (
                <Field key={field[0]} field={field} item={editing} onChange={update} onUpload={upload} />
              ))}

              {active === 'blog' && <BlogPreview post={editing} />}

              <div className="grid sm:grid-cols-3 gap-3">
                <label>
                  <span className="text-sm font-semibold text-gray-700">Ordem</span>
                  <Input type="number" value={editing.sort_order ?? 0} onChange={(e) => update('sort_order', Number(e.target.value))} />
                </label>
                {active === 'packages' && (
                  <>
                    <label className="flex items-center gap-2 pt-7">
                      <input type="checkbox" checked={Boolean(editing.is_promotion)} onChange={(e) => update('is_promotion', e.target.checked)} />
                      Promoção
                    </label>
                    <label className="flex items-center gap-2 pt-7">
                      <input type="checkbox" checked={Boolean(editing.popular)} onChange={(e) => update('popular', e.target.checked)} />
                      Popular
                    </label>
                  </>
                )}
                <label className="flex items-center gap-2 pt-7">
                  <input type="checkbox" checked={Boolean(editing.is_published)} onChange={(e) => update('is_published', e.target.checked)} />
                  Publicado
                </label>
              </div>

              {error && <p className="rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</p>}
              {notice && <p className="rounded-md bg-green-50 p-3 text-sm text-green-700">{notice}</p>}
              <Button onClick={save} disabled={saving} className="bg-teal-600 hover:bg-teal-700">
                <Save className="h-4 w-4 mr-2" /> {saving ? 'A guardar...' : 'Guardar'}
              </Button>
            </div>
          ) : (
            <p className="text-gray-600">Escolha um item da lista ou crie um novo.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const Admin = () => {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [active, setActive] = useState('packages');
  const [content, setContent] = useState(null);
  const [error, setError] = useState('');

  const activeItems = useMemo(() => content?.[active] ?? [], [content, active]);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setChecking(false);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setChecking(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const load = async () => {
    setError('');
    try {
      setContent(await fetchAdminContent());
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (session) load();
  }, [session]);

  if (!isSupabaseConfigured) return <Navigate to="/" replace />;
  if (checking) return null;
  if (!session) return <LoginForm />;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b sticky top-0 z-20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Admin Espaço Girafinha</h1>
            <p className="text-sm text-gray-600">{session.user.email}</p>
          </div>
          <Button variant="outline" onClick={() => supabase.auth.signOut()}>
            <LogOut className="h-4 w-4 mr-2" /> Sair
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
          {sections.map((section) => (
            <button
              key={section.key}
              onClick={() => setActive(section.key)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
                active === section.key ? 'bg-teal-600 text-white' : 'bg-white text-gray-700 border'
              }`}>
              {section.label}
            </button>
          ))}
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {content ? (
          <ContentEditor active={active} items={activeItems} onReload={load} />
        ) : (
          <p className="text-gray-600">A carregar conteúdos...</p>
        )}
      </main>
    </div>
  );
};

export default Admin;
