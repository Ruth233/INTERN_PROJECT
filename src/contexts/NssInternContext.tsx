import { createContext } from "react";

const NssInternContext = createContext();

const NssInternProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    status: "all",
    orderBy: "",
    level: "",
    institution: "",
    interest: "",
    date: "",
  });

  // Memoized filtered and sorted data
  const filteredData = useMemo(() => {
    return filterAndSortInterns(data, filters);
  }, [filters]);

  // Memoized filter counts for display
  const filterCounts = useMemo(() => {
    return getFilterCounts(data);
  }, []);

  const handleFiltersChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  return <NssInternContext.Provider>{children}</NssInternContext.Provider>;
};
