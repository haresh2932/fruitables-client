import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { array, mixed, number, object, string } from 'yup';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { addProducts, editProducts, getProducts, removeProducts } from '../../../redux/Action/product.action';
import { ClimbingBoxLoader } from 'react-spinners';
import { getData } from '../../../redux/Action/category.action';
import { getsubData } from '../../../redux/Slice/subcategory.slice';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { getVariantData, handleAdd, handleRemove, handleUpdateData } from '../../../redux/Slice/variant.slice';

function Variants(props) {
    const [open, setOpen] = React.useState(false);
    const [edit, setEdit] = useState(false);
    const [getcategory, setCategory] = useState('');
    const [getsubcategory, setSubcategory] = useState('');
    const [data, setData] = useState([]);
    const [dynamicFields, setDynamicFields] = useState([]);
    const [imgFields, setImgFields] = useState([]);

    const categories = useSelector(state => state.categories.categories);
    const subcategories = useSelector(state => state.subcategories.subcategories);
    const products = useSelector(state => state.products.products);
    const variants = useSelector(state => state.variants.variants);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getData());
        dispatch(getsubData());
        dispatch(getProducts());
        dispatch(getVariantData());
    }, [dispatch]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        formik.resetForm();
        setEdit(false);
    };

    const handleEdit = (data) => {
        formik.setValues({
            ...data,
            attributes: Object.entries(data.attributes).map(([key, value]) => ({ key, value })),
            img: data.img
        });
        setCategory(data.category_id);
        setSubcategory(data.subcategory_id);
        setDynamicFields(Object.entries(data.attributes).map(([key, value]) => ({ key, value })));
        const imgPreviews = data.img.map((img) => ({
            file: null,
            preview: img.url
        }));
        setImgFields(imgPreviews);
        setEdit(true);
        setOpen(true);
    };

    const handleDelete = (id) => {
        dispatch(handleRemove(id));
    };

    const subcategoryValue = subcategories.filter((v) => v.category_id === getcategory);
    const productValue = products.filter((v) => v.subcategory_id === getsubcategory);

    const columns = [
        {
            field: "category_id",
            headerName: "Category Name",
            width: 130,
            renderCell: ({ row }) => {
                const category = categories.find((v) => v._id === row.category_id);
                return category ? category.name : '';
            },
        },
        {
            field: "subcategory_id",
            headerName: "Subcategory Name",
            width: 130,
            renderCell: ({ row }) => {
                const subcategory = subcategories.find((v) => v._id === row.subcategory_id);
                return subcategory ? subcategory.name : '';
            },
        },
        {
            field: 'product_id',
            headerName: 'Product',
            width: 150,
            renderCell: ({ row }) => {
                const product = products.find((v) => v._id === row.product_id);
                return product ? product.name : '';
            },
        },
        {
            field: 'name',
            headerName: 'Product Name',
            width: 150,
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            width: 150,
        },
        {
            field: 'price',
            headerName: 'Price',
            width: 150,
        },
        {
            field: 'discount',
            headerName: 'Discount',
            width: 150,
        },
        {
            field: 'variant_img',
            headerName: 'Image',
            width: 150,
            renderCell: ({ row }) => (
                <img src={row.variant_img?.url} width="50" height="50" alt={row.name} />
            ),
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
                    <IconButton onClick={() => handleDelete(row._id)} variant="contained">
                        <DeleteIcon />
                    </IconButton>
                </>
            ),
        },
    ];

    let variantSchema = object({
        category_id: string().required('Category is required'),
        subcategory_id: string().required('Subcategory is required'),
        product_id: string().required('Product is required'),
        name: string().required('Name is required'),
        quantity: number().required('Quantity is required'),
        price: number().required('Price is required'),
        variant_img: mixed()
            .required("Please select an image")
            .test("fileSize", "The file is too large", (value) => {
                if (value?.size) {
                    return value && value.size <= 2 * 1024 * 1024; // 2MB
                }
                return true;
            })
            .test("fileType", "Unsupported File Format", (value) => {
                if (value?.type) {
                    return ["image/jpeg", "image/png", "image/gif"].includes(value.type);
                }
                return true;
            }),
        attributes: array().of(
            object().shape({
                key: string().required('Key is required'),
                value: string().required('Value is required')
            })
        ).min(1, 'At least one attribute is required')
    });

    const formik = useFormik({
        initialValues: {
            category_id: '',
            subcategory_id: '',
            product_id: '',
            name: '',
            quantity: '',
            price: '',
            attributes: [],
            variant_img: []
        },
        validationSchema: variantSchema,
        onSubmit: (values, { resetForm }) => {
            const attributesObject = values.additionalFields.reduce((acc, field) => {
                acc[field.key] = field.value;
                return acc;
            }, {});

            const formData = new FormData();
            imgFields.forEach((img, index) => {
                if (img.file) {
                    formData.append(`img[${index}]`, img.file);
                }
            });

            const valueData = {
                ...values,
                attributes: attributesObject,
                variant_img: imgFields
            };

            if (edit) {
                dispatch(handleUpdateData(valueData));
            } else {
                dispatch(handleAdd(valueData));
            }

            resetForm();
            handleClose();
            setDynamicFields([{ key: "", value: "" }]);
            setImgFields([]);
        },
    });

    const { handleBlur, handleChange, handleSubmit, values, touched, errors, setFieldValue, setValues, setInputs } = formik;

    const changeSelect = (id) => {
        setFieldValue("category_id", id);
        setCategory(id);
    };

    const changeSubcategory = (id) => {
        setFieldValue("subcategory_id", id);
        setSubcategory(id);
    };

    const changeProducts = (id) => {
        setFieldValue("product_id", id);
    };

    const removeField = (index) => {
        const updatedFields = [...dynamicFields];
        updatedFields.splice(index, 1);
        setDynamicFields(updatedFields);
        setFieldValue('additionalFields', updatedFields);
    };

    const handleDynamicFieldChange = (index, field) => (e) => {
        const updatedFields = [...dynamicFields];
        updatedFields[index][field] = e.target.value;
        setDynamicFields(updatedFields);
        setFieldValue('additionalFields', updatedFields);
    };

    const addField = () => {
        const newField = { key: '', value: '' };
        setDynamicFields([...dynamicFields, newField]);
        setFieldValue('additionalFields', [...dynamicFields, newField]);
    };

    const addImgField = () => {
        setImgFields([...imgFields, { file: null, preview: '' }]);
    };

    const removeImgField = (index) => {
        const updatedFields = [...imgFields];
        updatedFields.splice(index, 1);
        setImgFields(updatedFields);
    };

    const handleImgChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const updatedFields = [...imgFields];
            updatedFields[index] = {
                file,
                preview: URL.createObjectURL(file)
            };
            setImgFields(updatedFields);
        }
    };

    return (
        <div>
            <Button variant="contained" onClick={handleClickOpen}>
                Add Variant
            </Button>
            <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
                <DialogTitle>{edit ? "Edit Variant" : "Add Variant"}</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel>Category</InputLabel>
                                <Select
                                    name="category_id"
                                    value={values.category_id}
                                    onChange={(e) => changeSelect(e.target.value)}
                                    onBlur={handleBlur}
                                    error={touched.category_id && Boolean(errors.category_id)}
                                >
                                    {categories.map((val) => (
                                        <MenuItem key={val._id} value={val._id}>{val.name}</MenuItem>
                                    ))}
                                </Select>
                                {touched.category_id && errors.category_id && (
                                    <div style={{ color: 'red', fontSize: 12 }}>{errors.category_id}</div>
                                )}
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel>Subcategory</InputLabel>
                                <Select
                                    name="subcategory_id"
                                    value={values.subcategory_id}
                                    onChange={(e) => changeSubcategory(e.target.value)}
                                    onBlur={handleBlur}
                                    error={touched.subcategory_id && Boolean(errors.subcategory_id)}
                                >
                                    {subcategoryValue.map((val) => (
                                        <MenuItem key={val._id} value={val._id}>{val.name}</MenuItem>
                                    ))}
                                </Select>
                                {touched.subcategory_id && errors.subcategory_id && (
                                    <div style={{ color: 'red', fontSize: 12 }}>{errors.subcategory_id}</div>
                                )}
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel>Product</InputLabel>
                                <Select
                                    name="product_id"
                                    value={values.product_id}
                                    onChange={(e) => changeProducts(e.target.value)}
                                    onBlur={handleBlur}
                                    error={touched.product_id && Boolean(errors.product_id)}
                                >
                                    {productValue.map((val) => (
                                        <MenuItem key={val._id} value={val._id}>{val.name}</MenuItem>
                                    ))}
                                </Select>
                                {touched.product_id && errors.product_id && (
                                    <div style={{ color: 'red', fontSize: 12 }}>{errors.product_id}</div>
                                )}
                            </FormControl>

                            <TextField
                                fullWidth
                                name="name"
                                label="Name"
                                value={values.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.name && Boolean(errors.name)}
                                helperText={touched.name && errors.name}
                            />

                            <TextField
                                fullWidth
                                name="quantity"
                                label="Quantity"
                                type="number"
                                value={values.quantity}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.quantity && Boolean(errors.quantity)}
                                helperText={touched.quantity && errors.quantity}
                            />

                            <TextField
                                fullWidth
                                name="price"
                                label="Price"
                                type="number"
                                value={values.price}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.price && Boolean(errors.price)}
                                helperText={touched.price && errors.price}
                            />
                            
                            <TextField
                                fullWidth
                                name="quantity"
                                label="Price"
                                type="number"
                                value={values.quantity}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                error={touched.quantity && Boolean(errors.quantity)}
                                helperText={touched.quantity && errors.quantity}
                            />

                            {dynamicFields.map((field, index) => (
                                <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                                    <TextField
                                        fullWidth
                                        name={`key_${index}`}
                                        label="Key"
                                        value={field.key}
                                        onChange={handleDynamicFieldChange(index, 'key')}
                                    />
                                    <TextField
                                        fullWidth
                                        name={`value_${index}`}
                                        label="Value"
                                        value={field.value}
                                        onChange={handleDynamicFieldChange(index, 'value')}
                                    />
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => removeField(index)}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            ))}

                            <Button variant="contained" onClick={addField}>Add Attribute</Button>

                            {imgFields.map((imgField, index) => (
                                <Box key={index} sx={{ display: 'flex', gap: 2 }}>
                                    <input
                                        accept="image/*"
                                        id={`image_${index}`}
                                        type="file"
                                        onChange={(e) => handleImgChange(index, e)}
                                    />
                                    {imgField.preview && (
                                        <img
                                            src={imgField.preview}
                                            alt={`Preview ${index}`}
                                            style={{ width: 100, height: 100 }}
                                        />
                                    )}
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() => removeImgField(index)}
                                    >
                                        Remove
                                    </Button>
                                </Box>
                            ))}

                            <Button variant="contained" onClick={addImgField}>Add Image</Button>

                            {touched.variant_img && errors.variant_img && (
                                <div style={{ color: 'red', fontSize: 12 }}>{errors.variant_img}</div>
                            )}
                        </Box>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit" variant="contained" color="primary">
                                {edit ? "Update" : "Add"}
                            </Button>
                        </DialogActions>
                    </form>
                </DialogContent>
            </Dialog>

            <Box mt={4}>
                {variants.length === 0 ? (
                    <ClimbingBoxLoader color="#36d7b7" />
                ) : (
                    <DataGrid
                        rows={variants}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        autoHeight
                        getRowId={row => row._id}
                    />
                )}
            </Box>
        </div>
    );
}

export default Variants;
