import React, {useState} from 'react'
import {Box, Button, Container, Paper, Stack, TextField, Typography} from "@mui/material";
import {useLocation, NavLink, useNavigate} from "react-router-dom";
import {CALENDAR_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SET_IS_AUTH_ACTION, SET_USER_ACTION} from "../../utils/consts";
import {login, registration} from "../../http/userAPI";
import {useDispatch} from "react-redux";

const AuthPage = () => {

    const location = useLocation()
    const isLoginPage = location.pathname === LOGIN_ROUTE
    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const signIn = async () => {
        try {
            let data
            if (isLoginPage) {
                data = await login(email, password)
            }
            else {
                data = await registration(name, surname, email, password)
            }
            dispatch({type: SET_IS_AUTH_ACTION, payload: true})
            dispatch({type: SET_USER_ACTION, payload: {id: data.id, name: data.name, surname: data.surname, email: data.email}})
            navigate(CALENDAR_ROUTE)
        }
        catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container>
            <Paper elevation={3} sx={{
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '100px',
                display: 'flex',
                justifyContent: 'top',
                alignItems: 'center',
                flexDirection: 'column',
                width: '550px',
                height: 'auto',
            }}>
                <Typography mt={3} fontSize={30} fontWeight={400}>
                    {isLoginPage ? 'Авторизация' : 'Регистрация'}
                </Typography>
                <Stack mt={4} mb={6} sx={{width: '60%'}} direction="column" spacing={3}>
                    <TextField
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        label="Имя"
                        variant="outlined"
                        sx={isLoginPage ? {display: 'none'} : {}}
                    />
                    <TextField
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        label="Фамилия"
                        variant="outlined"
                        sx={isLoginPage ? {display: 'none'} : {}}
                    />
                    <TextField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin={'normal'}
                        label="Почта"
                        variant="outlined"
                    />
                    <TextField
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type={'password'}
                        margin={'normal'}
                        label="Пароль"
                        variant="outlined"
                    />
                    <Stack>
                        <Box mt={1} mb={1} fontWeight={500} sx={{cursor: 'pointer'}}>
                            {
                                isLoginPage
                                ?
                                    <NavLink style={{ color: '#1565C0', textDecoration: 'none', fontFamily: 'Roboto, sans-serif' }} to={REGISTRATION_ROUTE}>Нет аккаунта</NavLink>
                                :
                                    <NavLink style={{ color: '#1565C0', textDecoration: 'none', fontFamily: 'Roboto, sans-serif' }} to={LOGIN_ROUTE}>Есть аккаунт</NavLink>
                            }
                        </Box>
                        <Button onClick={signIn} sx={{height: '45px'}} variant={'contained'}>{isLoginPage ? 'Войти' : 'Зарегистрироваться'}</Button>
                    </Stack>
                </Stack>
            </Paper>
        </Container>
    )
}

export default AuthPage