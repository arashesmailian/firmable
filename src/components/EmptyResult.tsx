import React from "react";

type EmptyResultProps = {
  children: React.ReactNode;
};

export const EmptyResult: React.FC<EmptyResultProps> = ({ children }) => {
  return (
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
        No businesses found
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-4 lg:mb-6 max-w-md mx-auto text-sm lg:text-base px-4">
        Please adjust your filters to search for businesses that match your
        criteria.
      </p>
      {children}
    </div>
  );
};
