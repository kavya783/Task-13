import {
  Table, TableBody, TableCell,
  TableContainer, TableHead,
  TableRow, Box,
  Card, CardContent, Typography
} from '@mui/material';

import useMediaQuery from '@mui/material/useMediaQuery';
import { useNavigate } from 'react-router-dom';
import CommonButton from './CommonButton';
import Colors from '../Colors';
import { Theme } from '../GlobalStyles';




export default function ProductTable({ products, onDelete, role, darkMode }) {
console.log("darkMode",darkMode);
console.log("green", Colors.green);

  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");


  if (isMobile) {
    return (
      <Box sx={{ p: 1 }}>
        {products.map((row) => (
          <Card
            key={row.id}
            sx={{
              mb: 2,
              width: "100%",
             boxShadow: darkMode
      ? `0px 4px 10px ${Colors.white}`
      : `0px 4px 10px ${Colors.black}`,
             backgroundColor: darkMode ? Colors.black : Colors.white,
             color: darkMode ?Colors.white: Colors.black,


            }}
          >
            <CardContent sx={{ ml: 3 }}>
              <Box sx={{ mt: 1 }}>
                <img src={row.image} width={120} alt={row.title} />
              </Box>

              <Typography variant="h6">
                <Box component="span" sx={{ mr: 1, fontSize: Theme.font16SemiBold }}>Title:</Box>
                {row.title}
              </Typography>

              <Typography sx={{ fontSize: Theme.font16SemiBold }}>
                <Box component="span" sx={{ mr: 1 }}>Price:</Box>
                {row.price}
              </Typography>

              <Typography sx={{ fontSize: Theme.font16SemiBold }}>
                <Box component="span" sx={{ mr: 1 }}>Category:</Box>
                {row.category}
              </Typography>



              <Box sx={{ display: "flex", gap: 2, mr: 5, mt: 2, }}>

                <CommonButton
                  variant="contained"
                  sx={{ backgroundColor: darkMode ? Colors.green : Colors.green,  color: darkMode ?Colors.white: Colors.black, fontSize: Theme.font14Bold, }}
                  size="small"
                  onClick={() => navigate(`/admin/products/${row.id}?role=${role}`)}
                >
                  View
                </CommonButton>
                {(role === "admin" || !role) && (
                  <>
                    <CommonButton
                      variant="contained"
                      sx={{ backgroundColor: Colors.blue,  color: darkMode ?Colors.white: Colors.black, fontSize: Theme.font14Bold, }}
                      size="small"
                      onClick={() => navigate(`/admin/products/edit/${row.id}`)}
                    >
                      Edit
                    </CommonButton>

                    <CommonButton
                      variant="contained"
                      sx={{ backgroundColor: Colors.red, color: darkMode ?Colors.white: Colors.black, fontSize: Theme.font14Bold, }}
                      size="small"
                      onClick={() => onDelete(row.id)}
                    >
                      Delete
                    </CommonButton>
                  </>
                )}

              </Box>

            </CardContent>
          </Card>
        ))}
      </Box>
    );
  }

  return (
    <Box sx={{ mt: 2, width: "100%" }}>
      <TableContainer sx={{ width: "100%", border: 2, ml: 3 }}>
        <Table size="small">

          <TableHead>
            <TableRow sx={{ bgcolor: darkMode ? Colors.white : Colors.violet, height: 50, border: 2 }}>
              <TableCell sx={{ fontSize: Theme.font16Bold, color: Colors.black  }}>S.No</TableCell>
              <TableCell sx={{ fontSize: Theme.font16Bold, color: Colors.black }}>Title</TableCell>
              <TableCell align="center" sx={{ fontSize: Theme.font16Bold, color: Colors.black }}>Price</TableCell>
              <TableCell align="center" sx={{ fontSize: Theme.font16Bold, color: Colors.black }}>Category</TableCell>
              <TableCell align="center" sx={{ fontSize: Theme.font16Bold, color: Colors.black }}>Image</TableCell>
              <TableCell align="center" sx={{ fontSize: Theme.font16Bold, color: Colors.black }}>Action</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((row, index) => (
              <TableRow key={row.id}>
                <TableCell sx={{ fontSize: Theme.font14SemiBold, color: darkMode ? Colors.white : Colors.black, }} >{index + 1}</TableCell>
                <TableCell sx={{ fontSize: Theme.font14SemiBold, color: darkMode ? Colors.white : Colors.black, }} >{row.title}</TableCell>
                <TableCell align="center" sx={{ fontSize: Theme.font14SemiBold, color: darkMode ? Colors.white : Colors.black, }} >{row.price}</TableCell>
                <TableCell align="center" sx={{ fontSize: Theme.font14SemiBold, color: darkMode ? Colors.white : Colors.black, }} >{row.category}</TableCell>

                <TableCell align="center">
                  <img src={row.image} width={50} alt={row.title} />
                </TableCell>

                <TableCell align="center">
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1,
                      justifyContent: "center"
                    }}
                  >
                    <CommonButton
                      variant="contained"
                      sx={{ backgroundColor: Colors.green, color: darkMode ? Colors.white : Colors.black, fontSize: Theme.font14Bold, }}
                      size="small"
                      onClick={() => navigate(`/admin/products/${row.id}?role=${role}`)}
                    >
                      View
                    </CommonButton>

                    {(role === "admin" || !role) && (
                      <>
                        <CommonButton
                          variant="contained"
                          sx={{ backgroundColor: Colors.blue, color: darkMode ? Colors.white : Colors.black, fontSize: Theme.font14Bold }}
                          size="small"
                          onClick={() => navigate(`/admin/products/edit/${row.id}`)}
                        >
                          Edit
                        </CommonButton>

                        <CommonButton
                          variant="contained"
                          sx={{ backgroundColor: Colors.red, color: darkMode ? Colors.white : Colors.black, fontSize: Theme.font14Bold }}
                          size="small"
                          onClick={() => onDelete(row.id)}
                        >
                          Delete
                        </CommonButton>
                      </>
                    )}

                  </Box>
                </TableCell>

              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    </Box>
  );
}