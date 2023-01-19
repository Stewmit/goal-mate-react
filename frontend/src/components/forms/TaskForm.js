import React, {useEffect, useState} from 'react';
import {Badge, Checkbox, IconButton, Stack, TextField, Typography} from "@mui/material";
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
import {createSubtask, deleteSubtask, updateSubtask} from "../../http/subtaskAPI";
import {useDispatch} from "react-redux";
import {DELETE_TASK_ACTION} from "../../utils/consts";
import {useForm} from "../../hooks/useForm";
import {Reorder} from 'framer-motion'
import CloseIcon from "@mui/icons-material/Close";

const initialValues = {
    id: 0,
    name: '',
    time: '',
    date: '',
    description: '',
    highlightColor: '',
    isComplete: false,
    subtasks: []
}

const TaskForm = (props) => {

    const {currentTask, addOrEditTask, closeTask} = props

    const dispatch = useDispatch()

    const [openAlert, setOpenAlert] = useState(false)
    const [subtaskInput, setSubtaskInput] = useState('')

    const defaultColors = ['#FFA591', '#FFF000', '#9DFF91', '#91FFFA', '#91B9FF']

    const {
        values,
        setValues,
        handleInputChange,
        handleDateChange,
        handleCheckboxChange,
        handleColorChange,
        resetForm
    } = useForm(initialValues)

    const [subtaskInputs, setSubtaskInputs] = useState({})

    const badgeStyle = {
        "& .MuiBadge-badge": {
            backgroundColor: values.highlightColor,
        }
    }

    useEffect(() => {
        if (currentTask != null) {
            setValues({
                ...currentTask
            })

            for (let i = 0; i < currentTask.subtasks.length; i++) {
                setSubtaskInputs(prevState => ({ ...prevState, ['field' + currentTask.subtasks[i].id]: currentTask.subtasks[i].name }))
            }
        }
    }, [currentTask, setValues])

    const handleDelete = async () => {
        closeTask(resetForm)
        await deleteTask(currentTask.id)
        dispatch({type: DELETE_TASK_ACTION, payload: {id: currentTask.id}})
    }

    const handleAddSubtask = async () => {
        const subtask = await createSubtask({
            name: subtaskInput,
            isComplete: false,
            order: values.subtasks.length === 0 ? 1 : values.subtasks[values.subtasks.length - 1].order + 1,
            taskId: currentTask.id
        })
        setValues({
            ...values,
            'subtasks': [...values.subtasks, subtask]
        })
        setSubtaskInput('')
        setSubtaskInputs(prevState => ({ ...prevState, ['field' + subtask.id]: subtask.name }))
    }

    const handleDeleteSubtask = async (id) => {
        try {
            await deleteSubtask(id)
            setValues({
                ...values,
                'subtasks': values.subtasks.filter(subtask => subtask.id !== id)
            })
        }
        catch (err) {
            console.error(err)
        }
    }

    const handleReorderSubtasks = async (newOrder) => {
        try {
            for (let i = 0; i < newOrder.length; i++) {
                newOrder[i].order = i+1
                await updateSubtask(newOrder[i])
            }
            setValues({
                ...values,
                'subtasks': newOrder
            })
        }
        catch (err) {
            console.error(err)
        }
    }

    const handleSubtaskCheckboxChange = async (currentSubtask) => {
        try {
            currentSubtask.isComplete = !currentSubtask.isComplete
            await updateSubtask(currentSubtask)
            const updatedSubtasks = values.subtasks
            updatedSubtasks.forEach((subtask, index, array) => subtask.id === currentSubtask.id ? array[index] = currentSubtask : array[index] = subtask)
            setValues({
                ...values,
                'subtasks': updatedSubtasks
            })
        }
        catch (err) {
            console.error(err)
        }
    }

    const subtaskFieldsHandler = async (e, currentSubtask) => {
        try {
            setSubtaskInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }))

            currentSubtask.name = e.target.value
            await updateSubtask(currentSubtask)

            const updatedSubtasks = values.subtasks
            updatedSubtasks.forEach((subtask, index, array) => subtask.id === currentSubtask.id ? array[index] = currentSubtask : array[index] = subtask)
            setValues({
                ...values,
                'subtasks': updatedSubtasks
            })
        }
        catch (err) {
            console.error(err)
        }
    }

    return (
        <div>
            <div style={{display: "flex", justifyContent: "right", width: '100%'}}>
                <IconButton onClick={() => addOrEditTask(values, resetForm)}>
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
                            name="name"
                            value={values.name}
                            onChange={handleInputChange}

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
                                name="isComplete"
                                type={"checkbox"}
                                checked={values.isComplete}
                                onChange={handleCheckboxChange}

                                color="default"
                                icon={<RadioButtonUncheckedIcon sx={{fontSize: '25px'}}/>}
                                checkedIcon={<CheckCircleIcon sx={{fontSize: '25px'}}/>}
                            />
                            <div>
                                <Tippy interactive={true} placement='bottom' content={
                                    <BlockPicker
                                        colors={defaultColors}
                                        color={values.highlightColor}
                                        onChange={(color) => handleColorChange(color.hex)}
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
                        name="time"
                        value={values.time}
                        onChange={handleInputChange}

                        margin={'normal'}
                        label="Время"
                        variant="outlined"
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            name="date"
                            value={values.date}
                            onChange={(date) => handleDateChange(date)}

                            label="Дата"
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        name="description"
                        value={values.description}
                        onChange={handleInputChange}

                        variant='outlined'
                        placeholder='Описание'
                        multiline={true}
                        rows={5}
                    />
                </Stack>
                <Stack sx={{width: '300px', marginLeft: '50px'}} mt={1} spacing={2}>
                    <Typography sx={{fontSize: 20}}>Подзадачи:</Typography>
                    {
                        <Reorder.Group onReorder={(newOrder) => handleReorderSubtasks(newOrder)} values={values.subtasks}>
                            {
                                values.subtasks.map(subtask =>
                                    <Reorder.Item key={subtask.id} value={subtask} className='add-task'>
                                        <TextField
                                            variant="standard"
                                            sx={{width: '80%'}}
                                            name={'field' + subtask.id}
                                            value={subtaskInputs['field' + subtask.id] || ''}
                                            onChange={(e) => subtaskFieldsHandler(e, subtask)}
                                        />
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <Checkbox
                                                checked={subtask.isComplete}
                                                color="default"
                                                icon={<RadioButtonUncheckedIcon/>}
                                                onChange={() => handleSubtaskCheckboxChange(subtask)}
                                                checkedIcon={<CheckCircleIcon/>}
                                            />
                                            <IconButton onClick={() => handleDeleteSubtask(subtask.id)}>
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
                            value={subtaskInput}
                            onChange={e => setSubtaskInput(e.target.value)}
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
                action={handleDelete}
            />
        </div>
    );
};

export default TaskForm;