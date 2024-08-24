import { DECREAMENT_COUNTER, INCREAMENT_COUNTER } from "../ActionType";

const intialState = {
    isLoding: false,
    count: 0,
    error: null 
}

export const counterReducer = (state = intialState, action) => {

    console.log(action);

    switch (action.type) {
        case INCREAMENT_COUNTER:
            return {
                count: state.count + 1
            }

        case DECREAMENT_COUNTER:
            return {
                count: state.count -1
            }

        default:
            return state;
    }

}