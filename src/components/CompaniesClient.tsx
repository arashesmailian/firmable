"use client";

import { useEffect } from "react";
import { useCompanies } from "@/hooks/useCompanies";
import { useCompanySearch } from "@/hooks/useCompanySearch";
import { GST_STATUS_OPTIONS } from "@/constants/gst_status";
import { AUSTRALIAN_STATES } from "@/constants/au_states";
import { PageTitle } from "@/components/PageTitle";
import { TextInput } from "@/components/TextInput";
import { Dropdown } from "@/components/DropDownInput";
import { FiltersHeader } from "@/components/FiltersHeader";
import { ResultList } from "@/components/ResultList";
import { LoadMoreButton } from "@/components/LoadMoreButton";

export function CompaniesClient() {
  const { filters, debouncedFilters, hasSearched, updateFilter, clearFilters } =
    useCompanySearch();

  const {
    companies,
    loading,
    error,
    pagination,
    loadNextPage,
    resetPagination,
  } = useCompanies(debouncedFilters, hasSearched);

  const handleNameChange = (value: string) => updateFilter("name", value);
  const handlePostcodeChange = (value: string) =>
    updateFilter("postcode", value);
  const handleGstStatusChange = (value: string) =>
    updateFilter("gstStatus", value);
  const handleStateChange = (value: string) => updateFilter("state", value);

  const handleClearFilters = () => {
    clearFilters();
    resetPagination();
  };

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        <div className="w-80 bg-white dark:bg-gray-800 shadow-lg p-6 min-h-screen">
          <PageTitle />
          <div className="space-y-4">
            <div className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6">
              <div>
                <FiltersHeader />

                <TextInput
                  label="Search Businesses"
                  value={filters.name}
                  onChange={handleNameChange}
                  placeholder="Business name or keyword..."
                  isDebounced={true}
                  icon={
                    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  }
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

                <button
                  onClick={handleClearFilters}
                  className="w-full py-2 lg:py-3 px-3 lg:px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200 font-medium text-sm lg:text-base"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700">Error: {error}</p>
            </div>
          )}

          {!hasSearched ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">
                Use the filters to search for businesses.
              </p>
            </div>
          ) : loading && pagination.page === 1 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">Loading...</p>
            </div>
          ) : companies.length > 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
              <ResultList companies={companies} />
              {pagination.hasMore && (
                <LoadMoreButton
                  companyLength={companies.length}
                  loading={loading}
                  totalPagination={pagination.total}
                  loadNextPage={loadNextPage}
                />
              )}
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                No businesses found.
              </p>
              <button
                onClick={handleClearFilters}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
