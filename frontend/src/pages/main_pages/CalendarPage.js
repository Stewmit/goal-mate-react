import React, {useEffect, useState} from 'react'
import {Box, Checkbox, Divider, IconButton, Paper, Stack, TextField, Typography} from "@mui/material";
import './CalendarPage.css'
import {Menu} from "../../components/Menu";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import {createTask, fetchTasks} from "../../http/taskAPI";
import {useDispatch, useSelector} from "react-redux";
import {ADD_TASK_ACTION, LOAD_TASKS_ACTION, UPDATE_TASK_ACTION} from "../../utils/consts";
import {addDays, format, startOfWeek} from 'date-fns'
import Popup from "../../components/modals/Popup";
import TaskForm from "../../components/forms/TaskForm";

const CalendarPage = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        fetchTasks(null).then(data => {
            dispatch({type: LOAD_TASKS_ACTION, payload: data})
        })
    }, [dispatch])

    const currentMonday = startOfWeek(new Date(), {weekStartsOn: 1})
    const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

    const taskList = useSelector(state => state.tasks.taskList)

    const [weekIndex, setWeekIndex] = useState(0)
    const [currentTask, setCurrentTask] = useState(null)
    const [openPopup, setOpenPopup] = useState(false)
    const [taskInputs, setTaskInputs] = useState({})

    const taskFieldsHandler = e => {
        setTaskInputs(prevState => ({ ...prevState, [e.target.name]: e.target.value }))
    }

    const checkboxHandler = (task, checked) => {
        dispatch({type: UPDATE_TASK_ACTION, payload: {...task, isComplete: checked}})
    }

    const openTaskHandler = (task) => {
        setCurrentTask(task)
        setOpenPopup(true)
    }

    const addTaskHandler = (e, date) => {
        const currentName = taskInputs[e.target.name]
        if (!currentName) {
            return
        }
        createTask({name: currentName, date})
            .then(data => {
                dispatch({type: ADD_TASK_ACTION, payload: data})
            })
            .catch(err => {
                alert(err)
            })
        setTaskInputs(prevState => ({ ...prevState, [e.target.name]: '' }))
    }

    const closeTaskHandler = () => setOpenPopup(false)

    const previousWeekHandler = () => {
        setWeekIndex(weekIndex - 1)
    }

    const nextWeekHandler = () => {
        setWeekIndex(weekIndex + 1)
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
                    <Typography width={120} textAlign={'center'} variant='h5'>{format(addDays(currentMonday, weekIndex * 7), 'MMMM')}</Typography>
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
                            <Typography variant='h5'>{format(addDays(currentMonday, weekIndex * 7 + dayIndex), 'dd')}</Typography>
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
                                    onBlur={e => addTaskHandler(e, format(addDays(currentMonday, weekIndex * 7 + dayIndex), 'yyyy-MM-dd'))}
                                    onChange={taskFieldsHandler}
                                    // 2. onKeyDown={addTask} ||||| if (e.key === 'Enter')
                                    variant="standard"
                                />
                            </div>
                            {taskList.map((task) =>
                                format(addDays(currentMonday, weekIndex * 7 + dayIndex), 'yyyy-MM-dd') === task.date
                                    ?
                                    <Paper
                                        key={task.id}
                                        elevation={1}
                                        className='board__task'
                                        sx={{background: task.highlightColor}}
                                    >
                                        <div className='board__task-content'>
                                            <div className='board__task-time' style={{color: 'white'}}>{task.time}</div>
                                            <div className='board__task-name' style={{cursor: 'pointer'}} onClick={() => openTaskHandler(task)}>{task.name}</div>
                                        </div>
                                        <Checkbox
                                            checked={task.isComplete}
                                            onChange={(event, checked) => checkboxHandler(task, checked)}
                                            color="default"
                                            icon={<RadioButtonUncheckedIcon/>}
                                            checkedIcon={<CheckCircleIcon/>}
                                        />
                                    </Paper>
                                    :
                                    <div key={task.id}></div>
                            )}
                        </div>
                    </Paper>
                )}
            </div>
            <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <TaskForm
                    closeTaskHandler={closeTaskHandler}
                    currentTask={currentTask}
                />
            </Popup>
        </div>
    )
}

export default CalendarPage