import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";
import CommonButton from "../components/CommonButton";

import {
  collection,
  addDoc,
  doc,
  updateDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import AppBarr from "../components/appBar";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Colors from "../Colors";
import { Theme } from "../GlobalStyles";

export default function ProductForm({ productId, isEdit = false, darkMode, toggleDarkMode  }) {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
 

  const [errors, setErrors] = useState({
    title: false,
    price: false,
    category: false,
    image: false,
    description: false,
  });

  useEffect(() => {
    if (isEdit && productId) {
      const fetchProduct = async () => {
        const docRef = doc(db, "products", productId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setTitle(data.title);
          setPrice(data.price);
          setCategory(data.category);
          setImage(data.image);
          setDescription(data.description || "");
        }
      };
      fetchProduct();
    }
  }, [isEdit, productId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newErrors = {
      title: title.trim() === "",
      price: price === "" || Number(price) <= 0,
      category: category === "",
      image: image.trim() === "",
      description: description.trim() === "",
    };

    setErrors(newErrors);
    if (Object.values(newErrors).some((error) => error)) return;

    try {
      if (isEdit) {
        const docRef = doc(db, "products", productId);
        await updateDoc(docRef, {
          title,
          price: Number(price),
          category,
          image,
          description,
        });
      } else {
        await addDoc(collection(db, "products"), {
          title,
          price: Number(price),
          category,
          image,
          description,
          createdAt: serverTimestamp(),
        });
      }

      setSnackbarOpen(true);
      setTimeout(() => navigate("/admin/products"), 1500);
    } catch (error) {
      console.error("Error saving product: ", error);
    }
  };

  return (
    <>
      <AppBarr darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <Box
        sx={{
          backgroundColor: darkMode ? Colors.black : Colors.white,
          minHeight: "100vh",
          width: "100%",
          position: "fixed",
          left: 0,
          top: 0,
          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",


            pt: "90px"
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              width: { xs: "100%", sm: 400, md: 400 },
              maxWidth: "100%",
              p: 3,
              boxShadow: 3,
             border: 1,
             borderColor: darkMode ? Colors.white : Colors.black,
          backgroundColor: darkMode ? Colors.black : Colors.white,
          
          
         }}
          >
          <TextField
            label="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="dense"
            error={errors.title}
            helperText={errors.title ? "Title is required" : " "}
            sx={{
              width: "100%",
              height: 50,
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
          />

          <TextField
            label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            fullWidth
            margin="dense"
            error={errors.price}
            helperText={errors.price ? "Price must be greater than 0" : " "}
            sx={{
              width: "100%",
              height: 50,
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
          />

          <TextField
            label="Category"
            select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            fullWidth
            margin="dense"
            error={errors.category}
            helperText={errors.category ? "Select a category" : " "}
            sx={{
              width: "100%",
              height: 50,
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
            <MenuItem value="Computer">Computer</MenuItem>
            <MenuItem value="Laptop">Laptop</MenuItem>
            <MenuItem value="Mobile">Mobile</MenuItem>
          </TextField>

          <TextField
            label="Image URL"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            fullWidth
            margin="dense"
            error={errors.image}
            helperText={errors.image ? "Image URL is required" : " "}
            sx={{
              width: "100%",
              height: 50,
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
          />

          <TextField
            label="Description"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="dense"
            error={errors.description}
            helperText={errors.description ? "Description is required" : " "}
            sx={{
              width: "100%",
              height: 50,
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
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 10,
              gap: 5,

            }}
          >
            <CommonButton
              sx={{
               
                color: darkMode ? Colors.white : Colors.black, bgcolor: darkMode ? Colors.blue : Colors.violet, fontSize:Theme.font16Bold
              }}
              onClick={() => navigate("/admin/products")}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </CommonButton>

            <CommonButton type="submit" sx={{
              fontSize: Theme.font16Bold,
              color: darkMode ? Colors.white : Colors.black, bgcolor: darkMode ? Colors.blue : Colors.violet,
            }}>
              {isEdit ? "Update Product" : "Add Product"}
            </CommonButton>
          </Box>
        </Box>

        <Snackbar
          open={snackbarOpen}
          autoHideDuration={2000}
          onClose={() => setSnackbarOpen(false)}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity="success" sx={{ width: "100%" }}>
            Product {isEdit ? "updated" : "added"} successfully!
          </Alert>
        </Snackbar>
      </Box>
    </Box >
    </>
  );
}