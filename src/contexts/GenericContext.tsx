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
  type FilterOptions,
} from "../utils/filterUtils";

// Union type for data
export type PersonData = Intern | Nss;
export type PersonType = "intern" | "nss";

// Type guards to check data type
export const isIntern = (person: PersonData): person is Intern => {
  return "level" in person;
};

export const isNss = (person: PersonData): person is Nss => {
  return "nssID" in person && "email" in person;
};

interface GenericContextType {
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

  // Memoized filtered and sorted data
  const filteredData = useMemo(() => {
    // Convert PersonData to Intern for filtering (they have compatible structures)
    const internCompatibleData = data.map((person) => {
      if (isIntern(person)) {
        return person;
      } else {
        // Convert NSS to Intern-compatible structure for filtering
        return {
          ...person,
          level: 400, // Default level for NSS
        } as Intern;
      }
    });

    const filtered = filterAndSortInterns(internCompatibleData, filters);

    // Map back to original data structure
    return filtered.map(
      (filteredItem) =>
        data.find((originalItem) => originalItem.id === filteredItem.id)!
    );
  }, [data, filters]);

  // Memoized filter counts for display
  const filterCounts = useMemo(() => {
    // Convert to intern-compatible for counting
    const internCompatibleData = data.map((person) => {
      if (isIntern(person)) {
        return person;
      } else {
        return {
          ...person,
          level: 400,
        } as Intern;
      }
    });

    return getFilterCounts(internCompatibleData);
  }, [data]);

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
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
    resetFilters,
  };

  return (
    <GenericContext.Provider value={value}>{children}</GenericContext.Provider>
  );
};

// Custom hook to use the GenericContext
export const useGenericContext = (): GenericContextType => {
  const context = useContext(GenericContext);
  if (context === undefined) {
    throw new Error("useGenericContext must be used within a GenericProvider");
  }
  return context;
};

// Export the context for advanced use cases
export { GenericContext };
