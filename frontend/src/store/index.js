import {createStore} from 'redux'
import {userReducer} from './userReducer'

// Combination
export const store = createStore(userReducer)