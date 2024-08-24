import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid } from "@mui/x-data-grid";
import { useFormik } from "formik";
import { number, object, string } from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Box, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { addSalespeople, deleteSalespeople, getSalespeople, updateSalespeople } from "../../../redux/Slice/salespeople.slice";


export default function Salespeople() {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  const salespeople = useSelector((state) => state.salespeoples.salespeoples);
  console.log(salespeople); 

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSalespeople());
  }, []);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEdit(false);
    formik.resetForm();
  };

  const Salespeopleschema = object({
    sname: string().required("Name is required"),
    city: string().required("City is required"),
    comm: number().required("Commission is required"),
  });

  const formik = useFormik({
    initialValues: {
      snum: "",
      sname: "",
      city: "",
      comm: "",
    },
    validationSchema: Salespeopleschema,
    onSubmit: (values, { resetForm }) => {
      if (edit) {
        dispatch(updateSalespeople(values));
      } else {
        dispatch(addSalespeople(values));
      }
      handleClose();
      resetForm();
    },
  });

  const handleDelete = (snum) => {
    dispatch(deleteSalespeople(snum));
  };

  const handleEdit = (data) => {
    formik.setValues(data);
    setEdit(true);
    setOpen(true);
  };

  const columns = [
    { field: "snum", headerName: "ID", width: 70 },
    { field: "sname", headerName: "Sname", width: 130 },
    { field: "city", headerName: "City", width: 130 },
    {
      field: "comm",
      headerName: "Comm",
      type: "number",
      width: 90,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 150,
      renderCell: ({ row }) => (
        <>
          <IconButton onClick={() => handleEdit(row)} variant="contained">
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => handleDelete(row.snum)}
            variant="contained"
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  const { values, errors, touched, handleChange, handleBlur, handleSubmit } =
    formik;

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        SalesPeople
      </Button>
      <Box style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={salespeople}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
          getRowId={(row) => row.snum}
        />
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>SalesPeople</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              margin="dense"
              id="sname"
              name="sname"
              label="sname"
              type="text"
              fullWidth
              variant="standard"
              value={values.sname}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.sname && Boolean(errors.sname)}
              helperText={touched.sname && errors.sname}
            />
            <TextField
              margin="dense"
              id="city"
              name="city"
              label="city"
              type="text"
              fullWidth
              variant="standard"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.city && Boolean(errors.city)}
              helperText={touched.city && errors.city}
            />
            <TextField
              margin="dense"
              id="comm"
              name="comm"
              label="comm"
              type="number"
              fullWidth
              variant="standard"
              value={values.comm}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.comm && Boolean(errors.comm)}
              helperText={touched.comm && errors.comm}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">{edit ? "Update" : "Add"}</Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}