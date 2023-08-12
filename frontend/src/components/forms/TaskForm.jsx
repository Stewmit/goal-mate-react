import React, {useEffect, useState} from 'react'
import {
    Badge,
    Button,
    Checkbox,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField
} from "@mui/material"
import DeleteIcon from "@mui/icons-material/Delete"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import AddIcon from "@mui/icons-material/Add"
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider"
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns'
import {DatePicker} from "@mui/x-date-pickers/DatePicker"
import {BlockPicker} from "react-color"
import Tippy from "@tippyjs/react"
import PaletteIcon from '@mui/icons-material/Palette'
import AlertDialog from "../alerts/AlertDialog.jsx"
import {deleteTask} from "../../http/taskAPI.js"
import {useDispatch} from "react-redux"
import {useForm} from "../../hooks/useForm.js"
import {Reorder} from 'framer-motion'
import CloseIcon from "@mui/icons-material/Close"
import {deleteLocalTask} from "../../store/reducers/taskSlice.js"
import {format} from "date-fns"
import { v4 as uuid} from 'uuid'
import styled from "styled-components";
import * as PropTypes from "prop-types";
import {DateTimePicker} from "@mui/x-date-pickers";
import NotificationsIcon from '@mui/icons-material/Notifications';

const initialValues = {
    id: 0,
    name: '',
    time: '',
    date: null,
    description: '',
    highlightColor: '',
    isComplete: false
}

const defaultColors = ['#ffceb5', '#f5ffb5', '#b8ffb5', '#b5fffa', '#f1b5ff']

function DemoContainer(props) {
    return null;
}

DemoContainer.propTypes = {
    components: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.node
};
const TaskForm = (props) => {

    const {currentTask, saveTask, closeTask} = props

    const dispatch = useDispatch()
    const [openAlert, setOpenAlert] = useState(false)
    const [newSubtaskInput, setNewSubtaskInput] = useState('')
    const [subtasks, setSubtasks] = useState([])
    const [performer, setPerformer] = useState('')
    const [goal, setGoal] = useState('')
    const [dateTime, setDateTime] = useState('')

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
        <div style={{paddingBottom: '10px', paddingLeft: '10px', paddingRight: '10px'}}>
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
                        label='Надпись'
                        value={taskForm.inputs.time}
                        onChange={(e) => taskForm.handleChange('time', e.target.value)}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Дата"
                            value={taskForm.inputs.date}
                            onChange={(date) => taskForm.handleChange('date', format(date, 'yyyy-MM-dd'))}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    {/* <FormControl fullWidth>
                        <InputLabel>Исполнитель</InputLabel>
                        <Select
                            value={performer}
                            label="Исполнитель"
                            onChange={(e) => setPerformer(e.target.value)}
                        >
                            <MenuItem value={'10'}>Павел Белоусов</MenuItem>
                            <MenuItem value={'20'}>Twenty</MenuItem>
                            <MenuItem value={'30'}>Thirty</MenuItem>
                        </Select>
                    </FormControl> */}
                    <FormControl fullWidth>
                        <InputLabel>Цель</InputLabel>
                        <Select
                            value={performer}
                            label="Цель"
                            onChange={(e) => setPerformer(e.target.value)}
                        >
                            <MenuItem value={'10'}>Завести видеоблог</MenuItem>
                            <MenuItem value={'20'}>Twenty</MenuItem>
                            <MenuItem value={'30'}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label='Описание'
                        value={taskForm.inputs.description}
                        onChange={(e) => taskForm.handleChange('description', e.target.value)}
                        multiline={true}
                        rows={5}
                    />
                    <SubmitButton variant='outlined' onClick={handleSubmit}>Ok</SubmitButton>
                </Stack>
                <Stack
                    sx={{
                        width: '380px',
                        marginLeft: '50px',
                        maxHeight: '600px',
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
                    <div style={{display: 'flex', alignItems: 'center', marginLeft: '10px', width: '360px'}}>
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

const SubmitButton = styled.button`
  margin-top: 10px;
  padding: 15px 45px;
  font-size: 1em;
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

const NotificationLine = styled.button`
  background-color: white;
  border: none;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
`