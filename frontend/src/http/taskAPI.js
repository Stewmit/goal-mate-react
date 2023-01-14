import {$authHost} from "./index"

export const createTask = async (task) => {
    const {data} = await $authHost.post('api/task', task)
    return data
}

export const fetchTasks = async () => {
    const {data} = await $authHost.get('api/task')
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