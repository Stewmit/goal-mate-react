import React, {useEffect} from 'react';
import {Badge, Button, Checkbox, IconButton, Stack, TextField, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
// import AddIcon from "@mui/icons-material/Add";
import {useState} from "react";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {BlockPicker} from "react-color";
import PaletteIcon from '@mui/icons-material/Palette';
import Tippy from "@tippyjs/react";
import AlertDialog from "../alerts/AlertDialog";
import {deleteTask, updateTask} from "../../http/taskAPI";
import {useDispatch} from "react-redux";
import {DELETE_TASK_ACTION, UPDATE_TASK_ACTION} from "../../utils/consts";
import {format} from "date-fns";

const TaskForm = (props) => {

    const {currentTask, closeTaskHandler} = props

    const dispatch = useDispatch()

    const [openAlert, setOpenAlert] = useState(false)
    const [name, setName] = useState('')
    const [time, setTime] = useState('')
    const [date, setDate] = useState('')
    const [highlightColor, setHighlightColor] = useState('')
    const [description, setDescription] = useState('')
    const [isComplete, setIsComplete] = useState(false)

    const defaultColors = ['#FFA591', '#FFF000', '#9DFF91', '#91FFFA', '#91B9FF']

    const badgeStyle = {
        "& .MuiBadge-badge": {
            backgroundColor: highlightColor,
        }
    }

    useEffect(() => {
        if (currentTask !== null) {
            if (currentTask.name) setName(currentTask.name)
            if (currentTask.time) setTime(currentTask.time)
            if (currentTask.date) setDate(currentTask.date)
            if (currentTask.highlightColor) setHighlightColor(currentTask.highlightColor)
            if (currentTask.description) setDescription(currentTask.description)
            if (currentTask.isComplete !== null) setIsComplete(currentTask.isComplete)
        }
    }, [currentTask])

    const closeHandler = () => setOpenAlert(false)

    const editTask = async () => {
        const task = {
            id: currentTask.id,
            name,
            time,
            date: date,
            highlightColor,
            description,
            isComplete,
            userId: currentTask.userId
        }

        try {
            await updateTask(task)
            dispatch({type: UPDATE_TASK_ACTION, payload: task})
        }
        catch (e) {
            console.log(e)
        }
        closeTaskHandler()
    }

    const deleteHandler = async () => {
        await deleteTask(currentTask.id)
        dispatch({type: DELETE_TASK_ACTION, payload: {id: currentTask.id}})
        closeHandler()
        closeTaskHandler()
    }

    return (
        <div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Stack sx={{width: '400px'}} spacing={3}>
                    <div style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}
                    >
                        <input
                            style={{
                                border: "none",
                                outline: 'none',
                                width: '100%',
                                fontSize: 20,
                                padding: 10
                            }}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <div
                            style={{
                                display: 'flex',
                            }}
                        >
                            <Checkbox
                                checked={isComplete}
                                onChange={() => setIsComplete(!isComplete)}
                                color="default"
                                icon={<RadioButtonUncheckedIcon sx={{fontSize: '25px'}} />}
                                checkedIcon={<CheckCircleIcon sx={{fontSize: '25px'}} />}
                            />
                            <div>
                                <Tippy interactive={true} placement='bottom' content={
                                    <BlockPicker
                                        colors={defaultColors}
                                        color={highlightColor}
                                        onChange={color => setHighlightColor(color.hex)}
                                    />
                                }>
                                    <IconButton>
                                        <Badge sx={badgeStyle} variant="dot">
                                            <PaletteIcon sx={{fontSize: '25px'}} />
                                        </Badge>
                                    </IconButton>
                                </Tippy>
                            </div>
                            <IconButton onClick={() => setOpenAlert(true)}>
                                <DeleteIcon sx={{fontSize: '25px'}} />
                            </IconButton>
                        </div>
                    </div>
                    <TextField
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        margin={'normal'}
                        label="Время"
                        variant="outlined"
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Дата"
                            value={date}
                            onChange={(value) => setDate(format(value, 'yyyy-MM-dd'))}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        variant='outlined'
                        placeholder='Описание'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        multiline={true}
                        rows={5}
                        // maxRows={10}
                    />
                    <div style={{display: "flex", justifyContent: 'left'}}>
                        <Button sx={{height: '45px'}} variant={'outlined'} onClick={(() => editTask())}>Save</Button>
                    </div>
                </Stack>
                <Stack sx={{width: '300px', marginLeft: '50px'}} mt={1} spacing={2}>
                    <Typography sx={{fontSize: 20}}>Подзадачи:</Typography>
                    {/*<div className='add-task'>*/}
                    {/*    <TextField  variant="standard" sx={{width: '80%'}}/>*/}
                    {/*    <Checkbox*/}
                    {/*        color="default"*/}
                    {/*        icon={<RadioButtonUncheckedIcon/>}*/}
                    {/*        checkedIcon={<CheckCircleIcon/>}*/}
                    {/*    />*/}
                    {/*    <IconButton>*/}
                    {/*        <DeleteIcon/>*/}
                    {/*    </IconButton>*/}
                    {/*</div>*/}
                    {/*<div className='add-task'>*/}
                    {/*    <TextField placeholder='Подзадача' variant="standard" sx={{width: '100%'}} />*/}
                    {/*    <IconButton>*/}
                    {/*        <AddIcon/>*/}
                    {/*    </IconButton>*/}
                    {/*</div>*/}
                </Stack>
            </div>
            <AlertDialog open={openAlert} closeHandler={closeHandler} title={'Удаление'} message={'Вы точно хотите удалить задачу?'} action={deleteHandler}/>
        </div>
    );
};

export default TaskForm;