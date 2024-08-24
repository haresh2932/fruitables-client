import { ADD_CATEGORY, EDIT_CATEGORY, GET_CATEGORY, REMOVE_CATEGORY } from "../ActionType";

const initialState = {
    isLoading: false,
    categories: [],
    error: null
}

export const categoriesReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
        case GET_CATEGORY:
            return {
                error: null,
                isLoading: false,
                categories: action.payload,

            }
            


        case REMOVE_CATEGORY:
            return {
                error: null,
                isLoading: false,
                categories: state.categories.filter((v) => v._id !== action.payload)
            }

        case ADD_CATEGORY:
            return {
                error: null,
                isLoading: false,
                categories: state.categories.concat(action.payload.data)
            }
        case EDIT_CATEGORY:
            return {
                error: null,
                isLoading: false,
                categories: state.categories.map((v) => {
                    if (v._id === action.payload._id) {
                        return action.payload
                    } else {
                        return v
                    }
                })
            }

        default:
            return state;
    }

}