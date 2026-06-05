import { useState, useCallback } from 'react';

export function useWishlist() {
  const [ids, setIds] = useState<Set<string>>(new Set());

  const toggle = useCallback((productId: string) => {
    setIds(prev => {
      const next = new Set(prev);
      next.has(productId) ? next.delete(productId) : next.add(productId);
      return next;
    });
  }, []);

  const isLiked = useCallback((productId: string) => ids.has(productId), [ids]);

  return { ids, toggle, isLiked, count: ids.size };
}
