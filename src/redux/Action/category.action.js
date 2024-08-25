// import axios from "axios";
import { ADD_CATEGORY, EDIT_CATEGORY, GET_CATEGORY, REMOVE_CATEGORY } from "../ActionType";
// import { BASE_URL } from "../../utils/utilis";
import axiosInstance from "../../utils/axiosInstance";

export const getData = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get("categories/list-categories")
        
        console.log(response);
        dispatch({ type: GET_CATEGORY, payload: response.data })

    } catch (error) {
        console.log(error.message,"getdata");
        
    }
}

export const handleDelete = (id) => async (dispatch) => {
    try {
        const response=await axiosInstance.delete("categories/delete-category/"+id)
        console.log(response);

        dispatch({ type: REMOVE_CATEGORY, payload: id })
    } catch (error) {
        console.log(error);
    }
}

export const handleAdd = (data) => async (dispatch) => {
    try {
        const response = await axiosInstance.post("categories/add-category", data);

        console.log(response.data);

        dispatch({ type: ADD_CATEGORY, payload: response.data })
    } catch (error) {
        console.log(error);
    }
}

export const handleUpdateData = (data) => async (dispatch) => {
    try {
        await axiosInstance.put("categories/update-category/" + data._id, data)

        dispatch({ type: EDIT_CATEGORY, payload: data })
    } catch (error) {
        console.log(error);
    }
}

