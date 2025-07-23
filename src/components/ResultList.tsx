import { type Company } from "@/types/Company";
import React from "react";
import { getGstStatusDisplay } from "@/lib/handlers";

type Props = {
  companies: Company[];
};

export const ResultList: React.FC<Props> = ({ companies }) => {
  return (
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
              Last Update
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
                  ? new Date(company.record_last_updated).toLocaleDateString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
