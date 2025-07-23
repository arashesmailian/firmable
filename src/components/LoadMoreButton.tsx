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
    <div className="p-4 border-t border-gray-200 dark:border-gray-700 text-center">
      <div className="p-4 text-left">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Showing {companyLength} of {totalPagination.toLocaleString()} results
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
  );
};
