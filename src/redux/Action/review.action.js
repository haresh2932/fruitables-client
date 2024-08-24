// import { type } from "@testing-library/user-event/dist/type"
import { ADD_REVIEWS, EDIT_REVIEWS, ERROR_REVIEWS, GET_REVIEWS, LOADING_REVIEWS, REMOVE_REVIEWS } from "../ActionType"
import axios from 'axios';
import { BASE_URL } from "../../utils/utilis";


export const loadingReview = () => async(dispatch) => {
    dispatch({type:LOADING_REVIEWS})
}

export const errorReview = (error) => async(dispatch) => {
    dispatch({type:ERROR_REVIEWS, payload:error})
}


export const addReview = (data) => async (dispatch) => {
    try {
        dispatch(loadingReview())
        await axios.post(BASE_URL + 'review', data)
            .then(dispatch({ type: ADD_REVIEWS, payload: data }))
            .catch((error) => dispatch(errorReview(error.message)))
    } catch (error) {
        dispatch(errorReview(error.message))
    }
}

export const getReview = () => async(dispatch) => {
    try {
        dispatch(loadingReview())
        await axios.get(BASE_URL + 'review')
            .then((response) => {
                dispatch({ type: GET_REVIEWS, payload: response.data })
            })
            .catch((error) => {
                dispatch(errorReview(error.message))
            })

    } catch(error) {
        dispatch(errorReview(error.message))
    }

}


export const removeReview = (id) => async(dispatch) => {
    try {
        dispatch(loadingReview()) ;
        await axios.delete(BASE_URL + 'review/'+id )
            .then(dispatch({type:REMOVE_REVIEWS,payload:id}))           
            .catch((error) =>  dispatch(errorReview(error.message)))

    } catch(error) {
        dispatch(errorReview(error.message))
    }
}

export const editReview=(data)=>async(dispatch)=>{
    console.log(data);
    try {
        dispatch(loadingReview()) ;
        await axios.put(BASE_URL + 'review/' + data.id,data)
            .then(dispatch({type:EDIT_REVIEWS,payload:data}))           
            .catch((error) =>  dispatch(errorReview(error.message)))

    } catch(error) {
        dispatch(errorReview(error.message))
    }
}