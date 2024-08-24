import { EDIT_DATA, FACILITIES_DATA, LOADING_DATA, REMOVE_DATA } from "../ActionType"

const handleLoading = () => (dispatch) => {
    dispatch({ type: LOADING_DATA })
}

export const addfacilities = (data) => (dispatch) => {
    dispatch(handleLoading())
    setTimeout(() => {
        dispatch({
            type: FACILITIES_DATA,
            payload: data
        })
    }, 2000);
}

export const removeFacility = (id) => (dispatch) => {
    dispatch({
        type: REMOVE_DATA,
        payload: id
    })
}

export const editFacility = (data) => (dispatch) => {

    dispatch({
        type: EDIT_DATA,
        payload: data
    })

}






