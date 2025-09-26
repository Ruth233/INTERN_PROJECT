import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import SharedPage from "./pages/SharedPage";
import AppLayout from "./components/AppLayout";
import { DynamicGenericProvider } from "./contexts/DynamicGenericProvider";
import { useEffect, useState } from "react";
import { checkAuth } from "./services/api";
import { Toaster } from "react-hot-toast";
import type { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const [status, setStatus] = useState<"checking" | "authed" | "unauthed">(
    "checking"
  );

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await checkAuth();
        if (mounted) setStatus("authed");
      } catch {
        if (mounted) setStatus("unauthed");
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  if (status === "checking") return null;
  if (status === "unauthed") return <Navigate to="/" replace />;
  return children;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route
            path="/app/*"
            element={
              <DynamicGenericProvider>
                <Routes>
                  <Route path="intern" element={<SharedPage />} />
                  <Route path="nss" element={<SharedPage />} />
                </Routes>
              </DynamicGenericProvider>
            }
          />
        </Route>
      </Routes>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "10px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 1000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fff",
            color: "#374151",
          },
        }}
      />
    </BrowserRouter>
  );
};
export default App;
