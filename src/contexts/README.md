# GenericContext Documentation

## Overview

The `GenericContext` provides centralized state management for both intern and NSS filtering and data operations across the application. It follows the DRY principle by allowing both the Intern and NSS pages to share the same filtering logic and state management while handling different data structures.

## Features

- **Centralized Filter State**: Manages all filter options (status, level, institution, etc.)
- **Automatic Data Processing**: Handles filtering and sorting with memoization for performance
- **Modal State Management**: Shared modal state between pages
- **Filter Counts**: Automatically calculates counts for all/active/completed interns
- **Type Safety**: Full TypeScript support with proper typing

## Usage

### Basic Setup

```tsx
import { GenericProvider } from "../contexts/GenericContext";
import { internData } from "../data/internData";

// Wrap your component with the provider
<GenericProvider initialData={internData} dataType="intern">
  <YourComponent />
</GenericProvider>;
```

### Using the Context

```tsx
import { useGenericContext } from "../contexts/GenericContext";

const YourComponent = () => {
  const {
    filteredData, // Filtered and sorted person data
    handleFiltersChange, // Function to update filters
    filterCounts, // Counts for all/active/completed
    isModalOpen, // Modal state
    setIsModalOpen, // Modal state setter
    resetFilters, // Reset all filters to default
    dataType, // "intern" or "nss"
  } = useGenericContext();

  return (
    <div>
      <FilterBar
        onFiltersChange={handleFiltersChange}
        filterCounts={filterCounts}
      />
      <Table data={filteredData} dataType={dataType} />
    </div>
  );
};
```

### Advanced Usage with Custom Hook

```tsx
import { usePersonData } from "../hooks/usePersonData";

const YourComponent = () => {
  const {
    addPerson,
    updatePerson,
    removePerson,
    getPersonById,
    searchPersonsByName,
    // ... all context values
  } = usePersonData();

  const handleAddPerson = (newPerson) => {
    addPerson(newPerson);
  };

  // ... rest of your component
};
```

## Context Values

### Data Management

- `data`: Raw person data array (Intern[] or Nss[])
- `setData`: Function to update the person data
- `filteredData`: Filtered and sorted person data (memoized)
- `dataType`: Type of data ("intern" or "nss")

### Filter Management

- `filters`: Current filter state object
- `setFilters`: Function to update filters
- `handleFiltersChange`: Convenient handler for filter changes
- `filterCounts`: Object with counts for all/active/completed
- `resetFilters`: Function to reset all filters to default

### UI State

- `isModalOpen`: Boolean for modal visibility
- `setIsModalOpen`: Function to toggle modal state

## Filter Options

```tsx
interface FilterOptions {
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
  date: string; // ISO date format
}
```

## Performance Considerations

- **Memoization**: `filteredInterns` and `filterCounts` are memoized for optimal performance
- **Selective Updates**: Only re-renders when relevant state changes
- **Efficient Filtering**: Uses optimized filtering algorithms

## File Structure

```
src/
├── contexts/
│   ├── GenericContext.tsx   # Main context implementation for both data types
│   └── README.md           # This documentation
├── hooks/
│   └── usePersonData.ts    # Extended hook with additional methods
├── data/
│   └── internData.ts       # Sample data for intern and NSS
├── Types/
│   ├── intern.ts           # Intern interface
│   └── nss.ts             # NSS interface
└── utils/
    └── filterUtils.ts      # Core filtering and sorting logic
```

## Integration with Pages

Both the Intern and NSS pages use the same context but with different initial data:

```tsx
// In App.tsx
<Route
  path="/app/intern"
  element={
    <GenericProvider initialData={internData} dataType="intern">
      <Intern />
    </GenericProvider>
  }
/>
<Route
  path="/app/nss"
  element={
    <GenericProvider initialData={nssData} dataType="nss">
      <NSS />
    </GenericProvider>
  }
/>
```

This allows both pages to share the same logic while maintaining separate data sets.
