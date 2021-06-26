import { SET_CODES,SET_PHONES } from "./types"

const initialState={
    codes:[],
    phones:[]
}
export const appReducer=(state = initialState,{type,payload})=>{
    switch(type){
        case SET_CODES:
            return{...state, codes:[...payload]}
        case SET_PHONES:
            return{...state, phones:[...payload]}
        default: return state
    }
    
}