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
import AddIcon from '@mui/icons-material/Add';
import PersonIcon from "@mui/icons-material/Person.js";
import NotificationsIcon from "@mui/icons-material/Notifications.js";

const weekDays = ['ПН']

const MyDay = () => {

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

    const addQuickTask = async e => {
        try {
            if (taskInputs[e.target.name]) {
                const task = await createTask({
                    name: taskInputs[e.target.name],
                    time: '',
                    date: format(today, 'yyyy-MM-dd'),
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

    const createOrDeleteHabitDay = async (habit, isChecked) => {
        if (isChecked) {
            const habitDay = await addDay({
                date: format(today, 'yyyy-MM-dd'),
                habitId: habit.id
            })
            dispatch(addLocalDay(habitDay))
        }
        else {
            const habitDay = habit.habitDays.filter((day) => day.date === format(today, 'yyyy-MM-dd'))
            if (habitDay.length === 1) {
                await deleteDay(habitDay[0].id)
                dispatch(deleteLocalDay(habitDay[0]))
            }
            else {
                console.error('No appropriate day!')
            }
        }
    }

    const getTodayDate = () => {
        if (today.getDay() === 0) {
            return 6
        }
        else {
            return today.getDay() - 1
        }
    }

    return (
        <div>
            <MyDayHeader>
                <Menu/>
                <CalendarHeaderText>Мой день</CalendarHeaderText>
            </MyDayHeader>
            <TodayBoard>
                <TodayTitle>
                    <TodayText>
                        Дела на сегодня
                    </TodayText>
                    <TodayDate>
                        ПТ: 19.05.2023
                    </TodayDate>
                </TodayTitle>
                <TodayBlocks>
                    <TaskBoard>
                        <TaskTitle>Задачи</TaskTitle>
                        <TaskList>
                            <TaskLine>
                                <AddTaskField
                                    name={'task-field'}
                                    value={taskInputs['task-field'] || ''}
                                    onChange={taskFieldsHandler}
                                    onBlur={addQuickTask}
                                />
                                <IconButton sx={{boxShadow: '1px 2px 6px #aaa'}}>
                                    <AddIcon fontSize={'large'}/>
                                </IconButton>
                            </TaskLine>
                            {tasks.map((task) =>
                                format(today, 'yyyy-MM-dd') === task.date
                                    ?
                                    <TaskLine>
                                        <Task highlight={task.highlightColor}>
                                            <TaskContent>
                                                <TaskTime>{task.time}</TaskTime>
                                                <TaskName onClick={() => openTask(task)}>{task.name}</TaskName>
                                            </TaskContent>
                                            <TaskStatusGroup>
                                                {
                                                    task.subtasks.length
                                                        ?
                                                        <SubtaskCounter>
                                                            {`${task.subtasks.reduce((accumulator, subtask) => accumulator + subtask.isComplete, 0)}/${task.subtasks.length}`}
                                                        </SubtaskCounter>
                                                        :
                                                        <></>
                                                }
                                                {
                                                    task.name === 'Разработать прототип'
                                                        ?
                                                        <PersonIcon/>
                                                        :
                                                        <></>
                                                }
                                                <Checkbox
                                                    checked={task.isComplete}
                                                    onChange={() => checkboxHandler(task)}
                                                    color="default"
                                                    icon={<RadioButtonUncheckedIcon/>}
                                                    checkedIcon={<CheckCircleIcon/>}
                                                />
                                            </TaskStatusGroup>
                                        </Task>
                                        {
                                            task.name === 'Пройти урок по инвестициям'
                                                ?
                                                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                                    <Arrow src={'https://img.icons8.com/?size=512&id=11759&format=png'} alt={'arrow'}/>
                                                    <GoalIcon src="https://www.marxist.com/images/stories/economy/Money_-_Pictures_of_Money--Flickr_flickr.com--photos--pictures-of-money--17123251389.jpg" alt="goal"/>
                                                </div>
                                                :
                                                <></>
                                        }
                                        {
                                            task.name === 'Поиск ниши' || task.name === 'Провести конкурентный анализ' || task.name === 'Составить контент-план'
                                                ?
                                                <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                                    <Arrow src={'https://img.icons8.com/?size=512&id=11759&format=png'} alt={'arrow'}/>
                                                    <GoalIcon src="https://andreykirillov.art/wp-content/uploads/2020/08/blog.jpg" alt="goal"/>
                                                </div>
                                                :
                                                <></>
                                        }
                                    </TaskLine>
                                    :
                                    <div key={task.id}></div>
                            )}
                        </TaskList>
                    </TaskBoard>
                    <HabitBoard>
                        <HabitTitle>Привычки</HabitTitle>
                        <HabitListWrapping>
                            <HabitList>
                                {habits.map(habit => (
                                    <div key={habit.id}>
                                        {
                                            habit.regularity[getTodayDate()] === '1'
                                                ?
                                                <Habit>
                                                    {
                                                        (habit.name === 'Английский')
                                                            ?
                                                            <HabitGoalImage src="https://thumbs.dreamstime.com/b/language-school-adult-kids-english-courses-class-language-school-adult-kids-english-courses-class-141377421.jpg" />
                                                            :
                                                            (
                                                            (habit.name === 'Тренировка' || habit.name === 'Диета')
                                                                ?
                                                                <HabitGoalImage src="https://fb.ru/media/i/5/5/6/4/2/9/i/556429.jpg" />
                                                                :
                                                                <ImageBox/>
                                                            )
                                                    }

                                                    <Checkbox
                                                        color="default"
                                                        checked={habit.habitDays.filter(day => day.date === format(today, 'yyyy-MM-dd')).length > 0}
                                                        icon={<CheckBoxOutlineBlankIcon fontSize='small'/>}
                                                        checkedIcon={<CheckBoxIcon fontSize='small'/>}
                                                        onChange={(e) => createOrDeleteHabitDay(habit, e.target.checked)}
                                                    />
                                                    <div style={{display: 'flex', flexDirection: 'column'}}>
                                                        <HabitName onClick={() => navigate(HABITS_ROUTE + '/' + habit.id)}>{habit.name}</HabitName>
                                                        {
                                                            habit.name === 'Чтение'
                                                                ?
                                                                <HabitUnit onClick={() => navigate(HABITS_ROUTE + '/' + habit.id)}>(10 стр)</HabitUnit>
                                                                :
                                                                <></>
                                                        }
                                                        {
                                                            habit.name === 'Слепая печать'
                                                                ?
                                                                <HabitUnit onClick={() => navigate(HABITS_ROUTE + '/' + habit.id)}>(30 мин)</HabitUnit>
                                                                :
                                                                <></>
                                                        }
                                                    </div>
                                                </Habit>
                                                :
                                                <div></div>
                                        }
                                        <Divider/>
                                    </div>
                                ))
                                }
                            </HabitList>
                        </HabitListWrapping>
                    </HabitBoard>
                </TodayBlocks>
            </TodayBoard>
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

export default MyDay

const switchState = '1850px'

const MyDayHeader = styled.header`
  margin-left: 25px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  width: 220px;
  gap: 10px;
  background: linear-gradient(90deg, rgb(0, 207, 241) 22%, rgba(213, 29, 253, 1) 78%);
  border-radius: 30px;
`

const CalendarHeaderText = styled.h1`
  font-size: 30px;
  font-weight: normal;
  color: white;

  @media (max-width: ${switchState}) {
    font-size: 20px;
  }
`

const TodayBoard = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-content: center;
  width: 100%;
`

const TodayTitle = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`

const TodayText = styled.div`
  font-size: 35px;
  font-weight: bold;
`

const TodayDate = styled.div`
  font-size: 30px;
  text-decoration: underline;
`

const TodayBlocks = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: center;
  gap: 30px;
`

const TaskBoard = styled.div`
  background: white;
  box-shadow: 1px 2px 6px #aaa;
  width: 45%;
  padding-bottom: 20px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TaskTitle = styled.div`
  margin-top: 20px;
  font-size: 28px;
`

const AddTaskField = styled.input`
  border: none;
  outline: none;
  padding: 15px;
  font-size: 15px;
  border-bottom: #ddd solid 1px;
  width: 50%;
  box-shadow: 1px 2px 6px #aaa;
  border-radius: 15px;
`

const TaskList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const TaskLine = styled.div`
  display: flex;
  justify-content: start;
  gap: 15px;
  align-items: center;
  width: 750px;
  margin-top: 25px;
`

const Task = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: ${props => (props.highlight) ? props.highlight : 'white'};
  border-radius: 15px;
  box-shadow: 1px 2px 6px #aaa;
  padding: 10px 10px 10px 15px;
  width: 80%;
`

const TaskContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const TaskTime = styled.div`
  font-size: 12px;
  color: black;
`

const TaskName = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  cursor: pointer;
  font-size: 18px;
`

const SubtaskCounter = styled.div`
  font-size: 13px;
`

const TaskStatusGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

const Arrow = styled.img`
  width: 50px;
  margin-left: 5px;
`

const GoalIcon = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 100px;
  border: black solid 2px;
  margin-left: 5px;
`

const HabitBoard = styled.div`
  background: white;
  box-shadow: 1px 2px 6px #aaa;
  width: 19%;
  height: 700px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HabitTitle = styled.div`
  margin-top: 20px;
  font-size: 28px;
`

const HabitListWrapping = styled.div`
  display: flex;
  justify-content: center;
  width: 80%;
`

const HabitList = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 20px;
`

const Habit = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: left;
  align-items: center;
  gap: 5px;
  margin-top: 10px;
  width: 260px;
`

const HabitName = styled.div`
  font-size: 20px;
`

const HabitUnit = styled.div`
  margin-left: 5px;
  font-size: 16px;
`

const HabitGoalImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 30px;
  border: black solid 2px;
  margin-bottom: 5px;
`

const ImageBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 30px;
`