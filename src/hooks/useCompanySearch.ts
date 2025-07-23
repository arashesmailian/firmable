import { useState, useCallback, useEffect } from "react";
import { type Filters } from "@/types/Filters";
import { useDebounce } from "./useDebounce";

interface UseCompanySearchReturn {
  filters: Filters;
  debouncedFilters: Filters;
  hasSearched: boolean;
  updateFilter: (key: keyof Filters, value: string) => void;
  clearFilters: () => void;
  triggerSearch: () => void;
}

export function useCompanySearch(): UseCompanySearchReturn {
  const [filters, setFilters] = useState<Filters>({
    name: "",
    gstStatus: "",
    state: "",
    postcode: "",
  });
  const [hasSearched, setHasSearched] = useState(false);

  const debouncedName = useDebounce(filters.name, 400);
  const debouncedPostcode = useDebounce(filters.postcode, 400);

  const debouncedFilters: Filters = {
    name: debouncedName,
    gstStatus: filters.gstStatus,
    state: filters.state,
    postcode: debouncedPostcode,
  };

  const updateFilter = useCallback((key: keyof Filters, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));

    // For dropdown filters, trigger search immediately
    if (key === "gstStatus" || key === "state") {
      setHasSearched(true);
    }
    // For text inputs, only trigger search if there's a meaningful value
    else if (value.trim()) {
      setHasSearched(true);
    }
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({
      name: "",
      gstStatus: "",
      state: "",
      postcode: "",
    });
    setHasSearched(false);
  }, []);

  const triggerSearch = useCallback(() => {
    setHasSearched(true);
  }, []);

  return {
    filters,
    debouncedFilters,
    hasSearched,
    updateFilter,
    clearFilters,
    triggerSearch,
  };
}
