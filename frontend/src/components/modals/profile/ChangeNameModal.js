import React, {useState} from 'react'
import {Button, Container, Modal, Stack, TextField, Typography} from "@mui/material";
import {editUser} from "../../../http/userAPI";
import {useDispatch} from "react-redux";
import {SET_USER_ACTION} from "../../../utils/consts";
import {editLocalTask} from "../../../store/reducers/taskSlice";
import {setUser} from "../../../store/reducers/userSlice";

const ChangeNameModal = (props) => {

    const [name, setName] = useState(props.user.name)
    const [surname, setSurname] = useState(props.user.surname)

    const dispatch = useDispatch()

    const changeNameHandler = async () => {
        try {
            let data = await editUser({id: props.user.id, name, surname})
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
                    Изменить имя
                </Typography>
                <Stack spacing={4}>
                    <TextField
                        value={name}
                        onChange={(e) => setName(e.target.value.split(' ')[0])}
                        margin={'normal'}
                        label="Имя"
                        variant="outlined"
                    />
                    <TextField
                        value={surname}
                        onChange={(e) => setSurname(e.target.value.split(' ')[0])}
                        margin={'normal'}
                        label="Фамилия"
                        variant="outlined"
                    />
                    <Button onClick={changeNameHandler} sx={{height: '45px'}} variant={'contained'}>Подтвердить</Button>
                </Stack>
            </Container>
        </Modal>
    )
}

export default ChangeNameModal