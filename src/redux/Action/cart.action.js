import axios from "axios"
import { ADD_CART, GET_CART } from "../ActionType"
import { BASE_URL } from "../../utils/utilis"



export const addCart = (data) => async (dispatch) => {
    try {
        await axios.post(BASE_URL + 'cart', data)
            .then(dispatch({ type: ADD_CART, payload: data }))
            .catch((error) => console.log(error.message))
    } catch (error) {

    }
}

export const getCart = (data) => async (dispatch) => {
    try {
        await axios.get(BASE_URL + 'cart'  )
            .then((response)=>dispatch({ type: GET_CART, payload: response.data}))
            .catch((error) => console.log(error.message))
    } catch (error) {

    }
}