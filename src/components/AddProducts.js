import ProductForm from "./ProductForm";
import Box from "@mui/material/Box";

export default function AddProduct() {
  return (
    <Box
      sx={{ display: "flex", justifyContent: "center", minHeight: "100vh", p: 2 }}
    >
      <ProductForm isEdit={false} />
    </Box>
  );
}