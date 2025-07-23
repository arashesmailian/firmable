import { useEffect, useState, useCallback, useMemo } from "react";
import { supabase } from "@/lib/supabase/client";
import { type Company } from "@/types/Company";
import { type Filters } from "@/types/Filters";
import { usePagination } from "./usePagination";

export function useCompanies(filters: Filters, hasSearched: boolean) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { pagination, loadNextPage, resetPagination, setTotal, updateHasMore } =
    usePagination();

  const memoizedFilters = useMemo(
    () => filters,
    [filters.name, filters.gstStatus, filters.state, filters.postcode]
  );

  const fetchCompanies = useCallback(async () => {
    if (!hasSearched) return;

    setLoading(true);
    setError(null);

    try {
      let query = supabase.from("businesses").select("*", { count: "exact" });

      // Apply filters
      if (memoizedFilters.name.trim()) {
        query = query.ilike("name", `%${memoizedFilters.name.trim()}%`);
      }
      if (memoizedFilters.gstStatus) {
        query = query.eq("gst", memoizedFilters.gstStatus);
      }
      if (memoizedFilters.state) {
        query = query.eq("address_state", memoizedFilters.state);
      }
      if (memoizedFilters.postcode.trim()) {
        query = query.eq("address_postcode", memoizedFilters.postcode.trim());
      }

      // Apply pagination
      const from = (pagination.page - 1) * pagination.limit;
      const to = from + pagination.limit - 1;
      query = query.range(from, to).order("name", { ascending: true });

      const { data, error: fetchError, count } = await query;

      if (fetchError) {
        throw fetchError;
      }

      if (data) {
        if (pagination.page === 1) {
          // First page: replace companies
          setCompanies(data as Company[]);
        } else {
          // Subsequent pages: append companies
          setCompanies((prev) => [...prev, ...(data as Company[])]);
        }

        const total = count || 0;
        setTotal(total);
        updateHasMore(from + data.length < total);
      }
    } catch (err) {
      console.error("Error fetching companies:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      if (pagination.page === 1) {
        setCompanies([]);
      }
      setTotal(0);
      updateHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [
    hasSearched,
    memoizedFilters,
    pagination.page,
    pagination.limit,
    setTotal,
    updateHasMore,
  ]);

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  const resetCompanies = useCallback(() => {
    setCompanies([]);
    setError(null);
    resetPagination();
  }, [resetPagination]);

  return {
    companies,
    loading,
    error,
    pagination,
    loadNextPage,
    resetPagination: resetCompanies,
  };
}
