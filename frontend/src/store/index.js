import userReducer from './reducers/userSlice'
import habitReducer from './reducers/habitSlice'
import taskReducer from './reducers/taskSlice'
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        user: userReducer,
        habit: habitReducer,
        task: taskReducer
    }
})