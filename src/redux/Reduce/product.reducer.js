import { ADD_PRODUCTS, EDIT_PRODUCTS, ERROR_PRODUCTS, GET_PRODUCTS, LOADING_PRODUCTS, REMOVE_PRODUCTS } from "../ActionType";

const initialState = {
    isLoading: false,
    products: [],
    error: null
}

export const productReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {
        case LOADING_PRODUCTS:
            return {
                ...state,
                isLoading: true
            }
        case ERROR_PRODUCTS:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            }
        case GET_PRODUCTS:
            return {
                isLoading: false,
                products: action.payload,
                error: null
            }
        case ADD_PRODUCTS:
            return {
                isLoading: false,
                products: state.products.concat(action.payload.data),
                error: null
            }
        case REMOVE_PRODUCTS:
            return {
                isLoading: false,
                products: state.products.filter((v) => v._id !== action.payload),
                error: null
            }
        case EDIT_PRODUCTS:
            console.log(action.payload);
            return {
                isLoading: false,
                products: state.products.map((v) => v._id === action.payload.data._id ? action.payload.data : v),
                error: null
            }



        default:
            return state
    }
}