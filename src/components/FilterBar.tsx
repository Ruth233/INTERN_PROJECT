import { useState } from "react";
import type { FilterOptions } from "../utils/filterUtils";
import { useGenericContext } from "../contexts/GenericContext";

interface FilterBarProps {
  onFiltersChange: (filters: FilterOptions) => void;
  filterCounts?: {
    all: number;
    active: number;
    completed: number;
  };
}

export default function FilterBar({
  onFiltersChange,
  filterCounts,
}: FilterBarProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    status: "all",
    orderBy: "",
    level: "",
    interest: "",
    date: "",
    searchTerm: "",
  });

  const statusFilters = [
    { key: "all" as const, label: "All", count: filterCounts?.all },
    { key: "active" as const, label: "Active", count: filterCounts?.active },
    {
      key: "completed" as const,
      label: "Completed",
      count: filterCounts?.completed,
    },
  ];

  const updateFilter = (key: keyof FilterOptions, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const { isNssPage } = useGenericContext();

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6 mx-auto justify-center">
      {statusFilters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => updateFilter("status", filter.key)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
            filters.status === filter.key
              ? "bg-blue-950 text-white border-blue-950"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {filter.label}
          {filter.count !== undefined && (
            <span className="ml-1 text-xs opacity-75">({filter.count})</span>
          )}
        </button>
      ))}

      <div className="relative">
        <select
          className="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
          value={filters.orderBy}
          onChange={(e) => updateFilter("orderBy", e.target.value)}
        >
          <option value="">Order By</option>
          <option value="createdAtDesc">Newest</option>
          <option value="createdAtAsc">Oldest</option>
        </select>
      </div>

      {isNssPage ? null : (
        <div className="relative">
          <select
            className="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
            value={filters.level}
            onChange={(e) => updateFilter("level", e.target.value)}
          >
            <option value="">Year/Level</option>
            <option value="100">Level 100</option>
            <option value="200">Level 200</option>
            <option value="300">Level 300</option>
            <option value="400">Level 400</option>
          </select>
        </div>
      )}

      <div className="relative">
        <select
          className="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
          value={filters.interest}
          onChange={(e) => updateFilter("interest", e.target.value)}
        >
          <option value="">Interest</option>
          <option value="database">Database/Data science</option>
          <option value="web-dev">Web development</option>
          <option value="networking">Networking</option>
          <option value="cyber-security">Cyber Security</option>
          <option value="hardware">Hardware</option>
        </select>
      </div>

      <div className="relative">
        <input
          type="date"
          className="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
          value={filters.date}
          onChange={(e) => updateFilter("date", e.target.value)}
          placeholder="Start date from..."
        />
      </div>
    </div>
  );
}
