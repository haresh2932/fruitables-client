import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { object, string, number, date, InferType } from 'yup';
import { useFormik } from 'formik';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { FormControl, IconButton, InputLabel, MenuItem, NativeSelect, Select } from '@mui/material';
import axios from 'axios';
import { BASE_URL } from '../../../utils/utilis';
import { useDispatch, useSelector } from 'react-redux';
import { getsubData, handleAdd, handleRemove, handleUpdateData } from '../../../redux/Slice/subcategory.slice';
import { getData } from '../../../redux/Action/category.action';




export default function Subcategory() {
    const [open, setOpen] = React.useState(false);
    const [data, setData] = React.useState([]);
    const [edit, setEdit] = React.useState(null)
    const dispatch = useDispatch();

    const categories = useSelector(state => state.categories)
    console.log(categories.categories);

    const subcategories = useSelector(state => state.subcategories)
    console.log(subcategories);

    useEffect(() => {
        dispatch(getData())
        dispatch(getsubData())
        
    }, [])

    const handleDelete = async (id) => {
        dispatch(handleRemove(id))
    }

    const handleEdit = (data) => {
        console.log(data);
        formik.setValues(data)
        setEdit(data._id)
        setOpen(true);
    }

    const columns = [
        {
            field: "category_id",
            headerName: "Category Name",
            width: 130,
            renderCell: ({ row }) => {

                const category = categories.categories.find(cat => cat._id === row.category_id);
                return category ? category.name : '';
            }
        },
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
                        onClick={(event) => handleDelete(row._id)}
                        variant="contained"
                    >
                        <DeleteIcon />
                    </IconButton>
                </>
            )
        }


    ];



    let subcategorySchema = object({
        category_id: string(),
        name: string().required(),
        description: string().required(),

    });

    const formik = useFormik({
        initialValues: {
            category_id: '',
            name: '',
            description: ''
        },
        validationSchema: subcategorySchema,
        onSubmit: (values, { resetForm }) => {
            if (edit) {
                dispatch(handleUpdateData(values))
                console.log(values);
            } else {
                dispatch(handleAdd(values));
                console.log(values);
            }
            resetForm();
            handleClose();
        },

    });

    const { handleSubmit, handleChange, handleBlur, values, touched, errors, setFieldValue } = formik;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setEdit(null)
    };

    const changeSelect = (event) => {
        setFieldValue("category_id", event.target.value)
    }

    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                Add Subcategory
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <form onSubmit={handleSubmit}>
                    <DialogTitle>Subcategory</DialogTitle>
                    <DialogContent>
                        <FormControl fullWidth variant="standard" margin="dense">
                            <InputLabel id="category-label">Category</InputLabel>
                            <Select
                                labelId="category-label"
                                id="category_id"
                                name="category"
                                value={values.category_id}
                                onChange={changeSelect}
                                onBlur={handleBlur}
                                error={touched.category_id && errors.category_id ? true : false}
                            >
                                {categories.categories.map((category) => (
                                    <MenuItem value={category._id}>
                                        {category.name}
                                    </MenuItem>
                                ))}
                            </Select>
                            {touched.category_id && errors.category_id ? (
                                <div style={{ color: 'red', fontSize: '12px' }}>{errors.category_id}</div>
                            ) : null}
                        </FormControl>
                        <TextField
                            margin="dense"
                            id="name"
                            name="name"
                            label="Enter Subcategory name"
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
                    rows={subcategories.subcategories}
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
        </React.Fragment >
    );
}


