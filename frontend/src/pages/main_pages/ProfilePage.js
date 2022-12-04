import React, {useState} from 'react'
import {useSelector} from "react-redux";
import {Menu} from "../../components/Menu";
import {Box, Container, Divider, Grid, IconButton, Link, List, ListItem, Paper, Stack, Typography} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import ChangeNameModal from "../../components/modals/profile/ChangeNameModal";
import ChangeEmailModal from "../../components/modals/profile/ChangeEmailModal";
import ChangePasswordModal from "../../components/modals/profile/ChangePasswordModal";
import AccountDeleteAlert from "../../components/alerts/AlertDialog";

const ProfilePage = () => {

    const user = useSelector(state => state.user)

    const [openChangeName, setOpenChangeName] = useState(false)
    const [openChangeEmail, setOpenChangeEmail] = useState(false)
    const [openChangePassword, setOpenChangePassword] = useState(false)
    const [openDeleteAccount, setOpenDeleteAccount] = useState(false)

    const openChangeNameHandler = () => setOpenChangeName(true)
    const closeChangeNameHandler = () => setOpenChangeName(false)
    const openChangeEmailHandler = () => setOpenChangeEmail(true)
    const closeChangeEmailHandler = () => setOpenChangeEmail(false)
    const openChangePasswordHandler = () => setOpenChangePassword(true)
    const closeChangePasswordHandler = () => setOpenChangePassword(false)
    const openDeleteAccountHandler = () => setOpenDeleteAccount(true)
    const closeDeleteAccountHandler = () => setOpenDeleteAccount(false)

    return (
        <Box>
            <Menu/>
            <Container
                sx={{
                    marginTop: '70px'
                }}
            >
                <Paper elevation={2} style={{paddingTop: '10px'}}>
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
                    <Stack direction={'row'} spacing={'3'}>

                    </Stack>
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <img
                                width={'100%'}
                                height={'auto'}
                                src={'https://cdn-icons-png.flaticon.com/512/21/21104.png'}
                                alt={'Аватар'}
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
                                    <IconButton size={'small'} sx={{marginLeft: 1}} onClick={openChangeNameHandler}>
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
                                    <Stack direction={'row'} spacing={2}>
                                        <Typography>
                                            {`Цели: 5/10`}
                                        </Typography>
                                        <Typography>
                                            {`Задачи: 8/15`}
                                        </Typography>
                                        <Typography>
                                            {`Привычки: 6`}
                                        </Typography>
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
                                    <IconButton size={'small'} sx={{marginLeft: 1}} onClick={openChangeEmailHandler}>
                                        <EditIcon fontSize='inherit'/>
                                    </IconButton>
                                </ListItem>
                                <ListItem>
                                    <Link
                                        onClick={openChangePasswordHandler}
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
                                    <Link
                                        onClick={openDeleteAccountHandler}
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
            <ChangeNameModal open={openChangeName} closeHandler={closeChangeNameHandler} user={user} />
            <ChangeEmailModal open={openChangeEmail} closeHandler={closeChangeEmailHandler} user={user} />
            <ChangePasswordModal open={openChangePassword} closeHandler={closeChangePasswordHandler} user={user} />
            <AccountDeleteAlert open={openDeleteAccount} closeHandler={closeDeleteAccountHandler} user={user}/>
        </Box>
    )
}

export default ProfilePage