import { useEffect, useMemo, useState } from "react";

const KEY = "motorado:favorites";

// Helper to check if an ID is a valid UUID
const isValidUUID = (id: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(id);
};

export function useFavorites() {
  const [ids, setIds] = useState<string[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const storedIds = JSON.parse(raw);
        // Filter out any non-UUID IDs (from old static data)
        const validIds = storedIds.filter(isValidUUID);
        if (validIds.length !== storedIds.length) {
          // Clean up localStorage if we found invalid IDs
          localStorage.setItem(KEY, JSON.stringify(validIds));
        }
        setIds(validIds);
      }
    } catch {}
    setIsLoaded(true);
  }, []);

  const toggle = (id: string) => {
    setIds((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  };

  const add = (id: string) => {
    setIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  };

  const remove = (id: string) => {
    setIds((prev) => {
      const next = prev.filter((x) => x !== id);
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });
  };

  const has = useMemo(() => new Set(ids), [ids]);

  return { ids, has, toggle, add, remove, isLoaded };
}
