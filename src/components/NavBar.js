import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Colors from "../Colors";
import { Theme } from "../GlobalStyles";

function NavBar({ role, darkMode }) { 
  const [open, setOpen] = useState(false);
  const [roled, setRoled] = useState('');
  const location = useLocation();

  useEffect(() => {
    const ghjk = async()=>{
      const storedRole = await localStorage.getItem("role");
      if (storedRole) setRoled(storedRole);
    }
    ghjk();
  }, []);

  const linkStyles = {
    p: 2,
    display: "block",
    textDecoration: "none",
    color: darkMode ? Colors.white : Colors.black,
    "&:hover": {
      color: darkMode ? Colors.white : Colors.red,
    },
  };

  const drawerContent = (
    <Box 
      sx={{ 
        width: 240, 
        mt: 5,
        backgroundColor: darkMode ? Colors.black : Colors.white,
        height: "100%"
      }}
    >
      <Link to="" style={{ textDecoration: "none" }}>
        <Typography
          sx={{
            ...linkStyles,
            ...(location.pathname === "" && {
              backgroundColor: darkMode ? "#1e1e1e" : Colors.white,
              color: Colors.red,
              fontSize:Theme.font16SemiBold,
            }),
          }}
        >
          Dashboard
        </Typography>
      </Link>

      <Divider />

      <Link to="" style={{ textDecoration: "none" }}>
        <Typography
          sx={{
            ...linkStyles,
            ...(location.pathname === "" && {
              backgroundColor: darkMode ? "#1e1e1e" : Colors.white,
              color: Colors.red,
              fontSize:Theme.font16SemiBold,
            }),
          }}
        >
          Manage Products
        </Typography>
      </Link>

      <Divider />

      {(roled === "admin" || !roled) && (
        <Link to="" style={{ textDecoration: "none" }}>
          <Typography
            sx={{
              ...linkStyles,
              ...(location.pathname === "" && {
                backgroundColor: darkMode ? "#1e1e1e" : Colors.white,
                color:Colors.red,
                fontSize:Theme.font16SemiBold,
              }),
            }}
          >
            Add Product
          </Typography>
        </Link>
      )}

      <Divider />
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          display: { xs: "block", md: "none" },
          position: "absolute",
          top: 90,
          right: 16,
          zIndex: 1300,
        }}
      >
        <IconButton onClick={() => setOpen(true)}>
          <MenuIcon sx={{ color: darkMode ? "#fff" : "#000" }} />
        </IconButton>
      </Box>

      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 240,
            top: "60px",
            backgroundColor: darkMode ? Colors.black : Colors.white,
          },
        }}
      >
        {drawerContent}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: 240,
            top: "70px",
            height: "calc(100vh - 64px)",
            backgroundColor: darkMode ? Colors.black : Colors.white,
          },
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default NavBar;