import React from "react";

interface EmptyResultProps {
  onClearFilters: () => void;
}

export const EmptyResult: React.FC<EmptyResultProps> = ({ onClearFilters }) => {
  return (
    <div className="text-center py-12 lg:py-16">
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
        No businesses found
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4 lg:mb-6 max-w-md mx-auto text-sm lg:text-base px-4">
        Please adjust your filters to search for businesses that match your
        criteria.
      </p>
      <button
        onClick={onClearFilters}
        className="inline-flex items-center px-3 py-2 lg:px-4 lg:py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 text-sm lg:text-base"
      >
        <svg
          className="w-3 h-3 lg:w-4 lg:h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Clear Filters
      </button>
    </div>
  );
};
