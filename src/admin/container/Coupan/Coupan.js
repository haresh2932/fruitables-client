import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, createTheme } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { prefixer } from 'stylis';
import rtlPlugin from 'stylis-plugin-rtl';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { date, number, object, string } from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import { ClimbingBoxLoader } from 'react-spinners';
import { addCoupan, deleteCoupan, editCoupan, getCoupan } from '../../../redux/Slice/coupan.slice';
function Coupan(props) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const [edit, setEdit] = useState(false);
    const coupan=useSelector((state)=>state.coupan)
    console.log(coupan);

    
    

    useEffect(() => {
        dispatch(getCoupan())
    }, [])


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setEdit(false)
    };

    const handleEdit = (data) => {
        console.log(data);
        formik.setValues(data)
        setEdit(true)
        setOpen(true);
    }

    const handleDelete = (id) => {
      dispatch(deleteCoupan(id))
    }

    const columns = [

        {
            field: 'coupan',
            headerName: ' Coupan Name',
            width: 150,
        },
        {
            field: 'percentage',
            headerName: 'Percentage ',
            width: 150,
        },
        {
            field: 'expiry',
            headerName: 'Expiry Date',
            // type: 'number',
            width: 150,
        },
        {
            field: "Action",
            headerName: "Action",
            width: 150,
            renderCell: ({ row }) => (
                <>
                    <IconButton
                        onClick={() => handleEdit(row)}
                        variant="contained"
                    >
                        <EditIcon />
                    </IconButton>

                    <IconButton
                        onClick={() => handleDelete(row.id)}
                        variant="contained"
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }
    ];

    let coupanSchema = object({
        coupan: string().required(),
        percentage: number().required(),
        expiry: date().required()
    });


    const formik = useFormik({
        initialValues: {
            coupan: '',
            percentage: '',
            expiry: ''
        },
        validationSchema: coupanSchema,
        onSubmit: (values, { resetForm }) => {
            if (edit) {
                dispatch(editCoupan(values));
               
            } else {
                dispatch(addCoupan(values))
            }

            resetForm()
            handleClose();
        },
    });

    const { handleBlur, handleChange, handleSubmit, values, touched, errors } = formik
    return (
        <>
            {
                    <>
                        <Button variant="outlined" onClick={handleClickOpen} dir='rtl'>
                            Add Coupan
                        </Button>
                        <Box sx={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={coupan.coupan}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 5,
                                        },
                                    },
                                }}
                                pageSizeOptions={[5]}
                                checkboxSelection
                                disableRowSelectionOnClick
                            />
                        </Box>
                        <Dialog
                            // dir='rtl'
                            open={open}
                            onClose={handleClose}
                        >
                            <form onSubmit={handleSubmit}>
                                <DialogTitle>Add Coupan</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        margin="dense"
                                        id="coupan"
                                        name="coupan"
                                        label="Enter Coupan"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.coupan}
                                        error={touched.coupan && errors.coupan ? true : false}
                                        helperText={touched.coupan && errors.coupan ? errors.coupan : ''}
                                    />
                                    
                                    <TextField
                                        margin="dense"
                                        id="percentage"
                                        name="percentage"
                                        label="percentage"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.percentage}
                                        error={touched.percentage && errors.percentage ? true : false}
                                        helperText={touched.percentage && errors.percentage ? errors.percentage : ''}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="expiry"
                                        name="expiry"
                                        label="expiry"
                                        type="date"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.expiry}
                                        error={touched.expiry && errors.expiry ? true : false}
                                        helperText={touched.expiry && errors.expiry ? errors.expiry : ''}
                                    />
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button type="submit">{edit ? 'Update' : 'Add'}</Button>
                                    </DialogActions>
                                </DialogContent>
                            </form>
                        </Dialog>

                    </>
            }
        </>
    );
}


export default Coupan;