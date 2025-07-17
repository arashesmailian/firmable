import { Company } from "@/app/type";
import React from "react";

type Props = {
  companies: Company[];
};

const ResultList: FC<Props> = ({ companies }) => {
  return (
    <>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left font-semibold text-gray-700 border-b">
              Name
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700 border-b">
              Industry
            </th>
            <th className="px-6 py-3 text-left font-semibold text-gray-700 border-b">
              # Employees
            </th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company, idx) => (
            <tr
              key={company.id}
              className={
                idx % 2 === 0
                  ? "bg-gray-50 hover:bg-blue-50"
                  : "bg-white hover:bg-blue-50"
              }
            >
              <td className="px-6 py-3 border-b text-gray-900">
                {company.name}
              </td>
              <td className="px-6 py-3 border-b text-gray-700">
                {company.industry}
              </td>
              <td className="px-6 py-3 border-b text-gray-500">
                {company.num_employees}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default ResultList;
