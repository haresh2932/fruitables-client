// import { type } from "@testing-library/user-event/dist/type"

import { DECREAMENT_COUNTER, INCREAMENT_COUNTER } from "../ActionType"



export const increament=()=>(dispatch)=>{
    dispatch({type:INCREAMENT_COUNTER})
}

export const decreament=()=>(dispatch)=>{
    dispatch({type:DECREAMENT_COUNTER})
}