import { useEffect, useState } from 'react';
import { fetchSiteContent, getFallbackContent } from '../lib/cms';

export function useSiteContent() {
  const [content, setContent] = useState(getFallbackContent);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    fetchSiteContent()
      .then((data) => {
        if (active) setContent(data);
      })
      .catch((err) => {
        console.error('CMS content fallback active:', err);
        if (active) setError(err);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { content, loading, error };
}
