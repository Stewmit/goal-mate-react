import * as React from 'react'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import {deleteAccount} from "../../http/userAPI.js"
import {LOGIN_ROUTE} from "../../utils/consts.js";
import {useDispatch} from "react-redux"
import {useNavigate} from "react-router-dom"
import {authorize, setUser} from "../../store/reducers/userSlice.js";

const AccountDeleteDialog = (props) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = () => {
        navigate(LOGIN_ROUTE)
        localStorage.setItem('token', '')
        dispatch(authorize(false))
        dispatch(setUser({}))
    }

    const deleteHandler = async () => {
        try {
            let data = await deleteAccount(props.user.id)
            logout()
        }
        catch (e) {
            alert(e.response.data.message)
        }
        props.closeHandler()
    }

    return (
        <Dialog
            open={props.open}
            onClose={props.closeHandler}
        >
            <DialogTitle>
                {"Удаление аккаунта"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Вы уверены, что хотите удалить аккаунт?
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={deleteHandler}>Удалить</Button>
                <Button onClick={props.closeHandler}>Отмена</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AccountDeleteDialog