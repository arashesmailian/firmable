import { type Company } from "@/types/Company";
import React from "react";
import { getGstStatusDisplay } from "@/lib/handlers";

type Props = {
  companies: Company[];
};

const ResultList: React.FC<Props> = ({ companies }) => {
  return (
    <>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left font-semibold text-gray-700 border-b">
              Business Name
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700 border-b">
              ABN
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700 border-b">
              GST Status
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700 border-b">
              State
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700 border-b">
              Postcode
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700 border-b">
              Last Updated
            </th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, idx) => {
            const gstDisplay = getGstStatusDisplay(company.gst);

            return (
              <tr
                key={company.id}
                className={
                  idx % 2 === 0
                    ? "bg-gray-50 hover:bg-blue-50"
                    : "bg-white hover:bg-blue-50"
                }
              >
                <td className="px-6 py-3 border-b text-gray-900 font-medium">
                  {company.name}
                </td>
                <td className="px-6 py-3 border-b text-gray-700 font-mono">
                  {company.abn}
                </td>
                <td className="px-6 py-3 border-b">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${gstDisplay.className}`}
                  >
                    {gstDisplay.label}
                  </span>
                </td>
                <td className="px-6 py-3 border-b text-gray-700">
                  {company.address_state}
                </td>
                <td className="px-6 py-3 border-b text-gray-700">
                  {company.address_postcode}
                </td>
                <td className="px-6 py-3 border-b text-gray-500 text-sm">
                  {company.record_last_updated
                    ? new Date(company.record_last_updated).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default ResultList;
