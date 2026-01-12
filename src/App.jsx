import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import CategoriesPage from "./pages/CategoriesPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/categories" element={<CategoriesPage />} />
    </Routes>
  );
}
