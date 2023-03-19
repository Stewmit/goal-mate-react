import React, {useEffect, useState} from "react"
import {BrowserRouter} from "react-router-dom"
import AppRouter from "./components/AppRouter.jsx"
import {useDispatch} from "react-redux"
import {check} from "./http/userAPI"
import {Box, CircularProgress} from "@mui/material"
import {authorize, setUser} from "./store/reducers/userSlice"

function App() {

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            dispatch(authorize(true))
            dispatch(setUser({
                id: data.id,
                name: data.name,
                surname: data.surname,
                email: data.email
            }))
        }).finally(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <CircularProgress/>
            </Box>
        )
    }

    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    )
}

export default App