import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decreament, increament } from '../../../redux/Action/counter.action';

function Counter(props) {
    const countVal=useSelector(state=>state.counter)
    console.log(countVal); 

    const dispatch = useDispatch()


    const handleIncrement = () => {
        dispatch(increament())
    }

    const handleDecrement = () => {
        dispatch(decreament())
    }
    return (
        <div>
            <h2>Counter</h2>
            <button onClick={handleIncrement}>+</button>
            {countVal.count}
            <button onClick={handleDecrement}>-</button>
        </div>
    );
}

export default Counter;