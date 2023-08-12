import React, {useEffect, useState} from 'react'
import {Checkbox, Divider, IconButton} from "@mui/material"
import {Menu} from "../components/Menu.jsx"
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import {createTask, fetchTasks, updateTask} from "../http/taskAPI.js"
import {useDispatch, useSelector} from "react-redux"
import {addLocalTask, editLocalTask, loadTasks} from '../store/reducers/taskSlice.js'
import {addDays, format, startOfWeek} from 'date-fns'
import Popup from "../components/modals/Popup.jsx"
import TaskForm from "../components/forms/TaskForm.jsx"
import styled from 'styled-components'
import {addLocalDay, deleteLocalDay, loadHabits} from "../store/reducers/habitSlice.js"
import {addDay, deleteDay, fetchHabits} from "../http/habitAPI.js"
import {useNavigate} from "react-router-dom"
import {HABITS_ROUTE} from "../utils/consts.js"
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank.js";
import CheckBoxIcon from "@mui/icons-material/CheckBox.js";
import NotificationsIcon from "@mui/icons-material/Notifications.js";
import PersonIcon from "@mui/icons-material/Person.js";

const weekDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']

const CalendarPage = () => {

    const navigate = useNavigate()

    const tasks = useSelector((state) => state.task.tasks)
    const habits = useSelector((state) => state.habit.habits)
    const dispatch = useDispatch()

    const [today] = useState(new Date())
    const [currentMonday] = useState(startOfWeek(today, {weekStartsOn: 1}))
    const [weekIndex, setWeekIndex] = useState(0)
    const [taskInputs, setTaskInputs] = useState({})
    const [currentTask, setCurrentTask] = useState(null)
    const [openPopup, setOpenPopup] = useState(false)

    useEffect(() => {
        let startDate = format(addDays(currentMonday, weekIndex * 7), 'yyyy-MM-dd')
        let endDate = format(addDays(currentMonday, weekIndex * 7 + 6), 'yyyy-MM-dd')
        fetchTasks(null, startDate, endDate).then(taskList => {
            dispatch(loadTasks(taskList))
        })
    }, [weekIndex])

    useEffect(() => {
        fetchHabits().then(habitList => {
            dispatch(loadHabits(habitList))
        })
    }, [])

    const taskFieldsHandler = e => {
        setTaskInputs(prevState => ({...prevState, [e.target.name]: e.target.value}))
    }

    const openTask = (task) => {
        setCurrentTask(task)
        setOpenPopup(true)
    }

    const closeTask = () => {
        setCurrentTask(null)
        setOpenPopup(false)
    }

    const checkboxHandler = async (task) => {
        try {
            const newTask = {...task, isComplete: !task.isComplete}
            await updateTask(newTask)
            dispatch(editLocalTask(newTask))
        }
        catch (err) {
            console.error(err)
        }
    }

    const editTaskHandler = async (task) => {
        await updateTask(task)
        dispatch(editLocalTask(task))
    }

    const addQuickTask = async (e, dayIndex) => {
        try {
            if (taskInputs[e.target.name]) {
                const task = await createTask({
                    name: taskInputs[e.target.name],
                    time: '',
                    date: format(addDays(currentMonday, weekIndex * 7 + dayIndex), 'yyyy-MM-dd'),
                    description: '',
                    highlightColor: '',
                    isComplete: false,
                    subtasks: []
                })
                dispatch(addLocalTask(task))
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

    const formatDate = (dayIndex, formatString) => {
        return format(addDays(currentMonday, weekIndex * 7 + dayIndex), formatString)
    }

    const isToday = (dayIndex) => {
        return format(today, 'yyyy-MM-dd') === formatDate(dayIndex, 'yyyy-MM-dd')
    }

    const createOrDeleteHabitDay = async (habit, isChecked, dayIndex) => {
        if (isChecked) {
            const habitDay = await addDay({
                date: formatDate(dayIndex, 'yyyy-MM-dd'),
                habitId: habit.id
            })
            dispatch(addLocalDay(habitDay))
        }
        else {
            const habitDay = habit.habitDays.filter((day) => day.date === formatDate(dayIndex, 'yyyy-MM-dd'))
            if (habitDay.length === 1) {
                await deleteDay(habitDay[0].id)
                dispatch(deleteLocalDay(habitDay[0]))
            }
            else {
                console.error('No appropriate day!')
            }
        }
    }

    function dragStartHandler(e) {

    }

    function dragLeaveHandler(e) {
        
    }

    function dragEndHandler(e) {
        
    }

    function dragOverHandler(e) {
        e.preventDefault()
    }

    function dropHandler(e) {
        e.preventDefault()
    }

    return (
        <div>
            <CalendarHeader>
                <Menu/>
                <CalendarHeaderText>Календарь</CalendarHeaderText>
                <WeekSwitch>
                    <IconButton onClick={previousWeekHandler}>
                        <ChevronLeftIcon sx={{color: 'black'}}/>
                    </IconButton>
                    <CalendarHeaderMonth>{format(addDays(currentMonday, weekIndex * 7), 'MMMM')}</CalendarHeaderMonth>
                    <IconButton onClick={nextWeekHandler}>
                        <ChevronRightIcon sx={{color: 'black'}}/>
                    </IconButton>
                </WeekSwitch>
            </CalendarHeader>
            <CalendarDays>
                {weekDays.map((weekDay, dayIndex) =>
                    <DayBoard key={dayIndex}>
                        <DayBoardHeader>
                            <DayBoardWeekDay isHighlighted={isToday(dayIndex)}>{weekDay}</DayBoardWeekDay>
                            <DayBoardDate isHighlighted={isToday(dayIndex)}>
                                {formatDate(dayIndex, 'dd')}
                            </DayBoardDate>
                        </DayBoardHeader>
                        <Divider sx={{mt: 1, mb: 1}}/>
                        {habits.map(habit => (
                            <div key={habit.id}>
                                {
                                    habit.regularity[dayIndex] === '1'
                                        ?
                                        <DayBoardHabit>
                                            <Checkbox
                                                color="default"
                                                checked={habit.habitDays.filter(day => day.date === formatDate(dayIndex, 'yyyy-MM-dd')).length > 0}
                                                icon={<CheckBoxOutlineBlankIcon fontSize='small'/>}
                                                checkedIcon={<CheckBoxIcon fontSize='small'/>}
                                                onChange={(e) => createOrDeleteHabitDay(habit, e.target.checked, dayIndex)}
                                            />
                                            <DayBoardHabitName onClick={() => navigate(HABITS_ROUTE + '/' + habit.id)}>{habit.name}</DayBoardHabitName>
                                        </DayBoardHabit>
                                        :
                                        <DayBoardHabitIgnored onClick={() => navigate(HABITS_ROUTE + '/' + habit.id)}>
                                            <Checkbox
                                                disabled={true}
                                                color="default"
                                                icon={<CheckBoxOutlineBlankIcon fontSize='small'/>}
                                            />
                                            <DayBoardHabitName>{habit.name}</DayBoardHabitName>
                                        </DayBoardHabitIgnored>
                                }
                            </div>
                        ))}
                        <Divider sx={{mt: 2, mb: 2}}/>
                        <DayBoardTaskList>
                            <AddTaskField
                                name={'field' + dayIndex}
                                value={taskInputs['field' + dayIndex] || ''}
                                onChange={taskFieldsHandler}
                                onBlur={e => addQuickTask(e, dayIndex)}
                            />
                            {tasks.map((task) =>
                                formatDate(dayIndex, 'yyyy-MM-dd') === task.date
                                    ?
                                    (
                                        (task.id === 324 || task.id === 336)
                                            ?
                                            <DayBoardTaskBorder
                                                key={task.id}
                                                highlight={task.highlightColor}
                                            >
                                                <DayBoardTaskContent>
                                                    <DayBoardTaskTime>{task.time}</DayBoardTaskTime>
                                                    <DayBoardTaskName onClick={() => openTask(task)}>{task.name}</DayBoardTaskName>
                                                </DayBoardTaskContent>
                                                <DayBoardTaskStatusGroup>
                                                    <DayBoardTaskIndicators>
                                                        {
                                                            task.subtasks.length
                                                                ?
                                                                <DayBoardSubtaskCounter>
                                                                    {`${task.subtasks.reduce((accumulator, subtask) => accumulator + subtask.isComplete, 0)}/${task.subtasks.length}`}
                                                                </DayBoardSubtaskCounter>
                                                                :
                                                                <></>
                                                        }
                                                    </DayBoardTaskIndicators>
                                                    <Checkbox
                                                        checked={task.isComplete}
                                                        onChange={() => checkboxHandler(task)}
                                                        color="default"
                                                        icon={<RadioButtonUncheckedIcon fontSize='small'/>}
                                                        checkedIcon={<CheckCircleIcon fontSize='small'/>}
                                                    />
                                                </DayBoardTaskStatusGroup>
                                            </DayBoardTaskBorder>
                                            :
                                            <DayBoardTask
                                                draggable={true}
                                                onDragStart={e => dragStartHandler(e)}
                                                onDragLeave={e => dragLeaveHandler(e)}
                                                onDragEnd={e => dragEndHandler(e)}
                                                onDragOver={e => dragOverHandler(e)}
                                                onDrop={e => dropHandler(e)}
                                                key={task.id}
                                                highlight={task.highlightColor}
                                            >
                                                <DayBoardTaskContent>
                                                    <DayBoardTaskTime>{task.time}</DayBoardTaskTime>
                                                    <DayBoardTaskName onClick={() => openTask(task)}>{task.name}</DayBoardTaskName>
                                                </DayBoardTaskContent>
                                                <DayBoardTaskStatusGroup>
                                                    <DayBoardTaskIndicators>
                                                        {
                                                            task.subtasks.length
                                                                ?
                                                                <DayBoardSubtaskCounter>
                                                                    {`${task.subtasks.reduce((accumulator, subtask) => accumulator + subtask.isComplete, 0)}/${task.subtasks.length}`}
                                                                </DayBoardSubtaskCounter>
                                                                :
                                                                <></>
                                                        }
                                                        {
                                                            task.name === 'Составить отчёт' || task.name === 'Купить канцтовары' || task.name === 'Покормить кота' || task.name === 'Оформить заказ' || task.name === 'Приготовить ужин'
                                                            ?
                                                                <PersonIcon fontSize='20'/>
                                                                :
                                                                <div></div>
                                                        }
                                                        {/*{*/}
                                                        {/*    task.name === 'Переписать конспект' || task.name === 'Просмотр вакансий' || task.name === "Полить помидоры"*/}
                                                        {/*        ?*/}
                                                        {/*        <NotificationsIcon fontSize='20px'/>*/}
                                                        {/*        :*/}
                                                        {/*        <div></div>*/}
                                                        {/*}*/}
                                                    </DayBoardTaskIndicators>
                                                    <Checkbox
                                                        checked={task.isComplete}
                                                        onChange={() => checkboxHandler(task)}
                                                        color="default"
                                                        icon={<RadioButtonUncheckedIcon fontSize='small'/>}
                                                        checkedIcon={<CheckCircleIcon fontSize='small'/>}
                                                    />
                                                </DayBoardTaskStatusGroup>
                                            </DayBoardTask>
                                    )
                                    :
                                    <div key={task.id}></div>
                            )}
                        </DayBoardTaskList>
                    </DayBoard>
                )}
            </CalendarDays>
            <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <TaskForm
                    currentTask={currentTask}
                    saveTask={editTaskHandler}
                    closeTask={closeTask}
                />
            </Popup>
        </div>
    )
}

export default CalendarPage

const switchState = '1850px'

const CalendarHeader = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
  background: linear-gradient(90deg, rgb(0, 207, 241) 22%, rgba(213, 29, 253, 1) 78%);
  margin-bottom: 10px;
  
  @media (max-width: ${switchState}) {
    position: fixed;
    justify-content: center;
    opacity: 0.8;
  }
`

const CalendarHeaderText = styled.h1`
  font-size: 30px;
  font-weight: normal;

  @media (max-width: ${switchState}) {
    font-size: 20px;
  }
`

const CalendarHeaderMonth = styled.div`
  font-size: 25px;
  font-weight: normal;

  @media (max-width: ${switchState}) {
    font-size: 18px;
  }
`

const CalendarDays = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: row;
  margin-left: 10px;
  margin-right: 10px;
  
  @media (max-width: ${switchState}) {
    flex-direction: column;
    align-items: center;
  }
`

const DayBoard = styled.div`
  background: white;
  border: solid 1px #999;
  border-radius: 10px;
  margin: 10px;
  padding: 15px;
  width: 14%;
  min-width: 180px;
  max-width: 350px;
  min-height: 400px;
  
  @media (max-width: ${switchState}) {
    width: 80%;
    min-height: auto;
    max-width: 80%;
  }
`

const WeekSwitch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 250px;
`

const DayBoardHeader = styled.h2`
  display: flex;
  justify-content: space-between;
`

const DayBoardWeekDay = styled.div`
  font-weight: ${props => props.isHighlighted ? 'bold' : 'normal'};
  color: ${props => props.isHighlighted ? '#2196F3' : 'none'};
`

const DayBoardDate = styled.div`
  font-weight: ${props => props.isHighlighted ? 'bold' : 'normal'};
  color: ${props => props.isHighlighted ? '#2196F3' : 'none'};
`

const DayBoardTaskList = styled.div`
  display: flex;
  flex-direction: column;
`

const AddTaskField = styled.input`
  border: none;
  outline: none;
  padding: 10px;
  font-size: 15px;
  border-bottom: #ddd solid 1px;
  margin-bottom: 10px;
  box-shadow: 1px 2px 6px #aaa;
  border-radius: 15px;
`

const DayBoardTask = styled.div`
  font-size: 15px;
  margin-top: 5px;
  margin-bottom: 10px;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  box-shadow: 1px 2px 6px #aaa;
  cursor: grabbing;
  background-color: ${props => (props.highlight) ? props.highlight : 'white'};
`

const DayBoardTaskContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const DayBoardTaskTime = styled.div`
  font-size: 11px;
  color: black;
`

const DayBoardTaskName = styled.div`
  font-size: 15px;
  //white-space: nowrap;
  //text-overflow: ellipsis;
  overflow: hidden;
  //width: 110px;
  cursor: pointer;
`

const DayBoardSubtaskCounter = styled.div`
  font-size: 12px;
  margin-left: 3px;
`

const DayBoardTaskStatusGroup = styled.div`
  display: flex;
  align-items: center;
`

const DayBoardTaskIndicators = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`

const DayBoardHabit = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 5px;
`

const DayBoardHabitIgnored = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  opacity: 0.3;
`

const DayBoardHabitName = styled.div`
  font-size: 18px;
`

const DayBoardTaskBorder = styled.div`
  font-size: 15px;
  margin-top: 5px;
  margin-bottom: 10px;
  width: 100%;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  box-shadow: 1px 2px 6px #aaa;
  border: solid #ff30b7 2px;
  background-color: ${props => (props.highlight) ? props.highlight : 'white'};
`