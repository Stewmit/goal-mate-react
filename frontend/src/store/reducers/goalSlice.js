import {createSlice} from "@reduxjs/toolkit";

export const goalSlice = createSlice({
    name: 'goal',
    initialState: {
        goals: []
    },
    reducers: {
        loadGoals: (state, action) => {
            state.goals = action.payload
        },
        addLocalGoal: (state, action) => {
            state.goals.push(action.payload)
        },
        editLocalGoal: (state, action) => {
            state.goals.forEach((goal, index, list) => {
                if (goal.id === action.payload.id) {
                    list[index] = action.payload
                }
            })
        },
        deleteLocalGoal: (state, action) => {
            state.goals = state.goals.filter(task => task.id !== action.payload.id)
        }
    }
})

export const { loadGoals, addLocalGoal, editLocalGoal, deleteLocalGoal } = goalSlice.actions

export default goalSlice.reducer