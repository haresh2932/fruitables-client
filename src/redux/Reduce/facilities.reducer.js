import { EDIT_DATA, FACILITIES_DATA, LOADING_DATA, REMOVE_DATA } from "../ActionType";

const intialState = {
    isLoading: false,
    facilities: [],
    error: null
}

export const facilitiesReducer = (state = intialState, action) => {

    console.log(action);

    switch (action.type) {
        case LOADING_DATA:
            console.log("loading...");
            return {
                ...state,
                isLoading: true
            }
        case FACILITIES_DATA:
            return {
                ...state,
                isLoading: false,
                facilities: state.facilities.concat(action.payload),
            }
        case REMOVE_DATA:
            return {
                ...state,
                isLoading: false,
                facilities: state.facilities.filter((v) => v.id !== action.payload)
            }
        case EDIT_DATA:
            return {
                ...state,
                // facilities: state.facilities.map((v) => v.id === action.payload.id ? action.payload : v)
                isLoading: false,
                facilities: state.facilities.map((v) => {
                    if (v.id === action.payload.id) {
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