import { FaSearch, FaTimes } from "react-icons/fa";
import { useGenericContext } from "../contexts/GenericContext";
import { useState } from "react";

const Header = ({ title, summary }: { title: string; summary: string }) => {
  const { filters, handleFiltersChange } = useGenericContext();
  const [searchValue, setSearchValue] = useState(filters.searchTerm);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Update the filters with the new search term
    handleFiltersChange({
      ...filters,
      searchTerm: searchValue,
    });
  };

  const handleClearSearch = () => {
    setSearchValue("");
    handleFiltersChange({
      ...filters,
      searchTerm: "",
    });
  };

  return (
    <div className="mb-3 w-[90%] mx-auto">
      <h2 className="font-bold text-2xl">{title}</h2>
      <div className="flex justify-between items-center">
        <p>{summary}</p>
        <form onSubmit={handleSubmit} className="flex">
          <div className="border border-gray-700 rounded-2xl flex items-center px-3 gap-1">
            <FaSearch color="gray" />
            <input
              type="text"
              placeholder="Search by name or institution..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="outline-none bg-transparent py-1 text-sm"
            />
            {searchValue && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1"
                aria-label="Clear search"
              >
                <FaTimes size={15} />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default Header;
