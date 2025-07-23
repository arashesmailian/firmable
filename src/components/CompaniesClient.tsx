"use client";

import { useEffect } from "react";
import { useCompanies } from "@/hooks/useCompanies";
import { useCompanySearch } from "@/hooks/useCompanySearch";
import { type Filters } from "@/types/Filters";
import { EmptyResult } from "./EmptyResult";
import ResultList from "./ResultList";
import { TextInput } from "@/components/TextInput";
import { Dropdown } from "@/components/DropDownInput";
import { GST_STATUS_OPTIONS } from "@/constants/gst_status";
import { AUSTRALIAN_STATES } from "@/constants/au_states";

export function CompaniesClient() {
  // Use the custom search hook for all filter logic
  const {
    filters,
    debouncedFilters,
    hasSearched,
    updateFilter,
    clearFilters,
    hasActiveFilters,
  } = useCompanySearch();

  const {
    companies,
    loading,
    error,
    pagination,
    loadNextPage,
    resetPagination,
  } = useCompanies(debouncedFilters, hasSearched);

  // Handle filter changes using the hook's updateFilter function
  const handleNameChange = (value: string) => updateFilter("name", value);
  const handlePostcodeChange = (value: string) =>
    updateFilter("postcode", value);
  const handleGstStatusChange = (value: string) =>
    updateFilter("gstStatus", value);
  const handleStateChange = (value: string) => updateFilter("state", value);

  // Reset pagination when debounced filters change
  useEffect(() => {
    if (hasSearched) {
      resetPagination();
    }
  }, [
    debouncedFilters.name,
    debouncedFilters.postcode,
    debouncedFilters.gstStatus,
    debouncedFilters.state,
    hasSearched,
    resetPagination,
  ]);

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-80 p-6 bg-white border-r min-h-screen shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Filters</h2>
          {hasActiveFilters && (
            <button
              onClick={() => {
                clearFilters();
                resetPagination();
              }}
              className="text-sm text-blue-600 hover:text-blue-800 underline"
            >
              Clear All
            </button>
          )}
        </div>

        <TextInput
          label="Business Name"
          value={filters.name}
          onChange={handleNameChange}
          placeholder="Search by business name"
          isDebounced={true}
        />

        <Dropdown
          label="GST Status"
          value={filters.gstStatus}
          onChange={handleGstStatusChange}
          options={GST_STATUS_OPTIONS}
        />

        <Dropdown
          label="State"
          value={filters.state}
          onChange={handleStateChange}
          options={AUSTRALIAN_STATES}
        />

        <TextInput
          label="Postcode"
          value={filters.postcode}
          onChange={handlePostcodeChange}
          placeholder="4-digit postcode"
          maxLength={4}
          pattern="[0-9]{4}"
          isDebounced={true}
        />

        {hasActiveFilters && !hasSearched && (
          <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="text-sm text-blue-700">
              Start typing or select options to search automatically
            </p>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">
          Australian Businesses
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded">
              <p className="text-red-700">Error: {error}</p>
            </div>
          )}

          {!hasSearched ? (
            <div className="text-center text-gray-400 py-12">
              <div className="mb-4">
                <svg
                  className="mx-auto h-12 w-12 text-gray-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Search Australian Businesses
              </h3>
              <p>
                Use the filters on the left to search through 77,000+
                businesses.
              </p>
              <p className="text-sm mt-2">
                Search by name, GST status, state, or postcode.
              </p>
            </div>
          ) : loading && pagination.page === 1 ? (
            <div className="text-center text-gray-400 py-12">
              <div className="mb-4">
                <div className="animate-spin inline-block w-8 h-8 border-4 border-current border-t-transparent text-blue-600 rounded-full"></div>
              </div>
              <p>Searching businesses...</p>
            </div>
          ) : companies.length > 0 ? (
            <>
              <div className="mb-4 text-sm text-gray-600 flex justify-between items-center">
                <span>
                  Showing {companies.length} of{" "}
                  {pagination.total.toLocaleString()} results
                  {pagination.page > 1 && ` (Page ${pagination.page})`}
                </span>
                {pagination.total > 0 && (
                  <span className="text-xs text-gray-500">
                    Updated results display automatically as you type
                  </span>
                )}
              </div>

              <ResultList companies={companies} />

              {pagination.hasMore && (
                <div className="mt-6 text-center">
                  <button
                    onClick={loadNextPage}
                    disabled={loading}
                    className="bg-blue-600 text-white py-2 px-6 rounded hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"></div>
                        Loading...
                      </>
                    ) : (
                      `Load More (${(
                        pagination.total - companies.length
                      ).toLocaleString()} remaining)`
                    )}
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
