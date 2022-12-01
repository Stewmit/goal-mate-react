import React from 'react'
import {useNavigate} from "react-router-dom";
import {REGISTRATION_ROUTE} from "../../utils/consts";

const DefaultPage = () => {

    const navigate = useNavigate()

    return (
        <div>
            <button onClick={() => navigate(REGISTRATION_ROUTE)}>Регистрация</button>
        </div>
    )
}

export default DefaultPage