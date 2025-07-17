"use client";

import { useState } from "react";
import { useCompanies } from "../hooks/useCompanies";
import { INDUSTRIES, EMPLOYEE_RANGES } from "../app/constants";
import { EmptyResult } from "./EmptyResult";
import ResultList from "./ResultList";

export function CompaniesClient() {
  const [filters, setFilters] = useState({
    name: "",
    industry: "",
    employeeRange: null,
  });
  const [hasSearched, setHasSearched] = useState(false);
  const { companies, loading } = useCompanies(filters, hasSearched);

  const onFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((f) => ({ ...f, [name]: value }));
    setHasSearched(true);
  };

  console.log(companies);

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-80 p-6 bg-white border-r min-h-screen shadow-md">
        <h2 className="text-xl font-bold mb-6">Filters</h2>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Name/Keyword</label>
          <input
            className="w-full border p-2 rounded"
            placeholder="Search by name"
            value={filters.name}
            name="name"
            onChange={(e) => onFilterChange(e)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Industry</label>
          <select
            className="w-full border p-2 rounded"
            value={filters.industry}
            name="industry"
            onChange={(e) => onFilterChange(e)}
          >
            <option value="">All</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1"># Employees</label>
          <select
            className="w-full border p-2 rounded"
            value={filters.employeeRange?.label || ""}
            name="employeeRange"
            onChange={(e) => onFilterChange(e)}
          >
            <option value="">All</option>
            {EMPLOYEE_RANGES.map((r) => (
              <option key={r.label} value={r.label}>
                {r.label}
              </option>
            ))}
          </select>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Companies</h1>
        <div className="bg-white rounded-xl shadow-lg p-6 overflow-x-auto">
          {!hasSearched ? (
            <div className="text-center text-gray-400 py-8">
              Please use the filters to search for companies.
            </div>
          ) : loading ? (
            <div className="text-center text-gray-400 py-8">Loading...</div>
          ) : companies.length ? (
            <ResultList companies={companies} />
          ) : (
            <EmptyResult />
          )}
        </div>
      </main>
    </div>
  );
}
