import React from 'react'
import { useSelector } from 'react-redux'
import {Routes, Route, Navigate} from 'react-router-dom'
import { authRoutes, publicRoutes } from '../routes.js'
import { DEFAULT_ROUTE } from '../utils/consts.js'

const AppRouter = () => {

    const isAuth = useSelector(state => state.user.isAuth)

    return (
        <Routes>
            {isAuth && authRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {publicRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            <Route path='*' element={<Navigate to={DEFAULT_ROUTE}/>} />
        </Routes>
    )
}

export default AppRouter