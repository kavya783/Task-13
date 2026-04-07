import { useParams } from "react-router-dom";
import ProductForm from "./ProductForm";
import Box from "@mui/material/Box";

export default function EditProduct({ darkMode, toggleDarkMode }) {
  const { id } = useParams();

  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", minHeight: "100vh", p: 2 }}
    >
     <ProductForm
  productId={id}
  isEdit
  darkMode={darkMode}
  toggleDarkMode={toggleDarkMode}
/>
    </Box>
  );
}