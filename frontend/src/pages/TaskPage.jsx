import React, {useEffect, useState} from 'react'
import {Checkbox, Chip, Divider, Fab, ToggleButton, ToggleButtonGroup} from "@mui/material"
import {Menu} from "../components/Menu.jsx"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import AddIcon from '@mui/icons-material/Add'
import {useDispatch, useSelector} from "react-redux"
import styled from 'styled-components'
import {createTask, fetchTasks, updateTask} from "../http/taskAPI.js"
import TaskForm from "../components/forms/TaskForm.jsx"
import Popup from "../components/modals/Popup.jsx"
import {addLocalTask, editLocalTask, loadTasks} from "../store/reducers/taskSlice.js"
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'
import PersonIcon from '@mui/icons-material/Person'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import { useTask } from '../hooks/useTask.js'

const TaskPage = () => {

    const [currentTask, setCurrentTask] = useState(null)
    const [openPopup, setOpenPopup] = useState(false)

    const [sortingType, setSortingType] = useState('id');

    const dispatch = useDispatch()
    const tasks = useSelector(state => state.task.tasks)

    useEffect(() => {
        fetchTasks(sortingType).then(data => {
            dispatch(loadTasks(data))
        })
    }, [sortingType])

    const openTask = (task) => {
        setCurrentTask(task)
        setOpenPopup(true)
    }

    const closeTask = () => {
        setCurrentTask(null)
        setOpenPopup(false)
    }

    const checkboxHandler = async (task, checked) => {
        try {
            const newTask = {...task, isComplete: checked}
            await updateTask(newTask)
            dispatch(editLocalTask(newTask))
        }
        catch (err) {
            alert(err)
        }
    }

    const addOrEditTask = async (task) => {
        try {
            if (task.id === 0) {
                const data = await createTask(task)
                dispatch(addLocalTask(data))
            }
            else {
                await updateTask(task)
                dispatch(editLocalTask(task))
            }
        }
        catch (err) {
            alert(err)
        }
    }

    const buttonGroupChangeHandler = (e, value) => {
        setSortingType(value)
    }

    return (
        <div style={{display: 'flex'}}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'start',
                gap: '3px'
            }}>
                <TaskPageHeader>
                    <Menu/>
                    <div style={{
                        display: 'flex',
                        justifyContent: "center"
                    }}>
                        <TaskPageHeaderText>Задачи</TaskPageHeaderText>
                    </div>
                </TaskPageHeader>
                <SettingsBox>
                    <div style={{marginBottom: '15px', fontSize: "21px", fontWeight: 'bold'}}>Настройки</div>
                    <div style={{display: 'flex', alignItems: 'start', flexDirection: 'column'}}>
                        <div style={{marginBottom: '10px', marginLeft: '10px', fontSize: "18px"}}>Сортировка</div>
                        <ToggleButtonGroup
                            value={sortingType}
                            exclusive
                            onChange={buttonGroupChangeHandler}
                            size={"small"}
                            sx={{ml: 1}}
                        >
                            <ToggleButton
                                sx={{textTransform: 'capitalize', height: '45px', width: '110px'}}
                                value="id"
                            >
                                По Новизне
                            </ToggleButton>
                            <ToggleButton
                                sx={{textTransform: 'capitalize', height: '45px', width: '80px'}}
                                value='date'
                            >
                                По Дате
                            </ToggleButton>
                            <ToggleButton
                                sx={{textTransform: 'capitalize', height: '45px', width: '110px'}}
                                value='name'
                            >
                                По Алфавиту
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <div style={{fontSize: "18px", marginLeft: '10px', marginTop: '20px'}}>Отображение</div>
                        <div style={{display: 'flex', alignItems: 'center', marginLeft: '10px'}}>
                            <Checkbox
                                color="default"
                                checked={true}
                                icon={<CheckBoxOutlineBlankIcon fontSize='small'/>}
                                checkedIcon={<CheckBoxIcon fontSize='small'/>}
                            />
                            <div style={{fontSize: "16px"}}>Завершенные</div>
                        </div>
                        <Divider sx={{mt: '5px', mb: '5px', width: '100%'}}/>
                        <div style={{display: 'flex', alignItems: 'center', marginLeft: '10px'}}>
                            <Checkbox
                                color="default"
                                checked={true}
                                icon={<RadioButtonCheckedIcon fontSize='small'/>}
                                checkedIcon={<RadioButtonCheckedIcon fontSize='small'/>}
                            />
                            <div style={{fontSize: "16px"}}>Все</div>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', marginLeft: '10px'}}>
                            <Checkbox
                                color="default"
                                checked={false}
                                icon={<RadioButtonUncheckedIcon fontSize='small'/>}
                                checkedIcon={<CheckBoxIcon fontSize='small'/>}
                            />
                            <div style={{fontSize: "16px"}}>Запланированные</div>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', marginLeft: '10px'}}>
                            <Checkbox
                                color="default"
                                checked={false}
                                icon={<RadioButtonUncheckedIcon fontSize='small'/>}
                                checkedIcon={<CheckBoxIcon fontSize='small'/>}
                            />
                            <div style={{fontSize: "16px"}}>Делегированные</div>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', marginLeft: '10px'}}>
                            <Checkbox
                                color="default"
                                checked={false}
                                icon={<RadioButtonUncheckedIcon fontSize='small'/>}
                                checkedIcon={<CheckBoxIcon fontSize='small'/>}
                            />
                            <div style={{fontSize: "16px"}}>Назначенные мне</div>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center', marginLeft: '10px'}}>
                            <Checkbox
                                color="default"
                                checked={false}
                                icon={<RadioButtonUncheckedIcon fontSize='small'/>}
                                checkedIcon={<CheckBoxIcon fontSize='small'/>}
                            />
                            <div style={{fontSize: "16px"}}>Ведущие к цели</div>
                        </div>
                    </div>
                </SettingsBox>
            </div>
            <TaskList>
                {tasks.map(task =>
                    <div style={{alignItems: "center", display: 'flex', justifyContent: 'left', gap: '20px'}}>
                        {
                            task.name === 'Забронировать путёвку'
                            ?
                                <GoalImage src={'https://sun6-21.userapi.com/s/v1/if1/DKmw3rJQZWXcOJapXtQrnCDz9EZ5vK-SVvki0MDrjM18TXKLH70qVxoJUSYpC-tFLbw87cwu.jpg?size=768x768&quality=96&crop=252,0,768,768&ava=1'}/>
                                :
                                (
                                    task.name === 'Провести исследовательскую работу'
                                        ?
                                        <GoalImage src={'http://www.hrpayrolloutsourcing.com/wp-content/uploads/2015/08/mis-hyderabad-1.png'}/>
                                        :
                                        <EmptyGoalImage/>
                                )
                        }
                        <Task key={task.id} highlight={task.highlightColor} onClick={() => openTask(task)}>
                            <TaskContent>
                                <TaskTime>{task.time}</TaskTime>
                                <TaskName>{task.name}</TaskName>
                            </TaskContent>
                            <TaskStatus>
                                {
                                    task.subtasks.length
                                        ?
                                        <div>{`${task.subtasks.reduce((accumulator, subtask) => accumulator + subtask.isComplete, 0)}/${task.subtasks.length}`}</div>
                                        :
                                        <></>
                                }
                                {
                                    task.date
                                        ?
                                        <Chip label={task.date}/>
                                        :
                                        <></>
                                }
                                <div>
                                    {
                                        task.name === 'Проанализировать результаты проекта' || task.name === 'Составить контент-план' || task.name === 'Покормить кошку'
                                            ?
                                            <Checkbox
                                                color="default"
                                                icon={<PersonIcon/>}
                                            />
                                            :
                                            <></>
                                    }

                                    <Checkbox
                                        color="default"
                                        checked={task.isComplete}
                                        icon={<RadioButtonUncheckedIcon/>}
                                        checkedIcon={<CheckCircleIcon/>}
                                        onChange={(event, checked) => checkboxHandler(task, checked)}
                                    />
                                </div>
                            </TaskStatus>
                        </Task>
                    </div>
                )}
            </TaskList>
            <Fab color="primary" sx={{
                margin: 0,
                top: 'auto',
                right: 20,
                bottom: 20,
                left: 'auto',
                position: 'fixed',
                background: 'linear-gradient(90deg, rgba(0,219,255,1) 16%, rgba(213,29,253,1) 84%)'
            }} onClick={() => setOpenPopup(true)}>
                <AddIcon />
            </Fab>
            <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <TaskForm
                    currentTask={currentTask}
                    saveTask={addOrEditTask}
                    closeTask={closeTask}
                />
            </Popup>
        </div>
    )
}

