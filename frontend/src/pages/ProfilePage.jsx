import React, {useRef, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Menu} from "../components/Menu.jsx"
import {Box, Container, Divider, Grid, IconButton, Link, List, ListItem, Paper, Stack, Typography} from "@mui/material"
import EditIcon from '@mui/icons-material/Edit'
import ChangeNameModal from "../components/modals/profile/ChangeNameModal.jsx"
import ChangeEmailModal from "../components/modals/profile/ChangeEmailModal.jsx"
import ChangePasswordModal from "../components/modals/profile/ChangePasswordModal.jsx"
import AccountDeleteDialog from "../components/alerts/AccountDeleteDialog.jsx"
import {useEffect} from "react"
import {fetchTasks} from "../http/taskAPI.js"
import {fetchHabits} from "../http/habitAPI.js"
import styled from 'styled-components'
import {changeAvatar} from "../http/userAPI.js";
import {setUser} from "../store/reducers/userSlice.js";
import {FRIENDS_ROUTE} from "../utils/consts.js";
import { useNavigate } from 'react-router-dom'

const ProfilePage = () => {

    const user = useSelector(state => state.user.user)

    const [openChangeName, setOpenChangeName] = useState(false)
    const [openChangeEmail, setOpenChangeEmail] = useState(false)
    const [openChangePassword, setOpenChangePassword] = useState(false)
    const [openDeleteAccount, setOpenDeleteAccount] = useState(false)
    const [tasks, setTasks] = useState([])
    const [habits, setHabits] = useState([])

    const inputRef = useRef(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        fetchTasks().then(data => {
            setTasks(data)
        })
        fetchHabits().then(data => {
            setHabits(data)
        })
    }, [])

    const updatePicture = async (e) => {
        const formData = new FormData()
        formData.append('img', e.target.files[0])
        let data = await changeAvatar(formData)
        dispatch(setUser({
            id: data.id,
            name: data.name,
            surname: data.surname,
            email: data.email,
            avatar: data.avatar
        }))
        inputRef.current.value = null
    }

    return (
        <Box>
            <Menu/>
            <Container
                sx={{
                    marginTop: '70px'
                }}
            >
                <Paper elevation={4} style={{paddingTop: '10px', padding: '10px', borderRadius: '15px'}}>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: '30px'
                        }}
                    >
                        <Typography component={'h1'} variant={'h3'}>
                            Профиль
                        </Typography>
                    </div>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <img
                                style={{borderRadius: '20px', marginLeft: '10px'}}
                                width={'100%'}
                                height={'auto'}
                                src={user.avatar ? import.meta.env.VITE_APP_API_URL + user.avatar : 'https://cdn-icons-png.flaticon.com/512/21/21104.png'}
                                alt={'Аватар'}
                            />
                            <AvatarEditButton
                                type='file'
                                onChange={updatePicture}
                                ref={inputRef}
                            />
                        </Grid>
                        <Grid item xs={9}>
                            <List>
                                <ListItem>
                                    <Typography component={'h2'} variant={'h5'}
                                                sx={{
                                                    fontWeight: 'bold'
                                                }}
                                    >
                                        {`${user.name} ${user.surname}`}
                                    </Typography>
                                    <IconButton size={'small'} sx={{marginLeft: 1}} onClick={() => setOpenChangeName(true)}>
                                        <EditIcon fontSize='inherit'/>
                                    </IconButton>
                                </ListItem>
                                <Divider/>
                                <Typography component={'h3'} sx={{marginLeft: '15px', fontSize: '13px'}}>
                                    Статистика
                                </Typography>
                                <ListItem
                                    sx={{
                                        marginTop: 2,
                                        marginBottom: 2
                                    }}
                                >
                                    <Stack direction={'column'} gap={1}>
                                        <Typography>
                                            {`Задачи: ${tasks.reduce((accumulator, task) => accumulator + (task.isComplete ? 1 : 0), 0)}/${tasks.length}`}
                                        </Typography>
                                        <Typography>
                                            {`Цели: 5/10`}
                                        </Typography>
                                        <Typography>
                                            {`Привычки: 6`}
                                            {/*{`Привычки: ${habits.length}`}*/}
                                        </Typography>
                                    </Stack>
                                </ListItem>
                                <Divider/>
                                <Typography component={'h3'} sx={{marginLeft: '15px', fontSize: '13px'}}>
                                    Контакты
                                </Typography>
                                <ListItem
                                    sx={{
                                        marginTop: 2,
                                        marginBottom: 2
                                    }}
                                >
                                    <Stack direction={'column'} gap={1}>
                                        <Typography>
                                            {`Количество: 5`}
                                        </Typography>
                                        <Link
                                            sx={{
                                                color: '#4287f5',
                                                cursor: 'pointer',
                                                textDecoration: 'none'
                                            }}
                                            onClick={() => navigate(FRIENDS_ROUTE)}
                                        >
                                            <Typography>
                                                Перейти к списку контактов
                                            </Typography>
                                        </Link>
                                    </Stack>
                                </ListItem>
                                <Divider/>
                                <Typography component={'h3'} sx={{marginLeft: '15px', fontSize: '13px'}}>
                                    Данные
                                </Typography>
                                <ListItem>
                                    <Typography>
                                        <span style={{fontWeight: 'bold'}}>Почта:</span>
                                        {` ${user.email}`}
                                    </Typography>
                                    <IconButton size={'small'} sx={{marginLeft: 1}} onClick={() => setOpenChangeEmail(true)}>
                                        <EditIcon fontSize='inherit'/>
                                    </IconButton>
                                </ListItem>
                                <ListItem>
                                    <Link
                                        onClick={() => setOpenChangePassword(true)}
                                        sx={{
                                            color: '#4287f5',
                                            cursor: 'pointer',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        <Typography>
                                            Сменить пароль
                                        </Typography>
                                    </Link>
                                </ListItem>
                                <ListItem>
                                    <Typography>
                                        <span style={{fontWeight: 'bold'}}>Роль:</span>
                                        <span>{" пользователь"}</span>
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Typography>
                                        <span style={{fontWeight: 'bold'}}>Дата регистрации:</span>
                                        <span>{" 03-05-2023"}</span>
                                    </Typography>
                                </ListItem>
                                <ListItem>
                                    <Link
                                        onClick={() => setOpenDeleteAccount(true)}
                                        sx={{
                                            color: 'red',
                                            cursor: 'pointer',
                                            textDecoration: 'none'
                                        }}
                                    >
                                        <Typography>
                                            Удалить аккаунт
                                        </Typography>
                                    </Link>
                                </ListItem>
                            </List>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
            <ChangeNameModal open={openChangeName} closeHandler={() => setOpenChangeName(false)} user={user} />
            <ChangeEmailModal open={openChangeEmail} closeHandler={() => setOpenChangeEmail(false)} user={user} />
            <ChangePasswordModal open={openChangePassword} closeHandler={() => setOpenChangePassword(false)} user={user} />
            <AccountDeleteDialog open={openDeleteAccount} closeHandler={() => setOpenDeleteAccount(false)} user={user}/>
        </Box>
    )
}

export default ProfilePage

const AvatarEditButton = styled.input`
  margin-left: 10px;
`