import React from 'react'

export const FiltersHeader = () => {
  return (
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
  );
}

