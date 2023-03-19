import {$authHost} from "./index.js"

export const createSubtask = async (subtask) => {
    const {data} = await $authHost.post('api/task/subtask', subtask)
    return data
}

export const deleteSubtask = async (id) => {
    const {data} = await $authHost.delete('api/task/subtask', { data: { id } })
    return data
}

export const updateSubtask = async (subtask) => {
    const {data} = await $authHost.put('api/task/subtask', subtask)
    return data
}