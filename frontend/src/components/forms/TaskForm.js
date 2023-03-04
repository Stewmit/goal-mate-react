import React, {useEffect, useState} from 'react';
import {Badge, Button, Checkbox, IconButton, Stack, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {BlockPicker} from "react-color";
import PaletteIcon from '@mui/icons-material/Palette';
import Tippy from "@tippyjs/react";
import AlertDialog from "../alerts/AlertDialog";
import {deleteTask} from "../../http/taskAPI";
import {useDispatch} from "react-redux";
import {useForm} from "../../hooks/useForm";
import {Reorder} from 'framer-motion'
import CloseIcon from "@mui/icons-material/Close";
import {deleteLocalTask} from "../../store/reducers/taskSlice";
import {format} from "date-fns"
import { v4 as uuid} from 'uuid'

const initialValues = {
    id: 0,
    name: '',
    time: '',
    date: null,
    description: '',
    highlightColor: '',
    isComplete: false
}

const defaultColors = ['#FFA591', '#FFF000', '#9DFF91', '#91FFFA', '#91B9FF']

const TaskForm = (props) => {

    const {currentTask, saveTask, closeTask} = props

    const dispatch = useDispatch()
    const [openAlert, setOpenAlert] = useState(false)
    const [newSubtaskInput, setNewSubtaskInput] = useState('')
    const [subtasks, setSubtasks] = useState([])

    const taskForm = useForm(initialValues)

    const badgeStyle = {
        "& .MuiBadge-badge": {
            backgroundColor: taskForm.inputs.highlightColor,
        }
    }

    useEffect(() => {
        if (currentTask != null) {
            taskForm.setInputs({
                id: currentTask.id,
                name: currentTask.name,
                time: currentTask.time,
                date: currentTask.date,
                description: currentTask.description,
                highlightColor: currentTask.highlightColor,
                isComplete: currentTask.isComplete,
            })
            setSubtasks(currentTask.subtasks.map(subtask => ({...subtask, number: uuid()})))
        }
    }, [])

    const handleExit = () => {
        closeTask()
        taskForm.resetForm()
        setNewSubtaskInput('')
    }

    const handleSubmit = () => {
        saveTask({...taskForm.inputs, subtasks: subtasks})
        handleExit()
    }

    const handleDeleteTask = async () => {
        try {
            await deleteTask(currentTask.id)
            dispatch(deleteLocalTask(currentTask))
            handleExit()
        }
        catch (err) {
            alert(err)
        }
    }

    const handleAddSubtask = async () => {
        const newSubtask = {
            name: newSubtaskInput,
            isComplete: false,
            taskId: currentTask?.id,
            number: uuid()
        }
        setSubtasks([...subtasks, newSubtask])
        setNewSubtaskInput('')
    }

    const handleReorderSubtasks = async (newOrder) => {
        setSubtasks(newOrder)
    }

    const handleSubtaskCheckboxChange = async (currentNumber) => {
        setSubtasks(subtasks.map(subtask => subtask.number === currentNumber ? {...subtask, isComplete: !subtask.isComplete} : subtask))
    }

    const subtaskFieldsHandler = async (currentNumber, newValue) => {
        setSubtasks(subtasks.map(subtask => subtask.number === currentNumber ? {...subtask, name: newValue} : subtask))
    }

    const handleDeleteSubtask = async (currentNumber) => {
        setSubtasks(subtasks.filter(subtask => subtask.number !== currentNumber))
    }

    return (
        <div>
            <div style={{display: "flex", justifyContent: "right", width: '100%'}}>
                <IconButton onClick={handleExit}>
                    <CloseIcon/>
                </IconButton>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <Stack sx={{width: '400px'}} spacing={3}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}
                    >
                        <input
                            placeholder={taskForm.inputs.name === '' ? 'Название задачи' : ''}
                            value={taskForm.inputs.name}
                            onChange={(e) => taskForm.handleChange('name', e.target.value)}
                            style={{
                                border: "none",
                                outline: 'none',
                                width: '100%',
                                fontSize: 20,
                                padding: 10
                            }}
                        />
                        <div
                            style={{
                                display: 'flex',
                            }}
                        >
                            <Checkbox
                                type='checkbox'
                                checked={taskForm.inputs.isComplete}
                                onChange={(e) => taskForm.handleChange('isComplete', e.target.checked)}
                                color="default"
                                icon={<RadioButtonUncheckedIcon sx={{fontSize: '25px'}}/>}
                                checkedIcon={<CheckCircleIcon sx={{fontSize: '25px'}}/>}
                            />
                            <div>
                                <Tippy interactive={true} placement='bottom' content={
                                    <BlockPicker
                                        colors={defaultColors}
                                        color={taskForm.inputs.highlightColor}
                                        onChange={(color) => taskForm.handleChange('highlightColor', color.hex)}
                                    />
                                }>
                                    <IconButton>
                                        <Badge sx={badgeStyle} variant="dot">
                                            <PaletteIcon sx={{fontSize: '25px'}}/>
                                        </Badge>
                                    </IconButton>
                                </Tippy>
                            </div>
                            <IconButton onClick={() => setOpenAlert(true)}>
                                <DeleteIcon sx={{fontSize: '25px'}}/>
                            </IconButton>
                        </div>
                    </div>
                    <TextField
                        label='Время'
                        value={taskForm.inputs.time}
                        onChange={(e) => taskForm.handleChange('time', e.target.value)}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label='Дата'
                            value={taskForm.inputs.date}
                            onChange={(date) => taskForm.handleChange('date', format(date, 'yyyy-MM-dd'))}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        label='Описание'
                        value={taskForm.inputs.description}
                        onChange={(e) => taskForm.handleChange('description', e.target.value)}
                        multiline={true}
                        rows={5}
                    />
                    <Button variant='outlined' onClick={handleSubmit}>Ok</Button>
                </Stack>
                <Stack
                    sx={{
                        width: '300px',
                        marginLeft: '50px',
                        maxHeight: '450px',
                        overflow: 'auto'
                    }}
                    mt={1}
                    spacing={2}
                >
                    <div style={{fontSize: 20 }}>Подзадачи:</div>
                    {
                        <Reorder.Group onReorder={(newOrder) => handleReorderSubtasks(newOrder)} values={subtasks}>
                            {
                                subtasks.map(subtask =>
                                    <Reorder.Item key={subtask.number} value={subtask} style={{
                                        listStyleType: 'none',
                                        cursor: 'grab',
                                        marginTop: 10,
                                        padding: 10,
                                        borderRadius: 15
                                    }}>
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center"
                                        }}>
                                            <TextField
                                                variant="standard"
                                                sx={{width: '80%'}}
                                                value={subtask.name}
                                                onChange={(e) => subtaskFieldsHandler(subtask.number, e.target.value)}
                                            />
                                            <Checkbox
                                                checked={subtask.isComplete}
                                                color="default"
                                                icon={<RadioButtonUncheckedIcon/>}
                                                onChange={() => handleSubtaskCheckboxChange(subtask.number)}
                                                checkedIcon={<CheckCircleIcon/>}
                                            />
                                            <IconButton onClick={() => handleDeleteSubtask(subtask.number)}>
                                                <DeleteIcon/>
                                            </IconButton>
                                        </div>
                                    </Reorder.Item>
                                )
                            }
                        </Reorder.Group>
                    }
                    <div className='add-task'>
                        <TextField
                            placeholder='Подзадача'
                            variant="standard"
                            sx={{width: '100%'}}
                            value={newSubtaskInput}
                            onChange={e => setNewSubtaskInput(e.target.value)}
                        />
                        <IconButton onClick={handleAddSubtask}>
                            <AddIcon/>
                        </IconButton>
                    </div>
                </Stack>
            </div>
            <AlertDialog
                title={'Удаление'}
                message={'Вы точно хотите удалить задачу?'}
                open={openAlert}
                closeHandler={() => setOpenAlert(false)}
                action={handleDeleteTask}
            />
        </div>
    );
};

export default TaskForm;