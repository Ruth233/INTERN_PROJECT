import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Intern from "./pages/Intern";
import NSS from "./pages/NSS";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/intern" element={<Intern />} />
        <Route path="/NSS" element={<NSS />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
