import React, {useState} from 'react'
import {Button, Checkbox, Container, IconButton, Modal, Stack, TextField, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import './TaskModal.css'
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";


function Textarea(props) {
    return null;
}

const TaskModal = (props) => {

    const [name, setName] = useState()
    const [time, setTime] = useState()
    const [date, setDate] = useState()

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
                    width: '40%',
                    height: 'auto',
                    background: 'white',
                    borderRadius: 3,
                    p: 3,
                }}
            >
                <Typography component={'h1'} variant={'h4'} sx={{marginBottom: '30px'}}>
                    Изменить задачу
                </Typography>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Stack sx={{width: '350px'}} spacing={3}>
                        <TextField
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            margin={'normal'}
                            label="Задача"
                            variant="outlined"
                        />
                        <TextField
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            margin={'normal'}
                            label="Время"
                            variant="outlined"
                        />
                        <input style={{width: '100%', height: '50px', padding: '15px', fontFamily: 'Roboto sans-serif', fontSize: '15px'}} type="date"/>
                        <TextField
                            margin={'normal'}
                            label="Hex color"
                            variant="outlined"
                        />
                        <TextField
                            variant='outlined'
                            placeholder='Описание'
                            multiline
                            rows={5}
                            maxRows={10}
                        />
                        <div style={{display: "flex", justifyContent: 'space-between'}}>
                            <Button sx={{height: '45px'}} variant={'contained'}>Подтвердить</Button>
                            <IconButton>
                                <DeleteIcon/>
                                <div style={{fontSize: "20px"}}>Удалить</div>
                            </IconButton>
                        </div>
                    </Stack>

                    <Stack sx={{width: '200px', marginLeft: '50px'}} spacing={3}>
                        <Typography variant={'h5'}>Подзадачи:</Typography>
                        <div className='add-task'>
                            <IconButton>
                                <DeleteIcon/>
                            </IconButton>
                            <TextField  variant="standard" />
                            <Checkbox
                                color="default"
                                icon={<RadioButtonUncheckedIcon/>}
                                checkedIcon={<CheckCircleIcon/>}
                            />
                        </div>
                        <div className='add-task'>
                            <IconButton>
                                <DeleteIcon/>
                            </IconButton>
                            <TextField  variant="standard" />
                            <Checkbox
                                color="default"
                                icon={<RadioButtonUncheckedIcon/>}
                                checkedIcon={<CheckCircleIcon/>}
                            />
                        </div>
                        <div className='add-task'>
                            <IconButton>
                                <DeleteIcon/>
                            </IconButton>
                            <TextField  variant="standard" />
                            <Checkbox
                                color="default"
                                icon={<RadioButtonUncheckedIcon/>}
                                checkedIcon={<CheckCircleIcon/>}
                            />
                        </div>
                        <div className='add-task'>
                            <IconButton>
                                <DeleteIcon/>
                            </IconButton>
                            <TextField  variant="standard" />
                            <Checkbox
                                color="default"
                                icon={<RadioButtonUncheckedIcon/>}
                                checkedIcon={<CheckCircleIcon/>}
                            />
                        </div>
                        <div className='add-task'>
                            <IconButton>
                                <AddIcon/>
                            </IconButton>
                            <TextField placeholder='Подзадача' variant="standard" />
                        </div>
                    </Stack>
                </div>
            </Container>
        </Modal>
    )
}

export default TaskModal