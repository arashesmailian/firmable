"use client";

import { useEffect, useState } from "react";
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
import { ClearFilterButton } from "@/components/ClearFilterButton";
import { RefreshIcon } from "@/components/icons/RefreshIcon";
import { EmptyResult } from "@/components/EmptyResult";

export function CompaniesClient() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

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

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  // Close sidebar on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileSidebarOpen]);

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
    <div
      className="min-h-screen bg-gray-50 dark:bg-gray-900 theme-transition light"
      id="body"
    >
      {/* Mobile Sidebar Overlay */}
      <div
        className={`sidebar-overlay lg:hidden ${
          isMobileSidebarOpen ? "active" : ""
        }`}
        onClick={closeMobileSidebar}
      />

      <div className="flex h-screen relative">
        {/* Mobile Menu Button */}
        <button
          className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
          onClick={toggleMobileSidebar}
        >
          <svg
            className="w-6 h-6 text-gray-600 dark:text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Sidebar */}
        <div
          className={`w-80 lg:w-80 md:w-72 bg-white dark:bg-gray-800 shadow-xl border-r border-gray-200 dark:border-gray-700 flex flex-col theme-transition fixed lg:relative inset-y-0 left-0 z-40 lg:transform-none mobile-sidebar sidebar-scroll overflow-y-auto ${
            isMobileSidebarOpen ? "active" : ""
          }`}
        >
          <PageTitle onCloseMobileSidebar={closeMobileSidebar} />

          {/* Filters */}
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
              <ClearFilterButton
                onClick={handleClearFilters}
                className="w-full py-2 lg:py-3 px-3 lg:px-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg transition-colors duration-200 font-medium text-sm lg:text-base"
                text="Clear All Filters"
              />
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 lg:p-6 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-xs lg:text-sm text-gray-500 dark:text-gray-400">
              <p>© 2025 Business Directory</p>
              <p className="mt-1">Connecting talent with opportunity</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:ml-0 ml-0">
          <div className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 p-4 lg:p-6 theme-transition">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
              <div className="ml-12 lg:ml-0">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900 dark:text-white">
                  Businesses
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm lg:text-base">
                  Discover amazing businesses to work with
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-3 py-2 lg:px-4 lg:py-2 rounded-lg text-xs lg:text-sm font-medium">
                  <span>
                    {pagination.total.toLocaleString()} Business
                    {pagination.total !== 1 ? "es" : ""}
                  </span>
                </div>
                <button className="flex items-center space-x-2 px-3 py-2 lg:px-4 lg:py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors duration-200 text-gray-700 dark:text-gray-300 text-xs lg:text-sm">
                  <svg
                    className="w-3 h-3 lg:w-4 lg:h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 p-4 lg:p-6 overflow-y-auto">
            {error && (
              <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">Error: {error}</p>
              </div>
            )}

            {!hasSearched ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 theme-transition p-8 text-center">
                <div className="mx-auto w-16 h-16 lg:w-24 lg:h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mb-4 lg:mb-6">
                  <svg
                    className="w-8 h-8 lg:w-12 lg:h-12 text-white"
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
                <h3 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Start Your Search
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm lg:text-base px-4">
                  Use the filters to search for businesses that match your
                  criteria.
                </p>
              </div>
            ) : loading && pagination.page === 1 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 theme-transition p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 lg:h-12 lg:w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <p className="text-gray-500 dark:text-gray-400">Loading...</p>
              </div>
            ) : companies.length > 0 ? (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 theme-transition overflow-hidden">
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
              <EmptyResult>
                <ClearFilterButton
                  onClick={handleClearFilters}
                  className="inline-flex items-center px-3 py-2 lg:px-4 lg:py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm lg:text-base"
                  icon={<RefreshIcon />}
                  text="Clear Filters"
                />
              </EmptyResult>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
