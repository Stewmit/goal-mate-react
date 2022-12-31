import React, {useState} from 'react'
import {
    Autocomplete,
    Button,
    Checkbox,
    Container,
    IconButton,
    Modal,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {useDispatch} from "react-redux";
import './GoalModal.css'
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const GoalModal = (props) => {

    const [name, setName] = useState()
    const [time, setTime] = useState()
    const [date, setDate] = useState()

    let tasks = ['Написать доклад', 'Полить цветы', 'Погулять с собакой', 'Помыть посуду']
    let habits = ['Чтение', 'Английский']
    let categories = ['Финансы', 'Путешествия', 'Образование', 'Досуг', 'Семья']

    const dispatch = useDispatch()

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
                    width: '60%',
                    height: 'auto',
                    background: 'white',
                    borderRadius: 3,
                    p: 3,
                }}
            >
                <Typography component={'h1'} variant={'h4'} sx={{marginBottom: '30px'}}>
                    Создать цель
                </Typography>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Stack sx={{width: '350px'}} spacing={3}>
                        <TextField
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            margin={'normal'}
                            label="Цель"
                            variant="outlined"
                        />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            options={categories}
                            renderInput={(params) => <TextField {...params} label="Категория" />}
                        />
                        <input style={{width: '100%', height: '50px', padding: '15px', fontFamily: 'Roboto sans-serif', fontSize: '15px'}} type="date"/>
                        <Button
                            style={{marginLeft: '50px', marginRight: '50px'}}
                            variant="contained"
                            component="label"
                        >
                            Upload File
                            <input
                                type="file"
                                hidden
                            />
                        </Button>
                        <TextField
                            variant='outlined'
                            placeholder='Описание'
                            multiline
                            rows={5}
                            maxRows={10}
                        />
                        {/*<div style={{display: "flex", justifyContent: 'space-between'}}>*/}
                            <Button sx={{height: '45px'}} variant={'contained'}>Подтвердить</Button>
                            {/*<IconButton>*/}
                            {/*    <DeleteIcon/>*/}
                            {/*    <div style={{fontSize: "20px"}}>Удалить</div>*/}
                            {/*</IconButton>*/}
                        {/*</div>*/}
                    </Stack>
                    <Stack sx={{width: '300px', marginLeft: '50px'}} spacing={3}>
                        <Typography variant={'h5'}>Задачи:</Typography>
                        <div className='add-task'>
                            <IconButton>
                                <DeleteIcon/>
                            </IconButton>
                            <Autocomplete
                                sx={{width: '250px'}}
                                disablePortal
                                options={tasks}
                                renderInput={(params) => <TextField {...params} variant={'standard'} label="Задача" />}
                            />
                        </div>
                        <div className='add-task'>
                            <IconButton>
                                <DeleteIcon/>
                            </IconButton>
                            <Autocomplete
                                sx={{width: '250px'}}
                                disablePortal
                                options={tasks}
                                renderInput={(params) => <TextField {...params} variant={'standard'} label="Задача" />}
                            />
                        </div>
                        <div className='add-task'>
                            <IconButton>
                                <DeleteIcon/>
                            </IconButton>
                            <Autocomplete
                                sx={{width: '250px'}}
                                disablePortal
                                options={tasks}
                                renderInput={(params) => <TextField {...params} variant={'standard'} label="Задача" />}
                            />
                        </div>
                        <div className='add-task'>
                            <IconButton>
                                <DeleteIcon/>
                            </IconButton>
                            <Autocomplete
                                sx={{width: '250px'}}
                                disablePortal
                                options={tasks}
                                renderInput={(params) => <TextField {...params} variant={'standard'} label="Задача" />}
                            />
                        </div>
                        <div className='add-task'>
                            <IconButton>
                                <AddIcon/>
                            </IconButton>
                            <Autocomplete
                                sx={{width: '250px'}}
                                disablePortal
                                options={tasks}
                                renderInput={(params) => <TextField {...params} variant={'standard'} label="Задача" />}
                            />
                            {/*<TextField placeholder='Подзадача' variant="standard" />*/}
                        </div>
                    </Stack>
                    <Stack sx={{width: '300px', marginLeft: '50px'}} spacing={3}>
                        <Typography variant={'h5'}>Привычки:</Typography>
                        <div className='add-task'>
                            <IconButton>
                                <DeleteIcon/>
                            </IconButton>
                            <Autocomplete
                                sx={{width: '250px'}}
                                disablePortal
                                options={habits}
                                renderInput={(params) => <TextField {...params} variant={'standard'} label="Привычка" />}
                            />
                        </div>
                        <div className='add-task'>
                            <IconButton>
                                <DeleteIcon/>
                            </IconButton>
                            <Autocomplete
                                sx={{width: '250px'}}
                                disablePortal
                                options={habits}
                                renderInput={(params) => <TextField {...params} variant={'standard'} label="Привычка" />}
                            />
                        </div>
                        <div className='add-task'>
                            <IconButton>
                                <AddIcon/>
                            </IconButton>
                            <Autocomplete
                                sx={{width: '250px'}}
                                disablePortal
                                options={habits}
                                renderInput={(params) => <TextField {...params} variant={'standard'} label="Привычка" />}
                            />
                            {/*<TextField placeholder='Подзадача' variant="standard" />*/}
                        </div>
                    </Stack>
                </div>
            </Container>
        </Modal>
    )
}

export default GoalModal