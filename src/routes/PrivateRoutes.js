import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { checkAuth } from '../redux/Slice/auth.slice';
import { ClimbingBoxLoader } from 'react-spinners';

function PrivateRoutes(props) {
    const [Loading, setLoading] = useState(true)
    const { isAuthenticated } = useSelector(state => state.auth)
    console.log(isAuthenticated);

    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
        const checkAuthentication = async () => {
            try {
                await dispatch(checkAuth())
            } catch (error) {
                navigate("/login")
            } finally {
                setLoading(false)
            }
        }
        checkAuthentication()
    }, [navigate, dispatch])

    if (Loading) {
        return <ClimbingBoxLoader color="#36d7b7" />
    }

    return (
        isAuthenticated ? <Outlet /> : <Navigate to='/login' replace />
    );
}

export default PrivateRoutes;