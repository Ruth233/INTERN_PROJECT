# GenericContext Documentation

## Overview

The `GenericContext` provides centralized state management for both intern and NSS filtering and data operations across the application. It follows the DRY principle by allowing both the Intern and NSS pages to share the same filtering logic and state management while handling different data structures.

## 🔰 Beginner's Guide: How GenericContext Works

### What is GenericContext?

Think of GenericContext as a **central data manager** for your app. Instead of each page (Intern page, NSS page) managing its own data and filtering logic separately, they all use this one shared system. It's like having a librarian who manages books for everyone instead of each person managing their own pile of books.

### The Big Picture Flow

```
1. App starts → Creates GenericProvider with data
2. Page loads → Gets data from GenericProvider
3. User applies filters → GenericProvider processes them
4. Page displays → Filtered and sorted results
```

### Key Components Explained

#### 1. **PersonData & PersonType**

```typescript
export type PersonData = Intern | Nss;
export type PersonType = "intern" | "nss";
```

- **What it does**: Defines what kind of data we can work with
- **Why it matters**: Allows the same system to handle both intern and NSS data
- **Think of it as**: A label that says "this data is either intern info or NSS info"

#### 2. **GenericContextType Interface**

```typescript
interface GenericContextType {
  data: PersonData[]; // Raw data
  filteredData: PersonData[]; // Processed data
  dataType: PersonType; // "intern" or "nss"
  filters: FilterOptions; // Current filter settings
  // ... more properties
}
```

- **What it does**: Defines what information the context provides
- **Think of it as**: A contract that says "here's what you can expect from this context"

#### 3. **GenericProvider Component**

This is the main component that does all the heavy lifting.

##### Props it receives:

- `children`: The page components that will use this data
- `initialData`: The starting data (intern list or NSS list)
- `dataType`: Whether it's handling "intern" or "nss" data

##### Internal State:

```typescript
const [data, setData] = useState<PersonData[]>(initialData);
const [filters, setFilters] = useState<FilterOptions>(defaultFilters);
const [isModalOpen, setIsModalOpen] = useState(false);
```

- **data**: The original list of people
- **filters**: Current filter settings (what the user selected)
- **isModalOpen**: Whether the add/edit modal is open

### 🔄 The Filtering Process (Step by Step)

#### Step 1: User Changes Filters

When user selects a filter (like "Active only" or "Level 200"), the `handleFiltersChange` function is called.

#### Step 2: filteredData Calculation

This is where the magic happens! The `useMemo` hook automatically recalculates filtered data whenever filters change.

**For Intern Data:**

```typescript
if (dataType === "intern") {
  const filtered = filterAndSortInterns(data as Intern[], filters);
  return filtered;
}
```

- Uses existing filter functions that understand intern-specific fields (like level)

**For NSS Data:**

```typescript
else {
  let filtered = data.filter((person) => {
    // Check if person matches current filters
    if (filters.status === "active" && !isPersonActive(person)) {
      return false; // Person doesn't match, exclude them
    }
    // ... more filter checks
    return true; // Person matches all filters, include them
  });
}
```

- Custom filtering because NSS data doesn't have level field
- Checks each person against each active filter

#### Step 3: Results Displayed

The filtered data is automatically passed to components, which re-render with new results.

### 🧩 Key Functions Explained

#### `isPersonActive(person)`

```typescript
const isActive = isPersonActive(person);
```

- **What it does**: Checks if someone is currently active based on their start/end dates
- **How it works**: Compares current date with person's start and end dates
- **Returns**: `true` if person is currently active, `false` if completed

#### `parseDate(dateString)`

```typescript
const startDate = parseDate(person.startDate);
```

- **What it does**: Converts date strings like "23/04/25" into proper Date objects
- **Why needed**: JavaScript needs proper Date objects to compare dates
- **Think of it as**: A translator that converts human-readable dates to computer-readable dates

#### `handleFiltersChange(newFilters)`

```typescript
const handleFiltersChange = (newFilters: FilterOptions) => {
  setFilters(newFilters);
};
```

- **What it does**: Updates the filter settings when user makes changes
- **Triggers**: Automatic recalculation of filtered data
- **Think of it as**: The button that applies your filter choices

### 🔄 Data Flow Diagram

```
User Input (FilterBar)
        ↓
handleFiltersChange()
        ↓
filters state updated
        ↓
useMemo detects change
        ↓
filteredData recalculated
        ↓
Components re-render
        ↓
User sees filtered results
```

### 🎯 Why This Architecture?

#### Benefits:

1. **DRY Principle**: One filtering system for both intern and NSS pages
2. **Automatic Updates**: When filters change, results update automatically
3. **Performance**: `useMemo` ensures filtering only happens when needed
4. **Type Safety**: TypeScript ensures we handle data correctly
5. **Separation of Concerns**: Each function has one clear job

#### The Alternative (Why This is Better):

Without GenericContext, each page would need:

- Its own data state
- Its own filtering logic
- Its own modal state
- Duplicate code everywhere

### 🚀 How to Use It

#### In App.tsx:

```typescript
<GenericProvider initialData={internData} dataType="intern">
  <Intern />
</GenericProvider>
```

- Creates a context instance with intern data

#### In Page Components:

```typescript
const { filteredData, handleFiltersChange, filterCounts } = useGenericContext();
```

- Gets the processed data and functions from context

#### The Result:

- Page gets filtered data automatically
- User interactions trigger updates seamlessly
- No duplicate code between pages

This architecture makes the code maintainable, performant, and easy to extend with new features!

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
