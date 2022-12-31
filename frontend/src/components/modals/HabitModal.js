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
import './TaskModal.css'
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from '@mui/icons-material/Delete';
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const TaskModal = (props) => {

    const [name, setName] = useState()
    const [time, setTime] = useState()
    const [date, setDate] = useState()

    const measures = ['страница', 'час', 'минута', 'секунда']

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
                    Добавить привычку
                </Typography>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Stack sx={{width: '350px'}} spacing={3}>
                        <TextField
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            label="Привычка"
                            variant="outlined"
                        />
                        <div>Регулярность вводится в формате: 0110011</div>
                        <TextField
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            margin={'normal'}
                            label="Регулярность"
                            variant="outlined"
                        />
                        <div>Дата завершения:</div>
                        <input style={{width: '100%', height: '50px', padding: '15px', fontFamily: 'Roboto sans-serif', fontSize: '15px'}} type="date"/>
                        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                            <TextField
                                label="Цель"
                                variant="outlined"
                            />
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={measures}
                                sx={{ width: 300, marginLeft: 2 }}
                                renderInput={(params) => <TextField {...params} label="Единица измерения" />}
                            />
                        </div>
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
                </div>
            </Container>
        </Modal>
    )
}

export default TaskModal