import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { type Company } from "@/types/Company";
import { type Filters } from "@/types/Filters";
import { usePagination } from "./usePagination";

export function useCompanies(filters: Filters, hasSearched: boolean) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const { pagination, loadNextPage, resetPagination, setTotal, updateHasMore } =
    usePagination();

  useEffect(() => {
    if (!hasSearched) return;
    setLoading(true);

    const fetchCompanies = async () => {
      let query = supabase.from("businesses").select("*", { count: "exact" });

      // Apply filters
      if (filters.name) {
        query = query.ilike("name", `%${filters.name}%`);
      }
      if (filters.gstStatus) {
        query = query.eq("gst", filters.gstStatus);
      }
      if (filters.state) {
        query = query.eq("address_state", filters.state);
      }
      if (filters.postcode) {
        query = query.eq("address_postcode", filters.postcode);
      }

      // Apply pagination
      const from = (pagination.page - 1) * pagination.limit;
      const to = from + pagination.limit - 1;
      query = query.range(from, to);

      const { data, error, count } = await query;

      if (!error && data) {
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
      } else {
        if (pagination.page === 1) {
          setCompanies([]);
        }
        setTotal(0);
        updateHasMore(false);
      }
      setLoading(false);
    };

    fetchCompanies();
  }, [
    filters,
    hasSearched,
    pagination.page,
    pagination.limit,
    setTotal,
    updateHasMore,
  ]);

  const resetCompanies = () => {
    setCompanies([]);
    resetPagination();
  };

  return {
    companies,
    loading,
    pagination,
    loadNextPage,
    resetPagination: resetCompanies,
  };
}
