import { useState } from "react";

export default function FilterBar() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => setActiveFilter(filter.key)}
          className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
            activeFilter === filter.key
              ? "bg-blue-950 text-white border-blue-950"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {filter.label}
        </button>
      ))}

      <div className="relative">
        <select
          className="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
          defaultValue=""
        >
          <option value="">Order By</option>
          <option value="createdAtDesc">Newest</option>
          <option value="createdAtAsc">Oldest </option>
        </select>
      </div>

      <div className="relative">
        <select
          className="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
          defaultValue=""
        >
          <option value="">Year/Level</option>
          <option value="100">Level 100</option>
          <option value="200">Level 200</option>
          <option value="300">Level 300</option>
          <option value="400">Level 400</option>
        </select>
      </div>

      <div className="relative">
        <select
          className="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
          defaultValue=""
        >
          <option value="">Institution</option>
          <option value="Ghana Communication Technology University">
            GCTU
          </option>
          <option value="Intercom Programming Manufacturing Company">
            IPMC
          </option>
          <option value="University of Ghana">UG</option>
          <option value="Kwame Nkrumah University of Science and Technology">
            KNUST
          </option>
          <option value="University of Cape Coast">UCC</option>
          <option value="University of Education, Winneba">UEW</option>
          <option value="University of Health and Allied Sciences">UHAS</option>
          <option value="Ghana Institute of Management and Public Administration">
            GIMPA
          </option>
          <option value="University of Energy and Natural Resources">
            UER
          </option>
          <option value="University of Professional Studies, Accra">
            UPSA
          </option>
          <option value="Ashesi University">Ashesi University</option>
          <option value="Valley View University">Valley View University</option>
        </select>
      </div>

      <div className="relative">
        <select
          className="px-4 py-2 rounded-full border border-gray-300 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-900"
          defaultValue=""
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
        />
      </div>
    </div>
  );
}
