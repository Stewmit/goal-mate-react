import React, {useEffect, useState} from 'react'
import {Box, Checkbox, Divider, IconButton, Paper, Stack, TextField, Typography} from "@mui/material";
import './CalendarPage.css'
import {Menu} from "../../components/Menu";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import {createTask, fetchTasks, updateTask} from "../../http/taskAPI";
import {useDispatch, useSelector} from "react-redux";
import {ADD_TASK_ACTION, LOAD_TASKS_ACTION, UPDATE_TASK_ACTION} from "../../utils/consts";
import {addDays, format, startOfWeek} from 'date-fns'
import Popup from "../../components/modals/Popup";
import TaskForm from "../../components/forms/TaskForm";
import {Reorder} from "framer-motion";

const CalendarPage = () => {

    const dispatch = useDispatch()
    const taskList = useSelector(state => state.tasks.taskList)

    useEffect(() => {
        fetchTasks().then(data => {
            dispatch({type: LOAD_TASKS_ACTION, payload: data})
        })
    }, [dispatch])

    const currentMonday = startOfWeek(new Date(), {weekStartsOn: 1})
    const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

    const [weekIndex, setWeekIndex] = useState(0)
    const [currentTask, setCurrentTask] = useState(null)
    const [openPopup, setOpenPopup] = useState(false)
    const [taskInputs, setTaskInputs] = useState({})

    const taskFieldsHandler = e => {
        setTaskInputs(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    const checkboxHandler = async (task, checked) => {
        const newTask = {...task, isComplete: checked}
        dispatch({type: UPDATE_TASK_ACTION, payload: newTask})
        await updateTask(newTask)
    }

    const openTask = (task) => {
        setCurrentTask(task)
        setOpenPopup(true)
    }

    const closeTask = (resetForm) => {
        resetForm()
        setCurrentTask(null)
        setOpenPopup(false)
    }

    const addOrEditTask = async (task, resetForm) => {
        try {
            if (task.id === 0) {
                const data = await createTask(task)
                dispatch({type: ADD_TASK_ACTION, payload: data})
            } else {
                await updateTask(task)
                dispatch({type: UPDATE_TASK_ACTION, payload: task})
            }
        } catch (err) {
            console.error(err)
        }
        closeTask(resetForm)
    }

    const addQuickTask = async (e, dayIndex) => {
        try {
            if (e.target.name) {
                const task = await createTask({
                    name: taskInputs[e.target.name],
                    time: '',
                    date: format(addDays(currentMonday, weekIndex * 7 + dayIndex), 'yyyy-MM-dd'),
                    description: '',
                    highlightColor: '',
                    isComplete: false,
                })
                dispatch({type: ADD_TASK_ACTION, payload: task})
            }
        } catch (err) {
            console.error(err)
        }
        setTaskInputs(prevState => ({...prevState, [e.target.name]: ''}))
    }

    const previousWeekHandler = () => {
        setWeekIndex(weekIndex - 1)
    }

    const nextWeekHandler = () => {
        setWeekIndex(weekIndex + 1)
    }

    const handleReorderTasks = (tasks) => {
        // dispatch({type: LOAD_TASKS_ACTION, payload: tasks})
    }

    return (
        <div>
            <div className='calendar-header'>
                <Menu/>
                <Typography variant='h4'>Календарь</Typography>
                <Stack direction='row' spacing={1}
                       style={{display: 'flex', alignItems: 'center'}}
                >
                    <IconButton onClick={previousWeekHandler}>
                        <ChevronLeftIcon sx={{color: 'black'}}/>
                    </IconButton>
                    <Typography width={120} textAlign={'center'}
                                variant='h5'>{format(addDays(currentMonday, weekIndex * 7), 'MMMM')}</Typography>
                    <IconButton onClick={nextWeekHandler}>
                        <ChevronRightIcon sx={{color: 'black'}}/>
                    </IconButton>
                </Stack>
            </div>
            <div className='week'>
                {weekDays.map((weekDay, dayIndex) =>
                    <Paper elevation={3} className='board' key={dayIndex}>
                        <Box
                            className='board__header'
                            sx={{backgroundColor: format(new Date(), 'yyyy-MM-dd') === format(addDays(currentMonday, weekIndex * 7 + dayIndex), 'yyyy-MM-dd') ? 'lime' : 'none'}}
                        >
                            <Typography variant='h5'>{weekDay}</Typography>
                            <Typography
                                variant='h5'>{format(addDays(currentMonday, weekIndex * 7 + dayIndex), 'dd')}</Typography>
                        </Box>
                        <Divider sx={{mt: 1, mb: 1}}/>
                        <div className='board__habit-list'>
                            habits
                        </div>
                        <Divider sx={{mt: 2, mb: 2}}/>

                        <div className='board__task-list'>
                            <div className='board__add-task' style={{marginBottom: 15}}>
                                <TextField
                                    name={'field' + dayIndex}
                                    value={taskInputs['field' + dayIndex] || ''}
                                    onChange={taskFieldsHandler}
                                    onBlur={e => addQuickTask(e, dayIndex)}
                                    // 2. onKeyDown={addTask} ||||| if (e.key === 'Enter')
                                    variant="standard"
                                />
                            </div>
                            <Reorder.Group onReorder={(newOrder) => handleReorderTasks(newOrder)} values={taskList}>
                                {taskList.map((task) =>
                                    format(addDays(currentMonday, weekIndex * 7 + dayIndex), 'yyyy-MM-dd') === task.date
                                        ?
                                        <Reorder.Item key={task.id} value={task} className='add-task'>
                                            <Paper
                                                key={task.id}
                                                elevation={1}
                                                className='board__task'
                                                sx={{background: task.highlightColor}}
                                            >
                                                <div className='board__task-content'>
                                                    <div className='board__task-time'
                                                         style={{color: 'black'}}>{task.time}</div>
                                                    <div className='board__task-name' style={{cursor: 'pointer'}}
                                                         onClick={() => openTask(task)}>{task.name}</div>
                                                </div>
                                                <div style={{display: "flex", alignItems: "center"}}>
                                                    {
                                                        task.subtasks.length
                                                            ?
                                                            <div
                                                                className='board__task-time'
                                                                style={{color: 'black'}}
                                                            >
                                                                {`${task.subtasks.reduce((accumulator, subtask) => accumulator + subtask.isComplete, 0)}/${task.subtasks.length}`}
                                                            </div>
                                                            :
                                                            <></>
                                                    }
                                                    <Checkbox
                                                        checked={task.isComplete}
                                                        onChange={(event, checked) => checkboxHandler(task, checked)}
                                                        color="default"
                                                        icon={<RadioButtonUncheckedIcon/>}
                                                        checkedIcon={<CheckCircleIcon/>}
                                                    />
                                                </div>
                                            </Paper>
                                        </Reorder.Item>
                                        :
                                        <div key={task.id}></div>
                                )}
                            </Reorder.Group>
                        </div>
                    </Paper>
                )}
            </div>
            <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <TaskForm
                    currentTask={currentTask}
                    addOrEditTask={addOrEditTask}
                    closeTask={closeTask}
                />
            </Popup>
        </div>
    )
}

export default CalendarPage