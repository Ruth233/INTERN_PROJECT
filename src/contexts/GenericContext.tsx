import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  type ReactNode,
} from "react";
import type { Intern } from "../Types/intern";
import type { Nss } from "../Types/nss";
import {
  filterAndSortInterns,
  getFilterCounts,
  isPersonActive,
  parseDate,
  searchByName,
  type FilterOptions,
} from "../utils/filterUtils";

// Union type for data
export type PersonData = Intern | Nss;
export type PersonType = "intern" | "nss";

export interface GenericContextType {
  // Data management
  data: PersonData[];
  setData: (data: PersonData[]) => void;
  filteredData: PersonData[];

  // Type information
  dataType: PersonType;

  // Filter management
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  handleFiltersChange: (newFilters: FilterOptions) => void;
  filterCounts: {
    all: number;
    active: number;
    completed: number;
  };

  // Modal management (shared between pages)
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  editingItem: PersonData | null;
  setEditingItem: (item: PersonData | null) => void;
  openEditModal: (item: PersonData) => void;

  // Reset filters
  resetFilters: () => void;
}

const GenericContext = createContext<GenericContextType | undefined>(undefined);

const defaultFilters: FilterOptions = {
  status: "all",
  orderBy: "",
  level: "",
  institution: "",
  interest: "",
  date: "",
  searchTerm: "",
};

interface GenericProviderProps {
  children: ReactNode;
  initialData?: PersonData[];
  dataType: PersonType;
}

export const GenericProvider: React.FC<GenericProviderProps> = ({
  children,
  initialData = [],
  dataType,
}) => {
  const [data, setData] = useState<PersonData[]>(initialData);
  const [filters, setFilters] = useState<FilterOptions>(defaultFilters);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PersonData | null>(null);

  // Memoized filtered and sorted data
  const filteredData = useMemo(() => {
    if (dataType === "intern") {
      // For intern data, use the existing filter functions
      const filtered = filterAndSortInterns(data as Intern[], filters);
      return filtered;
    } else {
      // For NSS data, we need to filter manually since they don't have level field
      let filtered = data.filter((person) => {
        // Search term filter - must be first to apply regex search
        if (!searchByName(person, filters.searchTerm)) {
          return false;
        }

        // Status filter
        if (filters.status === "active" && !isPersonActive(person)) {
          return false;
        }
        if (filters.status === "completed" && isPersonActive(person)) {
          return false;
        }

        // Institution filter
        if (filters.institution && person.institution !== filters.institution) {
          return false;
        }

        // Interest filter
        if (filters.interest) {
          const interestMap: Record<string, string[]> = {
            database: ["database", "data science", "data"],
            "web-dev": ["web", "development", "frontend", "backend"],
            networking: ["networking", "network"],
            "cyber-security": ["cyber", "security"],
            hardware: ["hardware"],
          };

          const searchTerms = interestMap[filters.interest] || [
            filters.interest,
          ];
          const personInterest = person.interest.toLowerCase();

          if (
            !searchTerms.some((term) =>
              personInterest.includes(term.toLowerCase())
            )
          ) {
            return false;
          }
        }

        // Date filter
        if (filters.date) {
          const filterDate = new Date(filters.date);
          const personStartDate = parseDate(person.startDate);

          if (personStartDate < filterDate) {
            return false;
          }
        }

        return true;
      });

      // Apply sorting for NSS data
      if (filters.orderBy) {
        filtered = [...filtered].sort((a, b) => {
          const dateA = parseDate(a.startDate);
          const dateB = parseDate(b.startDate);

          if (filters.orderBy === "createdAtDesc") {
            return dateB.getTime() - dateA.getTime();
          } else if (filters.orderBy === "createdAtAsc") {
            return dateA.getTime() - dateB.getTime();
          }
          return 0;
        });
      }

      return filtered;
    }
  }, [data, filters, dataType]);

  // Memoized filter counts for display
  const filterCounts = useMemo(() => {
    // Use the data directly since getFilterCounts only needs startDate and endDate
    return getFilterCounts(data);
  }, [data]);

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
  };

  const openEditModal = (item: PersonData) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const value: GenericContextType = {
    data,
    setData,
    filteredData,
    dataType,
    filters,
    setFilters,
    handleFiltersChange,
    filterCounts,
    isModalOpen,
    setIsModalOpen,
    editingItem,
    setEditingItem,
    openEditModal,
    resetFilters,
  };

  return (
    <GenericContext.Provider value={value}>{children}</GenericContext.Provider>
  );
};

// Custom hook to use the GenericContext
// eslint-disable-next-line react-refresh/only-export-components
export const useGenericContext = (): GenericContextType => {
  const context = useContext(GenericContext);
  if (context === undefined) {
    throw new Error("useGenericContext must be used within a GenericProvider");
  }
  return context;
};

// Export the context for advanced use cases (commented out for fast refresh)
// export { GenericContext };
