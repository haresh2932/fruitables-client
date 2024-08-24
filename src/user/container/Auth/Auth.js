import { Formik, ErrorMessage, Form, Field, useFormik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { object, string } from 'yup';
import { login, register } from '../../../redux/Slice/auth.slice';
import { Navigate, NavLink } from 'react-router-dom';
import { BASE_URL } from '../../../utils/utilis';


function Auth(props) {
    const [field, setField] = useState("login");
    const dispatch = useDispatch()


    const auth = useSelector((state) => state.auth)
    console.log(auth);


    const userSchema = object().shape({
        email: string().required("Email is required"),
        password: field !== "forget" ? string().required('Password is required').min(6, 'password must at least 6 characters') : null,
        name: field === "register" ? string().required('Name is required') : null
    })

    const initialValues = {
        email: "",
        password: "",
        name: ""
    };


    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: userSchema,
        onSubmit: (values) => {
            if (field === 'login') {
                const loginValue = {
                    email: values.email,
                    password: values.password
                }
                dispatch(login(loginValue))
                // console.log({...values,email:values.email,password:values.password});

            } else if (field === 'register') {
                dispatch(register({ ...values, 'role': 'user' }))
            } else {

            }
        },

    })

    const { handleSubmit, handleBlur, handleChange, errors, values, touched } = formik

    if (auth.isAuthenticated) {
        return <Navigate to={'/'} />
    }

    const handleGoogleLogin = () => {
        window.location.href = BASE_URL + 'users/googleLogin'
    }
    return (
        <div>
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Login</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Shop</li>
                </ol>
            </div>
            <div className="container-fluid p-0">
                <div className="row g-0">
                    <div className="d-none d-lg-flex col-lg-4 col-xl-6 align-items-center justify-content-center bg-primary p-5">
                        <div className="p-5 w-75">
                            <h1 className="text-white mb-4">Welcome To Fruitable</h1>
                            <h4 className="text-white mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet
                                lacus et eros commodo dapibus.
                            </h4>
                            <img
                                src="img/login.jpg"
                                className="img-fluid w-100 mb-4 p-4"
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="col-lg-8 col-xl-6">
                        <div className="position-relative overflow-hidden">
                            <div className="container">
                                <div className="row justify-content-center">
                                    <div className="col-12 col-md-10 col-lg-8 col-xl-6">
                                        <div className="bg-light rounded p-4 p-sm-5 my-4 mx-3">
                                            <div className="d-flex align-items-center mb-3">
                                                <h3 className="font-weight-semi-bold">{field == 'register' ? 'Register' : 'Login'}</h3>
                                            </div>
                                            <form onSubmit={handleSubmit}>
                                                <div className="form-group">
                                                    <input
                                                        name="email"
                                                        type="email"
                                                        placeholder='Enter Email'
                                                        className="form-control bg-light border-0 p-2 my-2"
                                                        onBlur={handleBlur}
                                                        onChange={handleChange}
                                                        value={values.email}
                                                    />

                                                    {errors.email && touched.email ? (
                                                        <span className="error">{errors.email}</span>
                                                    ) : null
                                                    }
                                                    {/* <ErrorMessage name="email" component="div" className='error' /> */}
                                                </div>
                                                {field !== "forget" && (
                                                    <div>
                                                        <input
                                                            name="password"
                                                            type="password"
                                                            placeholder='Enter Password'
                                                            className="form-control bg-light border-0 p-2 my-2"
                                                            onBlur={handleBlur}
                                                            onChange={handleChange}
                                                            value={values.password}
                                                        />
                                                        {errors.password && touched.password ?
                                                            <span className="error">{errors.password}</span>
                                                            : null
                                                        }
                                                        {/* <ErrorMessage name="password" component="div" className='error' /> */}
                                                    </div>
                                                )}

                                                {field === "register" && (
                                                    <>
                                                        <div>
                                                            <input
                                                                name="name"
                                                                type="text"
                                                                placeholder='Enter Your Name'
                                                                className="form-control bg-light border-0 p-2 my-2"
                                                                onBlur={handleBlur}
                                                                onChange={handleChange}
                                                                value={values.name}
                                                            />
                                                            {errors.name && touched.name ? (
                                                                <span className="error">{errors.name}</span>
                                                            ) : null
                                                            }
                                                            {/* <ErrorMessage name="name" component="div" className='error' /> */}
                                                        </div>
                                                    </>
                                                )}
                                                <br />
                                                <button
                                                    type="submit"
                                                    className="btn btn-primary btn-block border-0 py-2"
                                                >
                                                    Submit
                                                </button>
                                            </form>

                                            <div className="d-flex align-items-center my-3">
                                                {field !== 'register' ?
                                                    <p className="mb-0">
                                                        <a onClick={() => setField('forget')} className="text-primary link">
                                                            Forgete Password?
                                                        </a>
                                                    </p>
                                                    :
                                                    null
                                                }
                                            </div>
                                            <div className="d-flex align-items-center my-3">
                                                {field === 'login' ?
                                                    <p className="mb-0">
                                                        Have not Account ?{' '}
                                                        <a onClick={() => setField('register')} className="text-primary link">
                                                            Register
                                                        </a>
                                                    </p>
                                                    :
                                                    <p className="mb-0">
                                                        Already have account ?{' '}
                                                        <a onClick={() => setField('login')} className="text-primary link">
                                                            Login
                                                        </a>
                                                    </p>
                                                }
                                                <button onClick={handleGoogleLogin} className="btn btn-primary btn-block border-0 py-2">Sign in google</button>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Auth;