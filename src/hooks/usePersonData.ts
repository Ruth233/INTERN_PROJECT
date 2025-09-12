import { useCallback } from "react";
import { useGenericContext, type PersonData } from "../contexts/GenericContext";

/**
 * Custom hook that provides convenient methods for managing person data (both intern and NSS)
 * This hook builds on top of the GenericContext to provide additional functionality
 */
export const usePersonData = () => {
  const context = useGenericContext();

  // Add a new person
  const addPerson = useCallback(
    (newPerson: PersonData) => {
      context.setData([...context.data, newPerson]);
    },
    [context]
  );

  // Update an existing person
  const updatePerson = useCallback(
    (id: number, updatedPerson: Partial<PersonData>) => {
      context.setData(
        context.data.map((person) =>
          person.id === id ? { ...person, ...updatedPerson } : person
        )
      );
    },
    [context]
  );

  // Remove a person
  const removePerson = useCallback(
    (id: number) => {
      context.setData(context.data.filter((person) => person.id !== id));
    },
    [context]
  );

  // Get person by ID
  const getPersonById = useCallback(
    (id: number) => {
      return context.data.find((person) => person.id === id);
    },
    [context.data]
  );

  // Get persons by status
  const getPersonsByStatus = useCallback(
    (status: "active" | "completed") => {
      return context.data.filter((person) => {
        const currentDate = new Date();
        const startDate = new Date(
          person.startDate.split("/").reverse().join("-")
        );
        const endDate = new Date(person.endDate.split("/").reverse().join("-"));

        const isActive = currentDate >= startDate && currentDate <= endDate;
        return status === "active" ? isActive : !isActive;
      });
    },
    [context.data]
  );

  // Search persons by name
  const searchPersonsByName = useCallback(
    (searchTerm: string) => {
      return context.data.filter((person) =>
        person.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
    [context.data]
  );

  return {
    // All context values
    ...context,
    // Additional helper methods
    addPerson,
    updatePerson,
    removePerson,
    getPersonById,
    getPersonsByStatus,
    searchPersonsByName,
  };
};
