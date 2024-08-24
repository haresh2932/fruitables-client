import React, { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { resetAlert } from '../../../redux/Slice/alert.slice';


function Alert(props) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { color, message } = useSelector(state => state.alert)
    const dispatch=useDispatch()
    console.log(color, message);
    useEffect(() => {

        if (message != '') {
            enqueueSnackbar(message, {
                variant: color,
                anchorOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }
            })

            const timeOut=setTimeout(()=>{dispatch(resetAlert)},2000)
            return ()=> {
                clearInterval(timeOut)
            }

        }
    }, [message])
    return (
        <div>

        </div>
    );
}

export default Alert;