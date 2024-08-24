import axios from "axios";
import { ADD_CATEGORY, EDIT_CATEGORY, GET_CATEGORY, REMOVE_CATEGORY } from "../ActionType";
import { BASE_URL } from "../../utils/utilis";

export const getData = () => async (dispatch) => {
    try {
        const response = await fetch(BASE_URL + "categories/list-categories")
        const data = await response.json()
        console.log(data);
        dispatch({ type: GET_CATEGORY, payload: data.data })

    } catch (error) {

    }
}

export const handleDelete = (id) => async (dispatch) => {
    try {
        const response=await axios.delete(BASE_URL+"categories/delete-category/"+id)
        console.log(response);

        dispatch({ type: REMOVE_CATEGORY, payload: id })
    } catch (error) {
        console.log(error);
    }
}

export const handleAdd = (data) => async (dispatch) => {
    try {
        const response = await axios.post(BASE_URL+"categories/add-category", data);

        console.log(response.data);

        dispatch({ type: ADD_CATEGORY, payload: response.data })
    } catch (error) {
        console.log(error);
    }
}

export const handleUpdateData = (data) => async (dispatch) => {
    try {
        await axios.put(BASE_URL + "categories/update-category/" + data._id, data)

        dispatch({ type: EDIT_CATEGORY, payload: data })
    } catch (error) {
        console.log(error);
    }
}

