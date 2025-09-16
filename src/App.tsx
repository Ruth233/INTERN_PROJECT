import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import SharedPage from "./pages/SharedPage";
import AppLayout from "./components/AppLayout";
import { DynamicGenericProvider } from "./contexts/DynamicGenericProvider";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/app" element={<AppLayout />}>
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
