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
              <span className="hidden sm:inline">Business</span>
              <span className="sm:hidden">Co.</span>
            </th>
            <th className="px-3 py-3 lg:px-6 lg:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
              ABN
            </th>
            <th className="px-3 py-3 lg:px-6 lg:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              <span className="hidden sm:inline">GST Status</span>
              <span className="sm:hidden">GST</span>
            </th>
            <th className="px-3 py-3 lg:px-6 lg:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
              State
            </th>
            <th className="px-3 py-3 lg:px-6 lg:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden xl:table-cell">
              Postcode
            </th>
            <th className="px-3 py-3 lg:px-6 lg:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden xl:table-cell">
              Last Update
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {companies.map((company) => {
            const gstDisplay = getGstStatusDisplay(company.gst);
            return (
              <tr
                key={company.id}
                className="company-card hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {/* Business Info */}
                <td className="px-3 py-3 lg:px-6 lg:py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-xs lg:text-sm">
                        {company.name.substring(0, 2).toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-2 lg:ml-4">
                      <div className="text-xs lg:text-sm font-medium text-gray-900 dark:text-white">
                        {company.name}
                      </div>
                      {/* Mobile: Show ABN here when ABN column is hidden */}
                      <div className="text-xs text-gray-500 dark:text-gray-400 md:hidden">
                        ABN: {company.abn}
                      </div>
                      {/* Mobile: Show state and postcode when their columns are hidden */}
                      <div className="text-xs text-blue-600 dark:text-blue-400 lg:hidden">
                        {company.address_state}
                        {company.address_postcode &&
                          ` ${company.address_postcode}`}
                      </div>
                    </div>
                  </div>
                </td>

                {/* ABN (hidden on mobile) */}
                <td className="px-3 py-3 lg:px-6 lg:py-4 whitespace-nowrap hidden md:table-cell">
                  <span className="text-xs lg:text-sm text-gray-900 dark:text-white">
                    {company.abn}
                  </span>
                </td>

                {/* GST Status */}
                <td className="px-3 py-3 lg:px-6 lg:py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2 py-1 lg:px-2.5 lg:py-0.5 rounded-full text-xs font-medium ${gstDisplay.className} dark:bg-opacity-20`}
                  >
                    <span className="hidden lg:inline">{gstDisplay.label}</span>
                    <span className="lg:hidden">
                      {company.gst === "CAN"
                        ? "C"
                        : company.gst === "NON"
                        ? "N"
                        : "A"}
                    </span>
                  </span>
                </td>

                {/* State (hidden on mobile and tablet) */}
                <td className="px-3 py-3 lg:px-6 lg:py-4 whitespace-nowrap text-xs lg:text-sm text-gray-900 dark:text-white hidden lg:table-cell">
                  <div className="flex items-center">
                    <svg
                      className="w-3 h-3 lg:w-4 lg:h-4 mr-1 text-gray-400 hidden sm:block"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span>{company.address_state}</span>
                  </div>
                </td>

                {/* Postcode (hidden on mobile, tablet, and small desktop) */}
                <td className="px-3 py-3 lg:px-6 lg:py-4 whitespace-nowrap text-xs lg:text-sm text-gray-900 dark:text-white hidden xl:table-cell">
                  {company.address_postcode}
                </td>

                {/* Last Update (hidden on mobile, tablet, and small desktop) */}
                <td className="px-3 py-3 lg:px-6 lg:py-4 whitespace-nowrap text-xs lg:text-sm text-gray-900 dark:text-white hidden xl:table-cell">
                  {company.record_last_updated
                    ? new Date(company.record_last_updated).toLocaleDateString(
                        "en-AU",
                        {
                          year: "2-digit",
                          month: "2-digit",
                          day: "2-digit",
                        }
                      )
                    : "N/A"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
