import { combineReducers } from "redux";
import { counterReducer } from "./counter.reducer";
import { facilitiesReducer } from "./facilities.reducer";
import { productReducer } from "./product.reducer";
import { reviewReducer } from "./review.reducer";
import { cartReducer } from "./cart.reducer";
import cartSlice from "../Slice/cart.slice";
import coupanSlice from "../Slice/coupan.slice";
import { categoriesReducer } from "./category.reducer";
import subcategorySlice from "../Slice/subcategory.slice";
import variantSlice from "../Slice/variant.slice";
import salespeopleSlice from "../Slice/salespeople.slice";
import authSlice from "../Slice/auth.slice";
import alertSlice from "../Slice/alert.slice";
// import cartSlice from "../Slice/cart.slice";


export const rootreducers = combineReducers({
    counter: counterReducer,
    facilities:facilitiesReducer,
    products:productReducer,
    reviews:reviewReducer,
    cart_slice:cartSlice,
    coupan:coupanSlice,
    categories:categoriesReducer,
    subcategories:subcategorySlice,
    variants:variantSlice,
    salespeoples: salespeopleSlice,
    auth:authSlice,
    alert:alertSlice
});


