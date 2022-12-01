import {SET_IS_AUTH_ACTION, SET_USER_ACTION} from "../utils/consts";

const defaultState = {
    isAuth: false,
    user: {}
}

export const userReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SET_IS_AUTH_ACTION:
            return {...state, isAuth: action.payload}
        case SET_USER_ACTION:
            return {...state, user: action.payload}
        default:
            return state
    }
}