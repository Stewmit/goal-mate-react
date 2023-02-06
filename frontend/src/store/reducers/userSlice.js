import {createSlice} from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuth: false,
        user: {}
    },
    reducers: {
        authorize: (state, action) => {
            state.isAuth = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { authorize, setUser } = userSlice.actions

export default userSlice.reducer