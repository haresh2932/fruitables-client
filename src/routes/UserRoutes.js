import React, { useEffect } from 'react';
import Header from '../user/component/Header/Header';
import { Route, Routes } from 'react-router-dom';
import Footer from '../user/component/Footer/Footer';
import Home from '../user/container/Home/Home';
import Shop from '../user/container/Shop/Shop';
import ShopDetails from '../user/container/Shop-Details/ShopDetails';
import Cart from '../user/container/Cart/Cart';
import Checkout from '../user/container/Checkout/Checkout';
import Testimonial from '../user/container/Testimonial/Testimonial';
import Error from '../user/container/404/Error';
import Contact from '../user/container/Contact/Contact';
import PrivateRoutes from './PrivateRoutes';
import Counter from '../user/container/Counter/Counter';
import Review from '../user/container/Review/Review';
import Chat from '../user/container/Chat/Chat';
import Auth from '../user/container/Auth/Auth';
import { useDispatch } from 'react-redux';
import { checkAuth } from '../redux/Slice/auth.slice';

function UserRoutes(props) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(checkAuth())
    },[])
    return (
        <>
            <Header />
            <Routes>
                <Route exact path='/login' element={<Auth />} />
                <Route exact path='/' element={<Home />} />
                <Route element={<PrivateRoutes />}>
                    <Route exact path='/shop' element={<Shop />} />
                    <Route exact path='/shop/:id' element={<ShopDetails />} />
                    <Route exact path='/cart' element={<Cart />} />
                    <Route exact path='/checkout' element={<Checkout />} />
                </Route>
                <Route exact path='/testimonial' element={<Testimonial />} />
                <Route exact path='/error' element={<Error />} />
                <Route exact path='/contact' element={<Contact />} />
                <Route exact path='/counter' element={<Counter />} />
                <Route exact path='/chat' element={<Chat />} />





            </Routes>
            <Footer />
        </>
    );
}

export default UserRoutes;