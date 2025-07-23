import React from "react";
import { ThemeToggle } from "./ThemeToggle";

interface PageTitleProps {
  onCloseMobileSidebar?: () => void;
}

export const PageTitle: React.FC<PageTitleProps> = ({
  onCloseMobileSidebar,
}) => {
  return (
    <div className="p-4 lg:p-6 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg
              className="w-4 h-4 lg:w-6 lg:h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 8h1m-1 4h1m4-4h1m-1 4h1"
              />
            </svg>
          </div>
          <div>
            <h1 className="text-lg lg:text-xl font-bold text-gray-900 dark:text-white">
              <span className="hidden sm:inline">Business Directory</span>
              <span className="sm:hidden">Businesses</span>
            </h1>
            <p className="text-xs lg:text-sm text-gray-500 dark:text-gray-400">
              <span className="hidden sm:inline">
                Find your next opportunity
              </span>
              <span className="sm:hidden">Find companies</span>
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <ThemeToggle />
          {/* Mobile Close Button */}
          {onCloseMobileSidebar && (
            <button
              onClick={onCloseMobileSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
            >
              <svg
                className="w-4 h-4 text-gray-600 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
