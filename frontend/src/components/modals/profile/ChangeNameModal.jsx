import React, {useState} from 'react'
import {Button, Container, Modal, Stack, TextField, Typography} from "@mui/material"
import {editUser} from "../../../http/userAPI.js"
import {useDispatch} from "react-redux"
import {setUser} from "../../../store/reducers/userSlice.js"
import styled from "styled-components";

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
                email: data.email,
                avatar: data.avatar
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
                <Stack sx={{width: '60%'}} spacing={4}>
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
                    <SubmitButton onClick={changeNameHandler} sx={{height: '45px'}} variant={'contained'}>Подтвердить</SubmitButton>
                </Stack>
            </Container>
        </Modal>
    )
}

export default ChangeNameModal

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