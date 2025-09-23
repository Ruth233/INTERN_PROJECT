import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "./pages/Auth";
import SharedPage from "./pages/SharedPage";
import AppLayout from "./components/AppLayout";
import { DynamicGenericProvider } from "./contexts/DynamicGenericProvider";
import { useEffect, useState } from "react";
import { checkAuth } from "./api";

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
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
    </BrowserRouter>
  );
};
export default App;
