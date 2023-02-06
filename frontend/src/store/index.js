import userReducer from './reducers/userSlice'
import taskReducer from './reducers/taskSlice'
import {configureStore} from "@reduxjs/toolkit";

export const store = configureStore({
    reducer: {
        user: userReducer,
        task: taskReducer
    }
})