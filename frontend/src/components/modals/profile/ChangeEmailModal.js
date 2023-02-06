import React from 'react'
import {useState} from "react";
import {useDispatch} from "react-redux";
import {editUser} from "../../../http/userAPI";
import {SET_USER_ACTION} from "../../../utils/consts";
import {Button, Container, Modal, Stack, TextField, Typography} from "@mui/material";
import {setUser} from "../../../store/reducers/userSlice";

const ChangeEmailModal = (props) => {
    const [email, setEmail] = useState(props.user.email)

    const dispatch = useDispatch()

    const changeEmailHandler = async () => {
        try {
            let data = await editUser({id: props.user.id, email})
            dispatch(setUser({
                id: data.id,
                name: data.name,
                surname: data.surname,
                email: data.email
            }))
        }
        catch (err) {
            alert(err.response.data.message)
        }
        props.closeHandler()
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
                    Изменить почту
                </Typography>
                <Stack spacing={4} width={'60%'}>
                    <TextField
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        margin={'normal'}
                        label="Почта"
                        variant="outlined"
                    />
                    <Button onClick={changeEmailHandler} sx={{height: '45px'}} variant={'contained'}>Подтвердить</Button>
                </Stack>
            </Container>
        </Modal>
    )
}

export default ChangeEmailModal