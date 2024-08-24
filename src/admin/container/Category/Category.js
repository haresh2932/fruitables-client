import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getData, handleAdd, handleDelete, handleUpdateData } from '../../../redux/Action/category.action';




export default function Category() {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [edit, setEdit] = React.useState(null)
    const dispatch=useDispatch()
    const categories=useSelector(state=>state.categories)
    console.log(categories.categories);

    useEffect(() => {
        dispatch(getData())
    }, [])

    const handleRemove=(id)=>{
        console.log(id);
        dispatch(handleDelete(id))
    }
    const handleEdit = (data) => {
        console.log(data);
        formik.setValues(data)
        setEdit(data._id)
        setOpen(true);
    }

    const columns = [
        {
            field: "name",
            headerName: "Name",
            width: 130
        },
        {
            field: "description",
            headerName: "Description",
            width: 200,
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
                        onClick={(event) => handleRemove(row._id)}
                        variant="contained"
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }


    ];

   

   

    let categorySchema = object({
        name: string().required(),
        description: string().required(),

    });



    const formik = useFormik({
        initialValues: {
            name: '',
            description: '',
        },
        validationSchema: categorySchema,
        onSubmit: (values, { resetForm }) => {
            if (edit) {
                console.log(values);
                dispatch(handleUpdateData(values))
            } else {
                console.log(values);
                dispatch(handleAdd(values));
            }
            resetForm();
            handleClose();
        },

    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors } = formik;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setEdit(null)
    };

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Category
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Category</DialogTitle>
                    <DialogContent>
                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="Enter category name"
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
                            error={touched.description && errors.description ? true : false}
                            margin="dense"
                            id="description"
                            name="description"
                            label="description"
                            type="text"
                            fullWidth
                            variant="standard"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.description}
                            helperText={touched.description && errors.description ? errors.description : ''}

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
                    rows={categories.categories}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    getRowId={row => row._id}
                />
            </div>
        </React.Fragment>
    );
}