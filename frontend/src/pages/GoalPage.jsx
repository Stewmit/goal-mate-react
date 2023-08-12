import React, {useEffect, useState} from 'react'
import {Checkbox, Chip, Container, Fab, Paper, Typography} from "@mui/material"
import {Menu} from "../components/Menu.jsx"
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import AddIcon from '@mui/icons-material/Add'
import styled from "styled-components";
import Popup from "../components/modals/Popup.jsx";
import GoalForm from "../components/forms/GoalForm.jsx";
import { createGoal, fetchGoals, updateGoal } from '../http/goalAPI.js'
import { useDispatch, useSelector } from 'react-redux'
import {addLocalGoal, editLocalGoal, loadGoals} from "../store/reducers/goalSlice.js"

const GoalPage = () => {

    const [openPopup, setOpenPopup] = useState(false)
    const [currentGoal, setCurrentGoal] = useState(null)

    const goals = useSelector(state => state.goal.goals)
    const dispatch = useDispatch()

    useEffect(() => {
        fetchGoals().then(data => {
            dispatch(loadGoals(data))
        })
    }, [])

    const openGoal = (goal) => {
        setCurrentGoal(goal)
        setOpenPopup(true)
    }

    const closeGoal = () => {
        setCurrentGoal(null)
        setOpenPopup(false)
    }

    const addOrEditGoal = async (goal) => {
        try {
            const formData = new FormData()
            formData.append('name', goal.name)
            formData.append('category', goal.category)
            formData.append('img', goal.img)
            formData.append('dueDate', goal.dueDate)
            formData.append('description', goal.description)
            formData.append('isComplete', false)
            
            if (goal.id === 0) {
                const data = await createGoal(formData)
                dispatch(addLocalGoal(data))
            }
            else {
                await updateGoal(goal)
                dispatch(editLocalGoal(goal))
            }
        }
        catch (err) {
            alert(err)
        }
    }

    return (
        <div>
            <GoalPageHeader>
                <Menu/>
                <GoalPageHeaderText>Цели</GoalPageHeaderText>
            </GoalPageHeader>
            <GoalList>
                {goals.map((goal, index) =>
                    <Goal key={index}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            {/* <img src={goal.image} alt="img" style={{width: '180px', height: '180px', borderRadius: '20px'}} /> */}
                            <div style={{marginLeft: '30px'}}>
                                <div style={{fontSize: '28px', fontWeight: 'bold'}} onClick={() => openGoal(goal)}>{goal.name}</div>
                                <div style={{fontSize: '18px'}}>{goal.category}</div>
                            </div>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            {/* <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                <div>
                                    {'Задачи: ' + goal.tasks}
                                </div>
                                <div>
                                    {'Привычки: ' + goal.habits}
                                </div>
                            </div> */}
                            {
                                goal.dueDate
                                    ?
                                    <Chip label={'Срок: ' + goal.dueDate} sx={{marginLeft: '40px', fontSize: '15px'}} variant="outlined" />
                                    :
                                    <div/>
                            }

                            <Checkbox
                                sx={{marginLeft: '20px'}}
                                color="default"
                                icon={<RadioButtonUncheckedIcon fontSize={'large'}/>}
                                checkedIcon={<CheckCircleIcon fontSize={'large'}/>}
                            />
                        </div>
                    </Goal>
                )}
            </GoalList>
            <Fab color="primary" sx={{
                margin: 0,
                top: 'auto',
                right: 20,
                bottom: 20,
                left: 'auto',
                position: 'fixed',
                background: 'linear-gradient(90deg, rgba(0,219,255,1) 16%, rgba(213,29,253,1) 84%)'
            }}
            onClick={() => setOpenPopup(true)}>
                <AddIcon />
            </Fab>
            <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <GoalForm
                    currentGoal={currentGoal}
                    saveGoal={addOrEditGoal}
                    closeGoal={closeGoal}
                />
            </Popup>
        </div>
    )
}

export default GoalPage

const GoalPageHeader = styled.header`
  margin-left: 25px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 150px;
  background: linear-gradient(90deg, rgb(0, 207, 241) 22%, rgba(213, 29, 253, 1) 78%);
  border-radius: 30px;
`

const GoalPageHeaderText = styled.h1`
  font-size: 30px;
  font-weight: normal;
  color: white;
`

const GoalList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin: 20px 110px 0 100px;
`

const Goal = styled.div`
  display: flex;
  border-radius: 30px;
  justify-content: space-between;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  padding-right: 20px;
  width: 95%;
`