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
        path="/admin/products"
        element={
          <AdminProducts
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
        }
      />
      <Route
        path="/admin/products/add"
        element={
          <ProductForm
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
        }
      />
      <Route
        path="/admin/products/edit/:id"
        element={
          <ProductEdit
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
          />
        }
      />
      <Route
        path="/admin/products/:id"
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