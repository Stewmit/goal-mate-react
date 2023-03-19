import {$authHost} from "./index.js"

export const createTask = async (task) => {
    const {data} = await $authHost.post('api/task', task)
    return data
}

export const fetchTasks = async (sortingType, startDate, endDate) => {
    const {data} = await $authHost.get('api/task', {params: {sortingType, startDate, endDate}})
    return data
}

export const updateTask = async (task) => {
    const {data} = await $authHost.put('api/task', task)
    return data
}

export const deleteTask = async (id) => {
    const {data} = await $authHost.delete('api/task', { data: { id } })
    return data
}