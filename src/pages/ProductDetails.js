import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import { db } from "../firebase";
import NavBar from "../components/NavBar";
import AppBarr from "../components/appBar";
import Loader from "../components/Loader";
import ConfirmDialog from "../components/ConfirmDialog";
import CommonButton from "../components/CommonButton";

import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { Theme } from "../GlobalStyles";
import Colors from "../Colors";

function ProductDetails({ darkMode, toggleDarkMode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
 

  const params = new URLSearchParams(location.search);
  const role = params.get("role");

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct({
          id: docSnap.id,
          ...docSnap.data(),
        });
      }

      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const handleDelete = () => setOpenDialog(true);

  const handleConfirmDelete = async () => {
    await deleteDoc(doc(db, "products", product.id));
    setOpenDialog(false);
    navigate("/admin/products");
  };

  const handleCancelDelete = () => setOpenDialog(false);

  if (loading) return <Loader />;

  if (!product) {
    return <Typography sx={{ p: 4 }}>Product not found</Typography>;
  }

  return (
    <>
      <AppBarr darkMode={darkMode} toggleDarkMode={toggleDarkMode}
      />
      <Box
         sx={{
          backgroundColor: darkMode ? Colors.black : Colors.white,
          minHeight: "100vh",
          width: "100%",
          position: "absolute",
          left: 0,
          top: 0,
          overflowY: "auto",
        }}
      >

        <Box sx={{ display: "flex" }}>
          <NavBar role={role} darkMode={darkMode} />

          <Box
            sx={{
              ml: { md: "240px" },
              mt: { xs: 18, md: 10 },
              p: { xs: 2, md: 3 },
              width: "100%",
              display: "flex",
              justifyContent: "center",



            }}
          >
            <Card
              sx={{
                width: "100%",
                maxWidth: 900,
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                overflow: "hidden",
                mt: 3,


              }}
            >
              <CardMedia
                component="img"
                image={product.image}
                alt={product.title}
                sx={{
                  width: { xs: "90%", md: "50%" },
                  height: {
                    xs: 200,
                    sm: 500,
                    md: 320,
                    lg: 380,
                  },
                  mt: 3,
                  // objectFit: "cover",
                }}
              />

              <CardContent
                sx={{
                  width: { xs: "100%", md: "50%" },
                  p: { xs: 2, md: 3 },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  fontSize: Theme.font16Regular,
                  color: Colors.black,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mb: 1,
                    fontSize: { xs: "18px", md: "24px" },
                  }}
                >
                  {product.title}
                </Typography>

                <Typography sx={{ mb: 1 }}>
                  <b>Price:</b> ₹ {product.price}
                </Typography>

                <Typography sx={{ mb: 1 }}>
                  <b>Category:</b> {product.category}
                </Typography>

                <Typography sx={{ mb: 2 }}>
                  <b>Description:</b>{" "}
                  {product.description || "No description available"}
                </Typography>

                <Box
                  sx={{
                    mt: 2,
                    display: "flex",
                    gap: 1,
                    flexWrap: "wrap",
                  }}
                >
                  {role !== "user" && (
                    <>
                      <CommonButton
                        sx={{ fontSize: Theme.font14Bold, color: Colors.black, bgcolor: Colors.blue }}
                        size="small"
                        onClick={() =>
                          navigate(
                            `/admin/products/edit/${product.id}?role=admin`
                          )
                        }
                      >
                        Edit
                      </CommonButton>

                      <CommonButton
                        sx={{ fontSize: Theme.font14Bold, color: Colors.black, bgcolor: Colors.red }}
                        size="small"
                        onClick={handleDelete}
                      >
                        Delete
                      </CommonButton>
                    </>
                  )}

                  <CommonButton
                    variant="outlined"
                    sx={{ fontSize: Theme.font14Bold, color: Colors.black }}
                    size="small"
                    onClick={() => navigate(-1)}
                  >
                    Back
                  </CommonButton>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
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

export default ProductDetails;