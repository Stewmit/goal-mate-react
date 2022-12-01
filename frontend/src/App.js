import React, {useEffect, useState} from "react"
import {BrowserRouter} from "react-router-dom"
import AppRouter from "./components/AppRouter"
import './App.css'
import {useDispatch} from "react-redux";
import {check} from "./http/userAPI";
import {SET_IS_AUTH_ACTION, SET_USER_ACTION} from "./utils/consts";
import {Box, CircularProgress} from "@mui/material";

function App() {

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            dispatch({type: SET_IS_AUTH_ACTION, payload: true})
            dispatch({type: SET_USER_ACTION, payload: {id: data.id, name: data.name, surname: data.surname, email: data.email}})
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                <CircularProgress />
            </Box>
        )
    }

    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    )
}

export default App