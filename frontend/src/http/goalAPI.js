import {$authHost} from "./index.js"

export const createGoal = async (goal) => {
    const {data} = await $authHost.post('api/goal', goal)
    return data
}

export const fetchGoals = async () => {
    const {data} = await $authHost.get('api/goal')
    return data
}

export const deleteGoal = async (id) => {
    const {data} = await $authHost.delete('api/goal', { data: { id } })
    return data
}

export const updateGoal = async (goal) => {
    const {data} = await $authHost.put('api/goal', goal)
    return data
}