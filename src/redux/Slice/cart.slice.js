import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    cart: [],
    error: null
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addtocart: (state, action) => {
            console.log(action);

            let index = state.cart.findIndex((v) => v.pid === action.payload.id)
            console.log(index);

            if (index !== -1) {
                state.cart[index].qty++
            } else {
                state.cart.push({ pid: action.payload.id, qty: action.payload.qty })
            }
            // state.cart.push({ pid: action.payload, qty: 1 })
        },
        increamentQty: (state, action) => {
            let index = state.cart.findIndex((v) => v.pid === action.payload)
            if (index!== -1) {
                state.cart[index].qty++
            }else{
                state.cart.push({pid:action.payload,qty:1})
            }
        },
        decreamentQty: (state, action) => {
            console.log(action);
            let index = state.cart.findIndex((v) => v.pid === action.payload)
            console.log(state.cart);
            if (state.cart[index].qty > 1) {
                state.cart[index].qty--
            }
        },
        removeItem: (state, action) => {
            const fData = state.cart.filter((v) => v.pid !== action.payload)
            state.cart = fData
        }
    }
})

export const { addtocart, increamentQty, decreamentQty, removeItem } = cartSlice.actions
export default cartSlice.reducer