import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import NavBar from "../components/NavBar";
import ProductTable from "../components/ProductTable";
import AppBarr from "../components/appBar";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { TablePagination } from "@mui/material";
import * as React from "react";
import { useLocation } from "react-router-dom";
import Colors from "../Colors";

import { collection, getDocs, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

import ConfirmDialog from "../components/ConfirmDialog";
import Loader from "../components/Loader";

function AdminProducts({ darkMode, toggleDarkMode }) {

  const [products, setProducts] = useState([]);
  const [queryText, setQueryText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [loading, setLoading] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const categories = ["All", "Computer", "Laptop", "Mobile"];
  const location = useLocation();

 

  const params = new URLSearchParams(location.search);
  const role = params.get("role");

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const handleConfirmDelete = async () => {
    await deleteDoc(doc(db, "products", selectedId));
    setProducts(products.filter(p => p.id !== selectedId));
    setOpenDialog(false);
  };

  const handleCancelDelete = () => {
    setOpenDialog(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(q);

      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productsData);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((prod) => {
    const searchLower = queryText.toLowerCase().trim();

    const matchesTitle = prod.title.toLowerCase().includes(searchLower);
    const matchesPrice = prod.price.toString().includes(searchLower);

    const matchesCategory =
      selectedCategory === "All" || prod.category === selectedCategory;

    return (matchesTitle || matchesPrice) && matchesCategory;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedProducts = filteredProducts.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <AppBarr darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Box
        sx={{
          backgroundColor: darkMode ? Colors.black : Colors.white,
          minHeight: "100vh",
          
          overflowY: "auto",
          position:"absolute",
        }}
      >
        <Grid
          container
          sx={{
            color: darkMode ? Colors.white : Colors.black,
          }}
        >
          <Grid item xs={12} md="auto">
            <NavBar darkMode={darkMode} />
          </Grid>


          <Grid
            item
            xs
            sx={{

              pt: { xs: 15, md: 10 },
              display: { xs: "flex", sm: "none" },
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                p: { xs: 0, md: 2 },
                display: "flex",
                gap: 2,
                width: "100%",
                flexDirection: "column",
              }}
            >
              <TextField
                variant="outlined"
                sx={{
                  width: "100%",
                    "& .MuiInputBase-root": {
                    backgroundColor: Colors.white,
                  },
                  "& .MuiInputLabel-root": {
                    color: Colors.black,
                    backgroundColor: Colors.white,
                    px: 1,
                  },
                  "& .MuiSvgIcon-root": {
                    color: Colors.black,
                  }
                }}
                label="Search by title or price"
                size="small"
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
              />

              <FormControl
                sx={{
                  width: 300,
                  mt: 5,
                  "& .MuiInputBase-root": {
                    backgroundColor: Colors.white,
                  },
                  "& .MuiInputLabel-root": {
                    color: Colors.black,
                    backgroundColor: Colors.white,
                    px: 1,
                  },
                  "& .MuiSvgIcon-root": {
                    color: Colors.black,
                  }
                }}
                size="small"
              >
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Category"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ width: "100%", mt: 2 }}>
              {loading ? (
                <Loader />
              ) : (
                <ProductTable
                  products={paginatedProducts}
                  onDelete={handleDeleteClick}
                  role={role}
                  darkMode={darkMode}
                />
              )}
            </Box>
          </Grid>


          <Grid
            item
            xs
            sx={{
              pl: {sm:"2px",md: "240px",lg:"300px" },
              pt: { xs: 15, md: 10 },
              display: { xs: "none", sm: "flex" },
              flexDirection: "column",
              alignItems: "center",
              px: 3,
            }}
          >
            <Box
              sx={{
                p: { xs: 0, md: 2 },
                display: "flex",
                gap: 2,
                width: "100%",
                maxWidth: 1200,
                flexDirection: "row",
              }}
            >
              <TextField
                sx={{
                  width: 600,
                  mt: 5,
                   "& .MuiInputBase-root": {
                    backgroundColor: Colors.white,
                  },
                  "& .MuiInputLabel-root": {
                    color: Colors.black,
                    backgroundColor: Colors.white,
                    px: 1,
                  },
                  "& .MuiSvgIcon-root": {
                    color: Colors.black,
                  }
                }}
                label="Search by title or price"
                size="small"
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
              />

              <FormControl
                sx={{
                  width: 300,
                  mt: 5,
                  "& .MuiInputBase-root": {
                    backgroundColor: Colors.white,
                  },
                  "& .MuiInputLabel-root": {
                    color: Colors.black,
                    backgroundColor: Colors.white,
                    px: 1,
                  },
                  "& .MuiSvgIcon-root": {
                    color: Colors.black,
                  }
                }}
                size="small"
              >
                <InputLabel>Category</InputLabel>
                <Select
                  value={selectedCategory}
                  label="Category"
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ width: "100%", mt: 2 }}>
              {loading ? (
                <Loader />
              ) : (
                <ProductTable
                  products={paginatedProducts}
                  onDelete={handleDeleteClick}
                  role={role}
                  darkMode={darkMode}
                />
              )}
            </Box>
          </Grid>



          <TablePagination
            component="div"
            count={filteredProducts.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
            sx={{ mt: 2, ml: { sm: "350px", md: "650px", lg: "900px" }, color: darkMode ? Colors.white : Colors.black, }}
          />
        </Grid>
      </Box>


      <ConfirmDialog
        open={openDialog}
        title="Delete Product"
        message="Are you sure you want to delete this product?"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />

    </>
  );
}

export default AdminProducts;