import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, TextField, createTheme } from '@mui/material';
import { useParams } from "react-router-dom";
import { object, string, number, date, InferType ,} from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, editReview, getReview, removeReview } from "../../../redux/Action/review.action";
import Rating from '@mui/material/Rating';
// import TextField from '@mui/material/TextField';
import { ClimbingBoxLoader } from 'react-spinners';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
// import { id } from "useParams"


function Review(props) {
    const dispatch = useDispatch()
    const review = useSelector(state => state.reviews);
    console.log(review.reviews);
    const [edit, setEdit] = useState(false)
    const { id } = useParams();

    useEffect(() => {
        dispatch(getReview())
    }, [])

    let reviewSchema = object({
        // productId: string().required(),
        name: string().required(),
        email: string().required(),
        review: string().required(),
        rating: number().min(1).max(5).required(),
    });

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            review: '',
            rating: '',
        },
        validationSchema: reviewSchema,
        onSubmit: (values, { resetForm }) => {
            if(edit){
                console.log(values);
                dispatch(editReview(values))                    
            }else{
                console.log(values);
                dispatch(addReview({ ...values, productId: id, date: new Date().toLocaleDateString() }));
            }
            resetForm();
        },
    })

    const handleDelete = (id) => {
        dispatch(removeReview(id));
    }

    const handleEdit = (data) => {
        console.log(data);
        formik.setValues(data)
        setEdit(true)
    }

    const { handleBlur, handleChange, handleSubmit, values, touched, errors } = formik
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h4 className="mb-5 fw-bold">Leave a Reply</h4>
                <div className="row g-4">
                    <div className="col-lg-6">
                        <div className="border-bottom rounded">
                            <TextField
                                type="text"
                                name='name'
                                id='name'
                                className="form-control border-0 me-4"
                                placeholder="Yur Name *"
                                value={values.name}
                                error={touched.name && errors.name ? true : false}
                                helperText={touched.name && errors.name ? errors.name : ''}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className="border-bottom rounded">
                            <TextField
                                type="email"
                                className="form-control border-0"
                                placeholder="Your Email *"
                                name='email'
                                id='email'
                                value={values.email}
                                error={touched.email && errors.email ? true : false}
                                helperText={touched.email && errors.email ? errors.email : ''}
                                onBlur={handleBlur}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="border-bottom rounded my-4">
                            <TextField
                                name='review'
                                id='review'
                                className="form-control border-0"
                                multiline
                                cols={30}
                                rows={8}
                                placeholder="Your Review *"
                                spellCheck="false"
                                defaultValue={""}
                                value={values.review}
                                error={touched.review && errors.review ? true : false}
                                helperText={touched.review && errors.review ? errors.review : ''}
                                onBlur={handleBlur}
                                onChange={handleChange}

                            />
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="d-flex justify-content-between py-3 mb-5">
                            <div className="d-flex align-items-center">
                                {/* <p className="mb-0 me-3">Please rate:</p> */}
                                <div className="star-rating">
                                    <label>Please rate:</label>
                                    <Rating
                                        name='rating'
                                        id='rating'
                                        value={values.rating}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.rating && errors.rating ? true : false}
                                        helperText={touched.rating && errors.rating ? errors.rating : ''}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn border border-secondary text-primary rounded-pill px-4 py-3"
                            >
                                Post Comment
                            </button>
                        </div>
                    </div>
                </div>
            </form>
            {review.isLoading ? <ClimbingBoxLoader color="#36d7b7" /> :
                review.error ? <p>{review.error}</p> :
                    review.reviews.map((v) => (
                        <>
                            <div>

                                <div className>
                                    <p className="mb-2" style={{ fontSize: 14 }}>
                                        {v.date}
                                    </p>
                                    <div className="d-flex justify-content-between">
                                        <h5>{v.name}</h5>
                                        <div className="d-flex mb-3">
                                            <Rating name="read-only" value={v.rating} readOnly />
                                            <br></br>
                                            <IconButton
                                                onClick={() => handleEdit(v)}
                                                variant="contained"
                                                color='primary'
                                            >
                                                <EditIcon />
                                            </IconButton>

                                            <IconButton
                                                onClick={() => handleDelete(v.id)}
                                                variant="contained"
                                                color='error'
                                            >
                                                <DeleteIcon />
                                            </IconButton>

                                        </div>
                                    </div>
                                    <p>
                                        {v.review}
                                    </p>
                                </div>
                            </div>

                        </>
                    ))
            }
        </div>
    );
}

export default Review;