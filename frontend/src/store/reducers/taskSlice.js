import {createSlice} from "@reduxjs/toolkit";

export const taskSlice = createSlice({
    name: 'task',
    initialState: {
        tasks: []
    },
    reducers: {
        loadTasks: (state, action) => {
            state.tasks = action.payload
        },
        addLocalTask: (state, action) => {
            state.tasks.push(action.payload)
        },
        editLocalTask: (state, action) => {
            state.tasks.forEach((task, index, list) => {
                if (task.id === action.payload.id) {
                    list[index] = action.payload
                }
            })
        },
        deleteLocalTask: (state, action) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload.id)
        }
    }
})

export const { loadTasks, addLocalTask, editLocalTask, deleteLocalTask } = taskSlice.actions

export default taskSlice.reducer