import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useFormik } from 'formik';
import { object, string, number, date, InferType } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addfacilities, editFacility, removeFacility } from '../../../redux/Action/facilities.action';
import { DataGrid } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import { Spinner } from 'reactstrap';
import { ClimbingBoxLoader } from 'react-spinners';





function Facilities(props) {
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const facilities = useSelector(state => state.facilities)
    console.log(facilities.facilities);
    const [edit, setEdit] = useState(false)
    // const [loading, setLoading] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setEdit(false)
    };

    let facilitiesSchema = object({
        name: string().required(),
        discription: string().required(),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            discription: '',
        },
        validationSchema: facilitiesSchema,
        onSubmit: (values, { resetForm }) => {
            if (edit) {
                // console.log("yes",values);
                dispatch(editFacility(values))
            } else {
                const rNo = Math.floor((Math.random() * 1000))
                dispatch(addfacilities({ ...values, id: rNo }))
            }
            
            resetForm()
            handleClose();
        },
    });

    const { handleBlur, handleChange, handleSubmit, values, touched, errors } = formik

    const handleEdit = (data) => {
        console.log(data);
        formik.setValues(data)
        setEdit(true)
        setOpen(true);
    }

    const handleDelete = (id) => {
        console.log(id);
        dispatch(removeFacility(id));
    }

    const columns = [
        // { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'name',
            headerName: 'Name',
            width: 130
        },
        {
            field: 'discription',
            headerName: 'Discription',
            width: 130
        },
        {
            field: "Action",
            headerName: "Action",
            width: 200,
            renderCell: ({ row }) => (
                <>
                    <IconButton
                        onClick={(event) => handleEdit(row)}
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


    return (
        <>
            {
                facilities.isLoading? 
                    <ClimbingBoxLoader color="#36d7b7" />
                    :
                    <>
                        <Button variant="outlined" onClick={handleClickOpen}>
                            Add Facilities
                        </Button>
                        <Dialog
                            open={open}
                            onClose={handleClose}
                        >
                            <form onSubmit={handleSubmit}>
                                <DialogTitle>Facilities</DialogTitle>
                                <DialogContent>
                                    <TextField
                                        margin="dense"
                                        id="name"
                                        name="name"
                                        label="Facilities Name"
            
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name}
                                        error={touched.name && errors.name ? true : false}
                                        helperText={touched.name && errors.name ? errors.name : ''}
                                    />
                                    <TextField
                                        margin="dense"
                                        id="discription"
                                        name="discription"
                                        label="Facilities discription"
                                        type="text"
                                        fullWidth
                                        variant="standard"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.discription}
                                        error={touched.discription && errors.discription ? true : false}
                                        helperText={touched.discription && errors.discription ? errors.discription : ''}

                                    />
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button type="submit">{edit ? 'Update' : 'Add'}</Button>
                                    </DialogActions>
                                </DialogContent>
                            </form>
                        </Dialog>
                        <div style={{ height: 400, width: '100%' }}>
                            <DataGrid
                                rows={facilities.facilities}
                                columns={columns}
                                initialState={{
                                    pagination: {
                                        paginationModel: { page: 0, pageSize: 5 },
                                    },
                                }}
                                pageSizeOptions={[5, 10]}
                                checkboxSelection
                            />
                        </div>
                    </>
                }
        </>
    );
}

export default Facilities;