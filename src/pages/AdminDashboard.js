import Typography from "@mui/material/Typography";
import NavBar from "../components/NavBar";
import Grid from "@mui/material/Grid";
import AppBarr from "../components/appBar";
import { useState, useEffect } from "react";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Box } from "@mui/material";
import CommonButton from "../components/CommonButton";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Colors from "../Colors";
import { Theme } from "../GlobalStyles";

function AdminDashboard({ darkMode, toggleDarkMode }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const navigate = useNavigate();
  const [role, setRole] = useState("admin");

  useEffect(() => {
    setRole("admin");
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));

      const productsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setProducts(productsData);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const handleAdmin = () => {
    setRole("admin");
    localStorage.setItem("role", "admin");
    navigate("/admin/products?role=admin");
  };

  const handleUser = () => {
    setRole("user");
    localStorage.setItem("role", "user"); 
    navigate("/admin/products?role=user");
  };

  const count = products.length;
  const categories = [...new Set(products.map((item) => item.category))];
  const categoryCount = categories.length;

  if (loading) return <Loader />;

  return (
    <>
      <AppBarr darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Box
        sx={{
          display: "flex",
          width: "100%",
          backgroundColor: darkMode ? Colors.black : Colors.white,
          color: darkMode ? Colors.white : Colors.white,
          minHeight: "100vh",
           position: "absolute",
          left: 0,
          top: 0,
          overflowY: "auto",
          
        }}

      >
        <Grid
          item
          xs={12}
          md={3}
          sx={{
            borderRight: { md: "1px solid #ccc" },
            minHeight: "100vh",
          }}
        >
          <NavBar role={role} darkMode={darkMode} />
        </Grid>

        <Grid
          item
          xs={12}
          md={9}
          sx={{
            p: { xs: 2, md: 4 },
            mt: { xs: 12, md: 10 },
          }}
        >
          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              flexDirection: { xs: "column", sm: "row" },
              gap: 2,
              mt: 10,
              ml: 5,
            }}
          >
            <Box
              sx={{
                height: 180,
                width: { xs: "100%", sm: "48%" },
                bgcolor: darkMode ? Colors.blue : Colors.violet,
                borderRadius: 3,
                p: 2,
                color: darkMode ? Colors.white : Colors.white,
                textAlign: "center",
                border: "2px solid #120a0a",
              }}
            >
              <Typography variant="h6">Total Products</Typography>
              <Typography variant="h3">{count}</Typography>
            </Box>

            <Box
              sx={{
                height: 180,
                width: { xs: "100%", sm: "48%" },
                bgcolor: darkMode ? Colors.blue : Colors.violet,
                borderRadius: 3,
                p: 2,
                color: darkMode ? Colors.white : Colors.white,
                fontSize: darkMode ? Theme.font16Bold : Theme.font14Bold,
                textAlign: "center",
                border: "2px solid #120a0a",
              }}
            >
              <Typography variant="h6">Total Categories</Typography>
              <Typography variant="h3">{categoryCount}</Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 4,
              justifyContent: "center",
              mt: 3,
              ml: 40,
            }}
          >
            <Box
              sx={{
                height: 220,
                width: 260,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: darkMode ? Colors.blue : Colors.violet,
                borderRadius: 4,
                border: "2px solid #120a0a",
                color: darkMode ? Colors.white : Colors.white,
              }}
            >
              <Typography variant="h6">Total Products</Typography>
              <Typography variant="h2" sx={{ mt: 2 }}>
                {count}
              </Typography>
            </Box>

            <Box
              sx={{
                height: 220,
                width: 260,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                bgcolor: darkMode ? Colors.blue : Colors.violet,
                borderRadius: 4,
                border: "2px solid #120a0a",
                color: darkMode ? Colors.white : Colors.white,
              }}
            >
              <Typography variant="h6">Total Categories</Typography>
              <Typography variant="h2" sx={{ mt: 2 }}>
                {categoryCount}
              </Typography>
            </Box>
          </Box>

          <Box
            sx={{
              display: { xs: "flex", md: "none" },
              justifyContent: "center",
              gap: 3,
              mt: 5,
              flexWrap: "wrap",
              ml: 5,
            }}
          >
            <CommonButton
              variant="contained"
              sx={{ color: darkMode ? Colors.white : Colors.white, bgcolor: darkMode ? Colors.orange : Colors.orange, }}
              onClick={handleAdmin}
            >
              Admin
            </CommonButton>

            <CommonButton
              variant="contained"
              sx={{ color: darkMode ? Colors.white : Colors.white, bgcolor: darkMode ? Colors.green : Colors.green, }}
              onClick={handleUser}
            >
              User
            </CommonButton>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
              gap: 5,
              mt: 5,
              flexWrap: "wrap",
              ml: 40,
            }}
          >
            <CommonButton
              variant="contained"
              sx={{ color: darkMode ? Colors.white : Colors.white, bgcolor: darkMode ? Colors.orange : Colors.orange, }}
              onClick={handleAdmin}
            >
              Admin
            </CommonButton>

            <CommonButton
              variant="contained"
              sx={{ color: darkMode ? Colors.white : Colors.white, bgcolor: darkMode ? Colors.green : Colors.green, }}
              onClick={handleUser}
            >
              User
            </CommonButton>
          </Box>
        </Grid>
      </Box>
    </>
  );
}

export default AdminDashboard;