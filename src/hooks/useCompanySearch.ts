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

  // Debounce text inputs
  const debouncedName = useDebounce(filters.name, 400);
  const debouncedPostcode = useDebounce(filters.postcode, 400);

  const debouncedFilters: Filters = {
    name: debouncedName,
    gstStatus: filters.gstStatus,
    state: filters.state,
    postcode: debouncedPostcode,
  };

  const updateFilter = useCallback(
    (key: keyof Filters, value: string) => {
      setFilters((prev) => ({ ...prev, [key]: value }));

      // For dropdown filters (non-debounced), trigger search immediately
      if (key === "gstStatus" || key === "state") {
        setHasSearched(true);
      }
      // For text inputs, trigger search if there's already a value or if search was already triggered
      else if (value.trim() || hasSearched) {
        setHasSearched(true);
      }
    },
    [hasSearched]
  );

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

  // Auto-trigger search when any filter has a value
  useEffect(() => {
    const hasAnyFilter = Object.values(debouncedFilters).some(
      (value) => value.trim() !== ""
    );
    if (hasAnyFilter && !hasSearched) {
      setHasSearched(true);
    }
  }, [debouncedFilters, hasSearched]);

  return {
    filters,
    debouncedFilters,
    hasSearched,
    updateFilter,
    clearFilters,
    triggerSearch,
  };
}
