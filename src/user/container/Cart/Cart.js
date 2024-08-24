import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decreamentQty, increamentQty, removeItem } from '../../../redux/Slice/cart.slice';
import { NavLink } from 'react-router-dom';
import { getCoupan } from '../../../redux/Slice/coupan.slice';
import { useFormik } from 'formik';
import { date, object, string } from 'yup';
import { TextField } from '@mui/material';
import { getProducts } from '../../../redux/Action/product.action';

function Cart(props) {

    const dispatch = useDispatch()
    const [discount, setDiscount] = useState(0);



    const cart = useSelector(state => state.cart_slice)
    console.log(cart.cart)
    const products = useSelector(state => state.products)
    console.log(products.products);
    console.log(cart.cart, products.products);
    const coupan = useSelector((state) => state.coupan)
    console.log(coupan);

    useEffect(() => {
        dispatch(getCoupan())
        dispatch(getProducts())
    }, [])

    const productData = cart.cart.map((v) => {
        const product = products.products.find((product) => product._id === v.pid)
        console.log(product);
        return { ...product, qty: v.qty }
    })

    console.log(productData);

    const Shipping = discount > 0 ? 10 : 15

    const Subtotal = productData.reduce((acc, v) => acc + v.qty * v.price, 0)
    const totalDiscount = Subtotal * (discount / 100)
    const Total = Subtotal - totalDiscount + Shipping



    const handleIncreament = (id) => {
        console.log("yes");
        dispatch(increamentQty(id))
    }

    const handleDecreament = (id) => {
        console.log("no");
        dispatch(decreamentQty(id))
    }

    const handleRemove = (id) => {
        dispatch(removeItem(id))
    }

    const handleCoupan = (data) => {
        console.log(data.coupan);
        let flag = 0;
        coupan.coupan.map((v) => {
            if (v.coupan === data.coupan) {
                console.log(v.coupan, data.coupan);
                const currentDate = new Date();
                console.log(currentDate);
                const expiryDate = new Date(v.expiry);
                console.log(expiryDate);
                if (currentDate <= expiryDate) {
                    flag = 1;
                    setDiscount(v.percentage)
                } else {
                    flag = 2;
                }
            }
        });
        if (flag === 0) {
            console.log("Invaliad coupon");
            formik.setFieldError("coupan", "Invaliad coupon");
        } else if (flag === 1) {
            console.log("coupon applied successfully");

            formik.setFieldError("coupan", "coupan applied successfully");
        } else if (flag === 2) {
            console.log("Coupon expired.");
            formik.setFieldError("coupan", "Coupon expired.");
        }
    };

    let cartSchema = object({
        coupan: string().required("Please enter Coupan"),
    });

    const formik = useFormik({
        initialValues: {
            coupan: '',
        },
        validationSchema: cartSchema,
        onSubmit: (values) => {
            handleCoupan(values)
            // resetForm()
        },
    })


    const { handleSubmit, handleBlur, handleChange, errors, values, touched } = formik



    return (
        <div>
            {/* Single Page Header start */}
            <div className="container-fluid page-header py-5">
                <h1 className="text-center text-white display-6">Cart</h1>
                <ol className="breadcrumb justify-content-center mb-0">
                    <li className="breadcrumb-item"><NavLink to="/">Home</NavLink></li>
                    <li className="breadcrumb-item"><a href="#">Pages</a></li>
                    <li className="breadcrumb-item active text-white">Cart</li>
                </ol>
            </div>
            {/* Single Page Header End */}
            {/* Cart Page Start */}
            <div className="container-fluid py-5">
                <div className="container py-5">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Products</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Quantity</th>
                                    <th scope="col">Total</th>
                                    <th scope="col">Handle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productData.map((p) => (
                                    <tr>
                                        <th scope="row">
                                            <div className="d-flex align-items-center">
                                                <img src={p.product_img.url} className="img-fluid me-5 rounded-circle" style={{ width: 80, height: 80 }} alt />
                                            </div>
                                        </th>
                                        <td>
                                            <p className="mb-0 mt-4">{p.name}</p>
                                        </td>
                                        <td>
                                            <p className="mb-0 mt-4">{p.price}</p>
                                        </td>
                                        <td>
                                            <div className="input-group quantity mt-4" style={{ width: 100 }}>
                                                <div className="input-group-btn">
                                                    <button onClick={() => handleDecreament(p.id)} className="btn btn-sm btn-minus rounded-circle bg-light border">
                                                        <i className="fa fa-minus" />
                                                    </button>
                                                </div>
                                                {/* <input type="text" className="form-control form-control-sm text-center border-0" defaultValue={p.qty} />
                                                 */}
                                                <span>{p.qty}</span>
                                                <div className="input-group-btn">
                                                    <button onClick={() => handleIncreament(p.id)} className="btn btn-sm btn-plus rounded-circle bg-light border">
                                                        <i className="fa fa-plus" />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <p className="mb-0 mt-4">{p.qty * p.price}$</p>
                                        </td>
                                        <td>
                                            <button onClick={() => handleRemove(p.id)} className="btn btn-md rounded-circle bg-light border mt-4">
                                                <i className="fa fa-times text-danger" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="mt-5">
                        <form onSubmit={handleSubmit}>
                            <input
                                name="coupan"
                                type="text"
                                className="border-0 border-bottom rounded me-5 py-3 mb-4"
                                placeholder="Coupon Code"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.coupan}
                            />
                            {errors.coupan && touched.coupan ? (
                                <span className="error">{errors.coupan}</span>
                            ) : <span className="success">{errors.coupan}</span>
                            }
                            <button
                                className="btn border-secondary rounded-pill px-4 py-3 text-primary"
                                type='submit'
                            >
                                Apply Coupon
                            </button>
                        </form>
                    </div>

                    <div className="row g-4 justify-content-end cart-container" >
                        <div className="col-8" />
                        <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                            <div className="bg-light rounded">
                                <div className="p-4">
                                    <h1 className="display-6 mb-4">Cart <span className="fw-normal">Total</span></h1>
                                    <div className="d-flex justify-content-between mb-4">
                                        <h5 className="mb-0 me-4">Subtotal:</h5>
                                        <p className="mb-0">${Subtotal}</p>
                                    </div>
                                    <div className="d-flex justify-content-between mb-4">
                                        <h5 className="mb-0 me-4">dicount:{discount}%</h5>
                                        <p className="mb-0">{totalDiscount}</p>
                                    </div>
                                    <div className="d-flex justify-content-between">
                                        <h5 className="mb-0 me-4">Shipping</h5>
                                        <div className>
                                            <p className="mb-0">Flat rate: $ 3</p>
                                        </div>
                                    </div>
                                    <p className="mb-0 text-end">Shipping to Ukraine.</p>
                                </div>
                                <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                                    <h5 className="mb-0 ps-4 me-4">Total</h5>
                                    <p className="mb-0 pe-4">${Total.toFixed(2)}</p>
                                </div>
                                <button className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4" type="button">Proceed Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Cart Page End */}
        </div>
    );
}

export default Cart;