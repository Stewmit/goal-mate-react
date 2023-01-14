import {createStore, combineReducers} from 'redux'
import {userReducer} from './userReducer'
import {taskReducer} from './taskReducer'

const rootReducer = combineReducers({
    user: userReducer,
    tasks: taskReducer
})

export const store = createStore(rootReducer)