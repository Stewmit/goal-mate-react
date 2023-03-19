import React, {useEffect, useState} from 'react'
import {Checkbox, Chip, Fab, ToggleButton, ToggleButtonGroup} from "@mui/material"
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
        <div>
            <TaskPageHeader>
                <Menu/>
                <TaskPageHeaderText>Список задач</TaskPageHeaderText>
            </TaskPageHeader>
            <ToggleButtonGroup
                value={sortingType}
                exclusive
                onChange={buttonGroupChangeHandler}
                size={"small"}
                sx={{ml: 1}}
            >
                <ToggleButton
                    sx={{textTransform: 'capitalize'}}
                    value="id"
                >
                    По новизне
                </ToggleButton>
                <ToggleButton
                    sx={{textTransform: 'capitalize'}}
                    value='date'
                >
                    По дате
                </ToggleButton>
                <ToggleButton
                    sx={{textTransform: 'capitalize'}}
                    value='time'
                >
                    По времени
                </ToggleButton>
            </ToggleButtonGroup>
            <TaskList>
                {tasks.map(task =>
                    <Task key={task.id} highlight={task.highlightColor} onDoubleClick={() => openTask(task)}>
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
                            <Checkbox
                                color="default"
                                checked={task.isComplete}
                                icon={<RadioButtonUncheckedIcon/>}
                                checkedIcon={<CheckCircleIcon/>}
                                onChange={(event, checked) => checkboxHandler(task, checked)}
                            />
                        </TaskStatus>
                    </Task>
                )}
            </TaskList>
            <Fab color="primary" sx={{
                margin: 0,
                top: 'auto',
                right: 20,
                bottom: 20,
                left: 'auto',
                position: 'fixed',
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
  display: flex;
  align-items: center;
  gap: 10px;
`

const TaskPageHeaderText = styled.h1`
  font-size: 30px;
  font-weight: normal;
`

const TaskList = styled.ul`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
  align-items: center;
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
  width: 60%;
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