import userReducer from './reducers/userSlice.js'
import habitReducer from './reducers/habitSlice.js'
import taskReducer from './reducers/taskSlice.js'
import goalReducer from './reducers/goalSlice.js'
import {configureStore} from "@reduxjs/toolkit"

export const store = configureStore({
    reducer: {
        user: userReducer,
        habit: habitReducer,
        task: taskReducer,
        goal: goalReducer
    }
})