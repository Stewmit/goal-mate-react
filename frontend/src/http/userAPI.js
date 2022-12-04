import {$authHost, $host} from "./index";
import jwtDecode from "jwt-decode";

export const registration = async (name, surname, email, password) => {
    const {data} = await $host.post('api/user/registration', {name, surname, email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const editUser = async (user) => {
    const {data} = await $authHost.put('api/user', user)
    localStorage.setItem('token', data.token)
    return jwtDecode(data.token)
}

export const changePassword = async (user) => {
    const {data} = await $authHost.put('api/user/password', user)
    return data
}

export const deleteAccount = async (id) => {
    const {data} = await $authHost.delete('api/user', { data: { id } })
    return data
}