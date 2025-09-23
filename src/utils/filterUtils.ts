import type { Intern } from "../Types/intern";

// Note: These utilities primarily work with Intern type structure
// The GenericContext handles conversion for NSS data to make it compatible

export interface FilterOptions {
  status: "all" | "active" | "completed";
  orderBy: "" | "createdAtDesc" | "createdAtAsc";
  level: "" | "100" | "200" | "300" | "400";
  institution: string;
  interest:
    | ""
    | "database"
    | "web-dev"
    | "networking"
    | "cyber-security"
    | "hardware";
  date: string;
  searchTerm: string;
}

// Helper function to parse date strings in DD/MM/YY format
export const parseDate = (dateString: string): Date => {
  const [day, month, year] = dateString.split("/");
  // Convert 2-digit year to 4-digit year (assuming 20xx)
  const fullYear = year?.length === 2 ? `20${year}` : year;
  return new Date(`${fullYear}-${month}-${day}`);
};

// Helper function to determine if a person is currently active based on dates
export const isPersonActive = (person: {
  startDate: string;
  endDate: string;
}): boolean => {
  const currentDate = new Date();
  const startDate = parseDate(person.startDate);
  const endDate = parseDate(person.endDate);

  // Person is active if current date is between start and end dates (inclusive)
  return currentDate >= startDate && currentDate <= endDate;
};

// Helper function to perform regex search on person names
export const searchByName = (
  person: { name: string },
  searchTerm: string
): boolean => {
  if (!searchTerm?.trim()) return true;

  try {
    // Create a case-insensitive regex from the search term
    // Escape special regex characters and create a flexible pattern
    const escapedTerm = searchTerm.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escapedTerm, "i");
    return regex.test(person.name);
  } catch {
    // If regex creation fails, fall back to simple case-insensitive string matching
    return person.name.toLowerCase().includes(searchTerm.toLowerCase());
  }
};

// Filter function
export const filterInterns = (
  interns: Intern[],
  filters: FilterOptions
): Intern[] => {
  return interns.filter((intern) => {
    // Search term filter - must be first to apply regex search
    if (!searchByName(intern, filters.searchTerm)) {
      return false;
    }

    // Status filter
    if (filters.status === "active" && !isPersonActive(intern)) {
      return false;
    }
    if (filters.status === "completed" && isPersonActive(intern)) {
      return false;
    }

    // Level filter
    if (filters.level && intern.level.toString() !== filters.level) {
      return false;
    }

    // Institution filter
    if (filters.institution && intern.institution !== filters.institution) {
      return false;
    }

    // Interest filter - match partial strings for flexibility
    if (filters.interest) {
      const interestMap: Record<string, string[]> = {
        database: ["database", "data science", "data"],
        "web-dev": ["web", "development", "frontend", "backend"],
        networking: ["networking", "network"],
        "cyber-security": ["cyber", "security"],
        hardware: ["hardware"],
      };

      const searchTerms = interestMap[filters.interest] || [filters.interest];
      const internInterest = intern.interest.toLowerCase();

      if (
        !searchTerms.some((term) => internInterest.includes(term.toLowerCase()))
      ) {
        return false;
      }
    }

    // Date filter - show interns who started on or after the selected date
    if (filters.date) {
      const filterDate = new Date(filters.date);
      const internStartDate = parseDate(intern.startDate);

      if (internStartDate < filterDate) {
        return false;
      }
    }

    return true;
  });
};

// Sort function
export const sortInterns = (interns: Intern[], orderBy: string): Intern[] => {
  if (!orderBy) return interns;

  const sortedInterns = [...interns];

  switch (orderBy) {
    case "createdAtDesc":
      // Sort by start date (newest first)
      return sortedInterns.sort((a, b) => {
        const dateA = parseDate(a.startDate);
        const dateB = parseDate(b.startDate);
        return dateB.getTime() - dateA.getTime();
      });

    case "createdAtAsc":
      // Sort by start date (oldest first)
      return sortedInterns.sort((a, b) => {
        const dateA = parseDate(a.startDate);
        const dateB = parseDate(b.startDate);
        return dateA.getTime() - dateB.getTime();
      });

    default:
      return sortedInterns;
  }
};

// Combined filter and sort function
export const filterAndSortInterns = (
  interns: Intern[],
  filters: FilterOptions
): Intern[] => {
  const filtered = filterInterns(interns, filters);
  return sortInterns(filtered, filters.orderBy);
};

// Helper function to get filter counts for display
export const getFilterCounts = (
  persons: { startDate: string; endDate: string }[]
) => {
  const total = persons.length;
  const active = persons.filter(isPersonActive).length;
  const completed = total - active;

  return {
    all: total,
    active,
    completed,
  };
};
