"use client";

import { useState, useEffect } from "react";
import { useCompanies } from "@/hooks/useCompanies";
import { useDebounce } from "@/hooks/useDebounce";
import { GST_STATUS_OPTIONS } from "@/constants/gst_status";
import { AUSTRALIAN_STATES } from "@/constants/au_states";
import { type Filters } from "@/types/Filters";
import { EmptyResult } from "./EmptyResult";
import ResultList from "./ResultList";

export function CompaniesClient() {
  const [filters, setFilters] = useState<Filters>({
    name: "",
    gstStatus: "",
    state: "",
    postcode: "",
  });
  const [hasSearched, setHasSearched] = useState(false);

  // Debounce the name filter with 400ms delay
  const debouncedName = useDebounce(filters.name, 400);
  const debouncedFilters = { ...filters, name: debouncedName };

  const { companies, loading, pagination, loadNextPage, resetPagination } =
    useCompanies(debouncedFilters, hasSearched);

  // Handle debounced name search
  useEffect(() => {
    if (hasSearched) {
      resetPagination();
    }
  }, [debouncedName, hasSearched]);

  const onFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });

    // For non-name filters, trigger search immediately
    if (name !== "name") {
      setHasSearched(true);
      resetPagination();
    }
  };

  const handleSearch = () => {
    setHasSearched(true);
    resetPagination();
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-80 p-6 bg-white border-r min-h-screen shadow-md">
        <h2 className="text-xl font-bold mb-6">Filters</h2>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">
            Business Name
          </label>
          <input
            className="w-full border p-2 rounded"
            placeholder="Search by business name"
            value={filters.name}
            name="name"
            onChange={onFilterChange}
          />
          <p className="text-xs text-gray-500 mt-1">Search with 400ms delay</p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">GST Status</label>
          <select
            className="w-full border p-2 rounded"
            value={filters.gstStatus}
            name="gstStatus"
            onChange={onFilterChange}
          >
            {GST_STATUS_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">State</label>
          <select
            className="w-full border p-2 rounded"
            value={filters.state}
            name="state"
            onChange={onFilterChange}
          >
            {AUSTRALIAN_STATES.map((state) => (
              <option key={state.value} value={state.value}>
                {state.label}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Postcode</label>
          <input
            className="w-full border p-2 rounded"
            placeholder="4-digit postcode"
            value={filters.postcode}
            name="postcode"
            onChange={onFilterChange}
            maxLength={4}
            pattern="[0-9]{4}"
          />
        </div>

        <button
          onClick={handleSearch}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Australian Businesses
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
          {!hasSearched ? (
            <div className="text-center text-gray-400 py-8">
              Please use the filters to search for businesses.
            </div>
          ) : loading ? (
            <div className="text-center text-gray-400 py-8">Loading...</div>
          ) : companies.length ? (
            <>
              <div className="mb-4 text-sm text-gray-600">
                Showing {companies.length} of {pagination.total} results
                {pagination.page > 1 && ` (Page ${pagination.page})`}
              </div>
              <ResultList companies={companies} />
              {pagination.hasMore && (
                <div className="mt-6 text-center">
                  <button
                    onClick={loadNextPage}
                    disabled={loading}
                    className="bg-gray-600 text-white py-2 px-6 rounded hover:bg-gray-700 transition-colors disabled:opacity-50"
                  >
                    {loading ? "Loading..." : "Load More"}
                  </button>
                </div>
              )}
            </>
          ) : (
            <EmptyResult />
          )}
        </div>
      </main>
    </div>
  );
}