export default TaskPage

const TaskPageHeader = styled.header`
  margin-left: 25px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 180px;
  background: linear-gradient(90deg, rgb(0, 207, 241) 22%, rgba(213, 29, 253, 1) 78%);
  border-radius: 30px;
`

const TaskPageHeaderText = styled.h1`
  font-size: 30px;
  font-weight: normal;
  color: white;
`

const TaskList = styled.ul`
  margin-top: 90px;
  display: flex;
  flex-direction: column;
  gap: 25px;
  justify-content: start;
  align-items: center;
  width: 100%;
`

const SettingsBox = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-left: 25px;
  margin-top: 20px;
  padding: 10px;
  border-radius: 10px;
  border: solid #404040 1px;
`

const GoalImage = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  border: black solid 2px;
`

const EmptyGoalImage = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`

const Task = styled.div`
  padding: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 15px;
  box-shadow: 1px 2px 6px #aaa;
  background-color: ${props => (props.highlight) ? props.highlight : 'white'};
  cursor: pointer;
  user-select: none;
  height: 65px;
  width: 1200px;
`

const TaskContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 10px;
  width: 60%;
`

const TaskTime = styled.div`
  font-size: 12px;
`

const TaskName = styled.div`
  font-size: 18px;
  cursor: pointer;
  white-space: nowrap;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`

const TaskStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`