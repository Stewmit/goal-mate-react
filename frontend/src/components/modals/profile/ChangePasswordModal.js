import React from 'react'
import {useState} from "react";
import {useDispatch} from "react-redux";
import {changePassword} from "../../../http/userAPI";
import {LOGIN_ROUTE, SET_IS_AUTH_ACTION, SET_USER_ACTION} from "../../../utils/consts";
import {Button, Container, Modal, Stack, TextField, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";

const ChangePasswordModal = (props) => {

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword1, setNewPassword1] = useState('')
    const [newPassword2, setNewPassword2] = useState('')

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = () => {
        navigate(LOGIN_ROUTE)
        localStorage.setItem('token', '')
        dispatch({type: SET_IS_AUTH_ACTION, payload: false})
        dispatch({type: SET_USER_ACTION, payload: {}})
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
                <Stack spacing={4}>
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
                    <Button onClick={changePasswordHandler} sx={{height: '45px'}} variant={'contained'}>Подтвердить</Button>
                </Stack>
            </Container>
        </Modal>
    )
}

export default ChangePasswordModal