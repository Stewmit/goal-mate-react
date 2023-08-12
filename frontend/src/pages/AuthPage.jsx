import React, {useState} from 'react'
import {Box, Container, Stack, TextField, Typography} from "@mui/material"
import {useLocation, NavLink, useNavigate} from "react-router-dom"
import {useDispatch} from "react-redux"
import styled from 'styled-components'
import {CALENDAR_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE} from "../utils/consts.js"
import {login, registration} from "../http/userAPI.js"
import {authorize, setUser} from "../store/reducers/userSlice.js"

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
                email: data.email,
                avatar: data.avatar
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
            <FormBox>
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
                        <Box mt={1} mb={1} fontWeight={500} sx={{cursor: 'pointer', display: 'flex', alignItems: 'left'}}>
                            {
                                isLoginPage
                                ?
                                    <NavLink style={{ color: '#8000ff', fontSize: '1.2em', textDecoration: 'none', fontFamily: 'Roboto, sans-serif' }} onClick={clearLoginFields} to={REGISTRATION_ROUTE}>Нет аккаунта</NavLink>
                                :
                                    <NavLink style={{ color: '#8000ff', fontSize: '1.2em', textDecoration: 'none', fontFamily: 'Roboto, sans-serif' }} onClick={clearRegisterFields} to={LOGIN_ROUTE}>Есть аккаунт</NavLink>
                            }
                        </Box>
                        <SubmitButton onClick={signIn}>{isLoginPage ? 'Войти' : 'Зарегистрироваться'}</SubmitButton>
                    </Stack>
                </Stack>
            </FormBox>
        </Container>
    )
}

export default AuthPage

const FormBox = styled.div`
  margin-left: auto;
  margin-right: auto;
  margin-top: 100px;
  display: flex;
  justify-content: start;
  align-items: center;
  flex-direction: column;
  width: 50%;
  background-color: white;
  height: auto;
  border: none;
  box-shadow: 3px 3px 20px rgba(0, 0, 0, 0.2);
  border-radius: 20px;
`

const SubmitButton = styled.button`
  padding: 15px 45px;
  font-size: 1.2em;
  height: 50px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  background-image: linear-gradient(to right, #fc00ff 0%, #00dbde  51%, #fc00ff  100%);
  text-transform: uppercase;
  text-align: center;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  display: block;

  &:hover {
    background-position: right center;
    color: #fff;
    text-decoration: none;
  }
`