import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Intern from "./pages/Intern";
import NSS from "./pages/NSS";
import AppLayout from "./components/AppLayout";
import { GenericProvider } from "./contexts/GenericContext";
import { internData, nssData } from "./data/internData";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/app" element={<AppLayout />}>
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
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
