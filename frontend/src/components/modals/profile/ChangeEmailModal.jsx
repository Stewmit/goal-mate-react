import React from 'react'
import {useState} from "react"
import {useDispatch} from "react-redux"
import {editUser} from "../../../http/userAPI.js"
import {Button, Container, MenuItem, Modal, Select, Stack, TextField, Typography} from "@mui/material"
import {setUser} from "../../../store/reducers/userSlice.js"
import styled from "styled-components";

const ChangeEmailModal = (props) => {
    const [email, setEmail] = useState(props.user.email)
    const [goal, setGoal] = useState('')

    const dispatch = useDispatch()

    const changeEmailHandler = async () => {
        try {
            let data = await editUser({id: props.user.id, email})
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
                    Назначить задачу
                </Typography>
                <Stack spacing={4} width={'60%'}>
                    {/*<TextField*/}
                    {/*    value={email}*/}
                    {/*    onChange={(e) => setEmail(e.target.value)}*/}
                    {/*    margin={'normal'}*/}
                    {/*    label="Почта"*/}
                    {/*    variant="outlined"*/}
                    {/*/>*/}
                    <Select
                        sx={{width: '100%', height: '50px', display: 'flex', alignItems: 'center'}}
                        value={goal}
                        label="Задача"
                        onChange={(e) => setGoal(e.target.value)}
                    >
                        <MenuItem value={10}>Купить продукты</MenuItem>
                        <MenuItem value={20}>Распечатать отчёт</MenuItem>
                        <MenuItem value={30}>Погулять с собакой</MenuItem>
                        <MenuItem value={40}>Написать статью</MenuItem>
                    </Select>
                    <SubmitButton onClick={changeEmailHandler} sx={{height: '45px'}} variant={'contained'}>Подтвердить</SubmitButton>
                </Stack>
            </Container>
        </Modal>
    )
}

export default ChangeEmailModal

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