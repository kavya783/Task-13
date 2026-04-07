import { Routes, Route } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard";
import AdminProducts from "../pages/AdminProducts";
import ProductForm from "../pages/ProductForm";
import ProductEdit from "../pages/ProductEdit";
import ProductDetails from "../pages/ProductDetails";

export default function AppRouter({ darkMode, toggleDarkMode }) {
  return (
    <Routes>
      <Route
        path=""
        element={
          <AdminDashboard
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
        }
      />
      <Route
        path=""
        element={
          <AdminProducts
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
        }
      />
      <Route
        path=""
        element={
          <ProductForm
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
        }
      />
      <Route
        path=""
        element={
          <ProductEdit
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
        }
      />
      <Route
        path=""
        element={
          <ProductDetails
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
        }
      />
    </Routes>
  );
}