import {createSlice} from "@reduxjs/toolkit";

export const habitSlice = createSlice({
    name: 'habit',
    initialState: {
        habits: []
    },
    reducers: {
        loadHabits: (state, action) => {
            state.habits = action.payload
        },
        addLocalDay: (state, action) => {
            state.habits.forEach((habit, index, list) => {
                if (habit.id === action.payload.habitId) {
                    list[index].habitDays.push(action.payload)
                }
            })
        },
        deleteLocalDay: (state, action) => {
            state.habits.forEach((habit, index, list) => {
                if (habit.id === action.payload.habitId) {
                    list[index].habitDays = list[index].habitDays.filter(day => day.id !== action.payload.id)
                }
            })
        },
        addLocalHabit: (state, action) => {
            state.habits.push(action.payload)
        },
        // editLocalHabit: (state, action) => {
        //     state.habits.forEach((task, index, list) => {
        //         if (task.id === action.payload.id) {
        //             list[index] = action.payload
        //         }
        //     })
        // },
        // deleteLocalHabit: (state, action) => {
        //     state.habits = state.habits.filter(task => task.id !== action.payload.id)
        // }
    }
})

export const { loadHabits, addLocalDay, deleteLocalDay, addLocalHabit } = habitSlice.actions

export default habitSlice.reducer