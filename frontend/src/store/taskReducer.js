import {ADD_TASK_ACTION, DELETE_TASK_ACTION, LOAD_TASKS_ACTION, UPDATE_TASK_ACTION} from "../utils/consts"

const defaultState = {
    taskList: []
}

export const taskReducer = (state = defaultState, action) => {
    switch (action.type) {

        case LOAD_TASKS_ACTION:
            return {...state, taskList: action.payload}

        case ADD_TASK_ACTION:
            return {...state, taskList: [...state.taskList, action.payload]}

        case UPDATE_TASK_ACTION:
            state.taskList.forEach((task, index, list) => {
                if (task.id === action.payload.id) {
                    list[index] = action.payload
                }
            })
            return state

        case DELETE_TASK_ACTION:
            const newList = state.taskList.filter(task => task.id !== action.payload.id)
            return {...state, taskList: newList}

        default:
            return state
    }
}