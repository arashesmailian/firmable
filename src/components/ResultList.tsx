import { type Company } from "@/types/Company";
import React from "react";
import { getGstStatusDisplay } from "@/lib/handlers";

type Props = {
  companies: Company[];
};

export const ResultList: React.FC<Props> = ({ companies }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-300">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-3 py-3 lg:px-6 lg:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <span className="hidden sm:inline">Business</span>
                <span className="sm:hidden">Co.</span>
              </th>
              <th className="px-3 py-3 lg:px-6 lg:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                ABN
              </th>
              <th className="px-3 py-3 lg:px-6 lg:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                GST Status
              </th>
              <th className="px-3 py-3 lg:px-6 lg:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden md:table-cell">
                State
              </th>
              <th className="px-3 py-3 lg:px-6 lg:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                Postcode
              </th>
              <th className="px-3 py-3 lg:px-6 lg:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider hidden xl:table-cell">
                Last Updated
              </th>
              <th className="px-3 py-3 lg:px-6 lg:py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {companies.map((company, idx) => {
              const gstDisplay = getGstStatusDisplay(company.gst);
              const initials = company.name
                .split(" ")
                .map((word) => word.charAt(0))
                .join("")
                .substring(0, 2)
                .toUpperCase();

              return (
                <tr
                  key={company.id}
                  className="company-card hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                  style={{
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {/* Business Info */}
                  <td className="px-3 py-3 lg:px-6 lg:py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-white font-bold text-xs lg:text-sm">
                          {initials}
                        </span>
                      </div>
                      <div className="ml-2 lg:ml-4">
                        <div className="text-xs lg:text-sm font-medium text-gray-900 dark:text-white">
                          {company.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">
                          Australian Business
                        </div>
                        {/* Mobile: Show state here when state column is hidden */}
                        <div className="text-xs text-blue-600 dark:text-blue-400 md:hidden">
                          {company.address_state}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* ABN */}
                  <td className="px-3 py-3 lg:px-6 lg:py-4 whitespace-nowrap text-xs lg:text-sm text-gray-900 dark:text-white font-mono">
                    {company.abn}
                  </td>

                  {/* GST Status */}
                  <td className="px-3 py-3 lg:px-6 lg:py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-1 lg:px-2.5 lg:py-0.5 rounded-full text-xs font-medium ${gstDisplay.className}`}
                    >
                      {gstDisplay.label}
                    </span>
                  </td>

                  {/* State (hidden on mobile) */}
                  <td className="px-3 py-3 lg:px-6 lg:py-4 whitespace-nowrap text-xs lg:text-sm text-gray-900 dark:text-white hidden md:table-cell">
                    <div className="flex items-center">
                      <svg
                        className="w-3 h-3 lg:w-4 lg:h-4 mr-1 text-gray-400"
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
                      {company.address_state}
                    </div>
                  </td>

                  {/* Postcode (hidden on mobile and tablet) */}
                  <td className="px-3 py-3 lg:px-6 lg:py-4 whitespace-nowrap text-xs lg:text-sm text-gray-900 dark:text-white hidden lg:table-cell">
                    {company.address_postcode}
                  </td>

                  {/* Last Updated (hidden on mobile, tablet, and small desktop) */}
                  <td className="px-3 py-3 lg:px-6 lg:py-4 whitespace-nowrap text-xs lg:text-sm text-gray-500 dark:text-gray-400 hidden xl:table-cell">
                    {company.record_last_updated
                      ? new Date(
                          company.record_last_updated
                        ).toLocaleDateString()
                      : "N/A"}
                  </td>

                  {/* Actions */}
                  <td className="px-3 py-3 lg:px-6 lg:py-4 whitespace-nowrap text-xs lg:text-sm font-medium">
                    <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors duration-200 text-xs lg:text-sm">
                        <span className="hidden sm:inline">View</span>
                        <span className="sm:hidden">👁</span>
                      </button>
                      <button className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300 transition-colors duration-200 text-xs lg:text-sm">
                        <span className="hidden sm:inline">Contact</span>
                        <span className="sm:hidden">📞</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
