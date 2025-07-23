import React from "react";

type Props = {
  companyLength: number;
  loading: boolean;
  totalPagination: number;
  loadNextPage: () => void;
};

export const LoadMoreButton: React.FC<Props> = ({
  companyLength,
  loading,
  totalPagination,
  loadNextPage,
}) => {
  return (
    <div className="p-4 lg:p-6 border-t border-gray-200 dark:border-gray-700">
      {/* Results summary */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 space-y-2 sm:space-y-0">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className="hidden sm:inline">
            Showing {companyLength.toLocaleString()} of{" "}
            {totalPagination.toLocaleString()} results
          </span>
          <span className="sm:hidden">
            {companyLength} / {totalPagination.toLocaleString()}
          </span>
        </p>

        {/* Progress indicator */}
        <div className="w-full sm:w-48 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${Math.min(
                (companyLength / totalPagination) * 100,
                100
              )}%`,
            }}
          />
        </div>
      </div>

      {/* Load more button */}
      <div className="text-center">
        <button
          onClick={loadNextPage}
          disabled={loading}
          className="w-full sm:w-auto px-4 py-2 lg:px-6 lg:py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium text-sm lg:text-base flex items-center justify-center space-x-2 hover:scale-105 hover:shadow-lg"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Loading...</span>
            </>
          ) : (
            <>
              <span>Load More</span>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
