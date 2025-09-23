import React, { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { GenericProvider } from "./GenericContext";
import type { PersonType } from "./GenericContext";
import { getInterns, getNss, login } from "../api";

interface DynamicGenericProviderProps {
  children: React.ReactNode;
}

export const DynamicGenericProvider: React.FC<DynamicGenericProviderProps> = ({
  children,
}) => {
  const location = useLocation();

  // Extract dataType from pathname
  const { dataType } = useMemo(() => {
    const pathname = location.pathname;

    if (pathname.includes("/intern")) {
      return {
        dataType: "intern" as PersonType,
      };
    } else if (pathname.includes("/nss")) {
      return {
        dataType: "nss" as PersonType,
      };
    }

    // Default fallback
    return {
      dataType: "intern" as PersonType,
    };
  }, [location.pathname]);

  const [initialData, setInitialData] = useState<any[]>([]);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        try {
          await login("admin", "ChangeMe123!");
        } catch (err) {
          // ignore login error (might already be logged in)
        }
        const data =
          dataType === "intern" ? await getInterns() : await getNss();
        if (isMounted) setInitialData(data);
      } catch (e) {
        console.error(e);
        if (isMounted) setInitialData([]);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [dataType, location.pathname]);

  return (
    <GenericProvider initialData={initialData} dataType={dataType}>
      {children}
    </GenericProvider>
  );
};
