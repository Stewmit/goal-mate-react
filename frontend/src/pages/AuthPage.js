import React, {useState} from 'react'
import {Box, Container, Paper, Stack, TextField, Typography} from "@mui/material";
import {useLocation, NavLink, useNavigate} from "react-router-dom";
import {CALENDAR_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {login, registration} from "../http/userAPI";
import {useDispatch} from "react-redux";
import styled from 'styled-components'
import {authorize, setUser} from "../store/reducers/userSlice";

const AuthPage = () => {

    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const isLoginPage = location.pathname === LOGIN_ROUTE

    const signIn = async () => {
        try {
            let data
            if (isLoginPage) {
                data = await login(email, password)
            }
            else {
                data = await registration(name, surname, email, password)
            }
            dispatch(authorize(true))
            dispatch(setUser({
                id: data.id,
                name: data.name,
                surname: data.surname,
                email: data.email
            }))
            navigate(CALENDAR_ROUTE)
        }
        catch (e) {
            alert(e.response.data.message)
        }
    }

    const clearRegisterFields = () => {
        setName('')
        setSurname('')
        setEmail('')
        setPassword('')
    }

    const clearLoginFields = () => {
        setEmail('')
        setPassword('')
    }

    return (
        <Container>
            <Paper elevation={4} sx={{
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: '100px',
                display: 'flex',
                justifyContent: 'top',
                alignItems: 'center',
                flexDirection: 'column',
                width: '60%',
                height: 'auto',
            }}>
                <Typography mt={3} fontSize={30} fontWeight={400}>
                    {isLoginPage ? 'Авторизация' : 'Регистрация'}
                </Typography>
                <Stack mt={4} mb={6} sx={{width: '60%'}} direction="column" spacing={4}>
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
                                    <NavLink style={{ color: 'steelblue', textDecoration: 'none', fontFamily: 'Roboto, sans-serif' }} onClick={clearLoginFields} to={REGISTRATION_ROUTE}>Нет аккаунта</NavLink>
                                :
                                    <NavLink style={{ color: 'steelblue', textDecoration: 'none', fontFamily: 'Roboto, sans-serif' }} onClick={clearRegisterFields} to={LOGIN_ROUTE}>Есть аккаунт</NavLink>
                            }
                        </Box>
                        <SubmitButton onClick={signIn}>{isLoginPage ? 'Войти' : 'Зарегистрироваться'}</SubmitButton>
                    </Stack>
                </Stack>
            </Paper>
        </Container>
    )
}

export default AuthPage

const SubmitButton = styled.button`
  height: 50px;
  color: black;
  background-color: lightsteelblue;
  font-size: 18px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`