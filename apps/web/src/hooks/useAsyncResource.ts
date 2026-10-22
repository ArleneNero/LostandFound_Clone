import { useCallback, useEffect, useRef, useState } from 'react';
/** Only the latest request may publish, including retries and unmounts. */
export function useAsyncResource<T>(load: () => Promise<T>, revision = 0) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const request = useRef(0);
  const refetch = useCallback(async () => {
    const id = ++request.current;
    setLoading(true);
    setError(null);
    try {
      const result = await load();
      if (id === request.current) setData(result);
    } catch (err) {
      if (id === request.current) {
        setData(null);
        setError(err instanceof Error ? err.message : 'Gagal memuat data.');
      }
    } finally {
      if (id === request.current) setLoading(false);
    }
  }, [load]);
  const cancel = useCallback(() => {
    request.current++;
  }, []);
  useEffect(() => {
    void refetch();
    return cancel;
  }, [refetch, cancel, revision]);
  return { data, loading, error, refetch };
}
