import React, {useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import {CALENDAR_ROUTE, REGISTRATION_ROUTE} from "../../utils/consts";
import {useSelector} from "react-redux";

const DefaultPage = () => {

    const isAuth = useSelector(state => state.isAuth)
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuth) {
            navigate(CALENDAR_ROUTE)
        }
    }, [])

    return (
        <div>
            <button onClick={() => navigate(REGISTRATION_ROUTE)}>Регистрация</button>
        </div>
    )
}

export default DefaultPage