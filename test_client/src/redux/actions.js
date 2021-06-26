import {SET_CODES,SET_PHONES} from "./types";

export function setCodes(codes) {
    return async dispatch => {
        try {
            dispatch({ type: SET_CODES, payload: codes })
        } 
        catch (e) {
            console.log(e)
        }
    }
}

export function setPhones(phones) {
    return async dispatch => {
        try {
            dispatch({ type: SET_PHONES, payload: phones })
        }
        catch (e) {
            console.log(e)
        }
    }
}
