import React, { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LogOut, Plus, Save, Trash2, Upload } from 'lucide-react';
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
    return (
      <label className="block">
        <span className="text-sm font-semibold text-gray-700">{label}</span>
        <Textarea
          value={Array.isArray(value) ? value.join('\n') : value}
          onChange={(event) => onChange(name, parseJsonList(event.target.value))}
          rows={4}
          className="mt-1"
        />
      </label>
    );
  }

  if (type === 'textarea') {
    return (
      <label className="block">
        <span className="text-sm font-semibold text-gray-700">{label}</span>
        <Textarea value={value} onChange={(event) => onChange(name, event.target.value)} rows={6} className="mt-1" />
      </label>
    );
  }

  const isImageField = ['src', 'image'].includes(name);

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
  const isGallery = active === 'gallery';

  useEffect(() => {
    setEditing(null);
    setError('');
  }, [active]);

  const startNew = () => setEditing({ ...emptyItems[active] });
  const startEdit = (item) => setEditing(toAdminItem(active, item));

  const update = (name, value) => setEditing((current) => ({ ...current, [name]: value }));

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
    }
    setSaving(false);
  };

  const remove = async (item) => {
    if (!window.confirm('Apagar este item?')) return;
    const { error: deleteError } = await supabase.from(tableForKey(active)).delete().eq('id', item.id);
    if (deleteError) setError(deleteError.message);
    else await onReload();
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
    else await onReload();
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
      <button onClick={() => remove(item)} className="mt-2 text-xs text-red-600 hover:text-red-700 inline-flex items-center gap-1">
        <Trash2 className="h-3 w-3" /> Apagar
      </button>
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

              {error && <p className="text-sm text-red-600">{error}</p>}
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
