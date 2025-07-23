// src/hooks/usePagination.ts
import { useState, useCallback } from "react";
import { type PaginationInfo } from "@/types/PaginationInfo";
import { ITEMS_PER_PAGE } from "@/constants/pagination";

export function usePagination() {
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: ITEMS_PER_PAGE,
    total: 0,
    hasMore: false,
  });

  const updatePagination = useCallback((updates: Partial<PaginationInfo>) => {
    setPagination((prev) => ({
      ...prev,
      ...updates,
    }));
  }, []);

  const loadNextPage = useCallback(() => {
    setPagination((prev) => ({ ...prev, page: prev.page + 1 }));
  }, []);

  const resetPagination = useCallback(() => {
    setPagination((prev) => ({ ...prev, page: 1 }));
  }, []);

  // Fix: Memoize these functions to prevent infinite re-renders
  const setTotal = useCallback((total: number) => {
    setPagination((prev) => ({
      ...prev,
      total,
    }));
  }, []);

  const updateHasMore = useCallback((hasMore: boolean) => {
    setPagination((prev) => ({ ...prev, hasMore }));
  }, []);

  return {
    pagination,
    updatePagination,
    loadNextPage,
    resetPagination,
    setTotal,
    updateHasMore,
  };
}
