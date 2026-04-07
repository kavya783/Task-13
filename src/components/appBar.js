import { useState, useEffect } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { Theme } from "../GlobalStyles";
import Colors from "../Colors";

import DarkMode from "@mui/icons-material/DarkMode";

const AppBarr = ({ darkMode, toggleDarkMode }) => {
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      setTotalProducts(querySnapshot.size);
    };
    fetchProducts();
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor:  Colors.violet,
      }}
    >
      <Toolbar
        sx={{
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 1,
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: 100 },
            textAlign: "center",
            display: { xs: "block", sm: "none", md: "block" },
          }}
        >
          <img src="/logo.png" alt="logo" style={{ height: 60 }} />
        </Box>

        <Typography
          variant="h5"
          sx={{
            flexGrow: 1,
            textAlign: "center",
            fontWeight: "bold",
            display: { xs: "none", sm: "block", md: "block" },
            mt: 2,
            fontSize: Theme.headings,
            color: darkMode ? Colors.white: Colors.white,
          }}
        >
          Admin Dashboard
        </Typography>

        <DarkMode
          onClick={toggleDarkMode}
          sx={{
            ml: 4,
            mr: 5,
            cursor: "pointer",
            color: darkMode ? Colors.white : Colors.black,
          }}
        />

        <Box sx={{ textAlign: "center", display: { xs: "none", md: "block" } }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: Theme.font20Bold,
              color: darkMode ? Colors.white : Colors.white,
            }}
          >
            Total Products: {totalProducts}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarr;