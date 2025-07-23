"use client";

import { useEffect } from "react";
import { useCompanies } from "@/hooks/useCompanies";
import { useCompanySearch } from "@/hooks/useCompanySearch";
import { GST_STATUS_OPTIONS } from "@/constants/gst_status";
import { AUSTRALIAN_STATES } from "@/constants/au_states";
import { ThemeToggle } from "./ThemeToggle";

export function CompaniesClient() {
  // Use the custom search hook for all filter logic
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

  // Handle filter changes
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilter("name", e.target.value);
  };

  const handleGstStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilter("gstStatus", e.target.value);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilter("state", e.target.value);
  };

  const handlePostcodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilter("postcode", e.target.value);
  };

  const handleClearFilters = () => {
    clearFilters();
    resetPagination();
  };

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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Simple Sidebar */}
        <div className="w-80 bg-white dark:bg-gray-800 shadow-lg p-6 min-h-screen">
          <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <svg
                    class="w-4 h-4 lg:w-6 lg:h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8h1m-1 4h1m4-4h1m-1 4h1"
                    ></path>
                  </svg>
                </div>
                <div>
                  <h1 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
                    Businesses
                  </h1>
                  <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">
                    Find your Company
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <ThemeToggle />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Name Filter */}
            <div className="flex-1 p-4 lg:p-6 space-y-4 lg:space-y-6">
              <div>
                <h2 className="text-base lg:text-lg font-semibold text-gray-900 dark:text-white mb-3 lg:mb-4 flex items-center">
                  <svg
                    className="w-4 h-4 lg:w-5 lg:h-5 mr-2 text-indigo-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                    />
                  </svg>
                  Filters
                </h2>

                {/* Name Filter - Matching HTML structure */}
                <div className="mb-4 lg:mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Search Businesses
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      className="filter-input w-full px-3 py-2 lg:px-4 lg:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 pl-8 lg:pl-10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm lg:text-base"
                      placeholder="Business name or keyword..."
                      value={filters.name}
                      onChange={handleNameChange}
                    />
                    <svg
                      className="absolute left-2 lg:left-3 top-2.5 lg:top-3.5 w-4 h-4 lg:w-5 lg:h-5 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                </div>

                {/* GST Status Filter */}
                <div className="mb-4 lg:mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    GST Status
                  </label>
                  <select
                    className="filter-input custom-select w-full px-3 py-2 lg:px-4 lg:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm lg:text-base"
                    value={filters.gstStatus}
                    onChange={handleGstStatusChange}
                  >
                    {GST_STATUS_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* State Filter */}
                <div className="mb-4 lg:mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    State
                  </label>
                  <select
                    className="filter-input custom-select w-full px-3 py-2 lg:px-4 lg:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm lg:text-base"
                    value={filters.state}
                    onChange={handleStateChange}
                  >
                    {AUSTRALIAN_STATES.map((state) => (
                      <option key={state.value} value={state.value}>
                        {state.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Postcode Filter */}
                <div className="mb-4 lg:mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Postcode
                  </label>
                  <input
                    type="text"
                    className="filter-input w-full px-3 py-2 lg:px-4 lg:py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-sm lg:text-base"
                    placeholder="4-digit postcode"
                    value={filters.postcode}
                    onChange={handlePostcodeChange}
                    maxLength={4}
                  />
                </div>

                {/* Clear Button - Matching HTML structure */}
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

        {/* Main Content */}
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
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 responsive-table">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-3 py-3 lg:px-6 lg:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        ABN
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        GST Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        State
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        Postcode
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        last update
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {companies.map((company) => (
                      <tr key={company.id}>
                        <td className="px-6 py-8 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {company.name}
                        </td>
                        <td className="px-6 py-8 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {company.abn}
                        </td>
                        <td className="px-6 py-8 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {company.gst}
                        </td>
                        <td className="px-6 py-8 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {company.address_state}
                        </td>
                        <td className="px-6 py-8 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {company.address_postcode}
                        </td>
                        <td className="px-6 py-8 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {company.record_last_updated
                            ? new Date(
                                company.record_last_updated
                              ).toLocaleDateString()
                            : "N/A"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {pagination.hasMore && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center">
                  <div className="p-4 text-left">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Showing {companies.length} of{" "}
                      {pagination.total.toLocaleString()} results
                    </p>
                  </div>
                  <button
                    onClick={loadNextPage}
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? "Loading..." : "Load More"}
                  </button>
                </div>
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
