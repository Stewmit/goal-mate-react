import React from 'react'
import {useState} from "react"
import {useDispatch} from "react-redux"
import {changePassword} from "../../../http/userAPI.js"
import {LOGIN_ROUTE} from "../../../utils/consts.js"
import {Button, Container, Modal, Stack, TextField, Typography} from "@mui/material"
import {useNavigate} from "react-router-dom"
import {authorize, setUser} from "../../../store/reducers/userSlice.js";
import styled from "styled-components";

const ChangePasswordModal = (props) => {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword1, setNewPassword1] = useState('')
    const [newPassword2, setNewPassword2] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = () => {
        navigate(LOGIN_ROUTE)
        localStorage.setItem('token', '')
        dispatch(authorize(false))
        dispatch(setUser({}))
    }

    const changePasswordHandler = async () => {
        if (oldPassword === '' || newPassword1 === '' || newPassword2 === '') {
            alert('Заполните все поля!')
        }
        else if (newPassword1 === newPassword2) {
            try {
                const data = await changePassword({id: props.user.id, oldPassword, newPassword: newPassword1})
                logout()
                props.closeHandler()
            }
            catch (e) {
                alert(e.response.data.message)
            }
        }
        else {
            alert('Пароли не совпадают!')
        }
    }

    return (
        <Modal
            open={props.open}
            onClose={props.closeHandler}
        >
            <Container
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: '30%',
                    height: 'auto',
                    background: 'white',
                    borderRadius: 3,
                    p: 3,
                }}
            >
                <Typography component={'h1'} variant={'h4'} sx={{marginBottom: '30px'}}>
                    Сменить пароль
                </Typography>
                <Stack sx={{width: '60%'}} spacing={4} >
                    <TextField
                        type={'password'}
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value.split(' ')[0])}
                        margin={'normal'}
                        label="Старый пароль"
                        variant="outlined"
                    />
                    <TextField
                        type={'password'}
                        value={newPassword1}
                        onChange={(e) => setNewPassword1(e.target.value.split(' ')[0])}
                        margin={'normal'}
                        label="Новый пароль"
                        variant="outlined"
                    />
                    <TextField
                        type={'password'}
                        value={newPassword2}
                        onChange={(e) => setNewPassword2(e.target.value.split(' ')[0])}
                        margin={'normal'}
                        label="Повтор пароля"
                        variant="outlined"
                    />
                    <SubmitButton onClick={changePasswordHandler} sx={{height: '45px'}} variant={'contained'}>Подтвердить</SubmitButton>
                </Stack>
            </Container>
        </Modal>
    )
}

export default ChangePasswordModal

const SubmitButton = styled.button`
  margin-top: 10px;
  padding: 15px 45px;
  font-size: 1em;
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  background-image: linear-gradient(to right, #fc00ff 0%, #00dbde  51%, #fc00ff  100%);
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  display: block;
  margin-bottom: 10px;

  &:hover {
    background-position: right center;
    color: #fff;
    text-decoration: none;
  }
`