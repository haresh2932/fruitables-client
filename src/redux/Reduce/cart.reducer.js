import { ADD_CART, GET_CART } from "../ActionType";

const initialState = {
    isLoding: false,
    cart: [],
    error: null 
}
export const cartReducer=(state=initialState,action)=>{
    console.log(action);
    switch (action.type) {
        case ADD_CART:
            return{
                cart:state.cart.concat(action.payload)
            }
            
        case GET_CART:
            return{
                cart:action.payload
            }
    
        default:
            return state
    }
}