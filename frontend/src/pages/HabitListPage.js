import React, {useEffect, useState} from 'react'
import {Container, Fab, Paper, Typography} from "@mui/material";
import {Menu} from "../components/Menu";
import AddIcon from '@mui/icons-material/Add';
import {createHabit, fetchHabits} from "../http/habitAPI";
import {addLocalHabit, loadHabits} from "../store/reducers/habitSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {HABITS_ROUTE} from "../utils/consts";
import Popup from "../components/modals/Popup";
import HabitForm from "../components/forms/HabitForm";

const HabitListPage = () => {

    const [openPopup, setOpenPopup] = useState(false)
    const [currentHabit, setCurrentHabit] = useState(false)

    const dispatch = useDispatch()
    const habits = useSelector((state) => state.habit.habits)
    const navigate = useNavigate()

    useEffect(() => {
        fetchHabits().then(habitList => {
            dispatch(loadHabits(habitList))
        })
    }, [])

    const addHabit = async (habit) => {
        try {
            const data = await createHabit(habit)
            dispatch(addLocalHabit(data))
        }
        catch (err) {
            alert(err)
        }
    }

    const closeHabit = () => {
        setCurrentHabit(null)
        setOpenPopup(false)
    }

    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                <Menu/>
                <Typography variant='h4'>Список привычек</Typography>
            </div>
            <Container sx={{display: 'flex', gap: 5, mt: 3}}>
                {habits.map(habit =>
                    <Paper key={habit.id} elevation={3} style={{backgroundColor: habit.highlight, padding: 10}}>
                        <div style={{cursor: "pointer"}} onClick={() => navigate(HABITS_ROUTE + '/' + habit.id)}>{habit.name}</div>
                    </Paper>
                )}
            </Container>
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
                <HabitForm
                    currentHabit={currentHabit}
                    addHabit={addHabit}
                    closeHabit={closeHabit}
                />
            </Popup>
        </div>
    )
}

export default HabitListPage