import {ADD_TASK_ACTION} from "../utils/consts"

const defaultState = {
    taskList: []
}

export const taskReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_TASK_ACTION:
            return {...state, taskList: [{}, ...state.taskList]}
        default:
            return state
    }
}