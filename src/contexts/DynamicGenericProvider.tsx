import React, { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { GenericProvider } from "./GenericContext";
import { internData, nssData } from "../data/internData";
import type { PersonType } from "./GenericContext";

interface DynamicGenericProviderProps {
  children: React.ReactNode;
}

export const DynamicGenericProvider: React.FC<DynamicGenericProviderProps> = ({
  children,
}) => {
  const location = useLocation();

  // Extract dataType from pathname
  const { dataType, initialData } = useMemo(() => {
    const pathname = location.pathname;

    if (pathname.includes("/intern")) {
      return {
        dataType: "intern" as PersonType,
        initialData: internData,
      };
    } else if (pathname.includes("/nss")) {
      return {
        dataType: "nss" as PersonType,
        initialData: nssData,
      };
    }

    // Default fallback
    return {
      dataType: "intern" as PersonType,
      initialData: internData,
    };
  }, [location.pathname]);

  return (
    <GenericProvider initialData={initialData} dataType={dataType}>
      {children}
    </GenericProvider>
  );
};
