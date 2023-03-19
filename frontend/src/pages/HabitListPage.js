import React, {useEffect, useState} from 'react'
import {Fab} from "@mui/material";
import {Menu} from "../components/Menu";
import AddIcon from '@mui/icons-material/Add';
import {createHabit, fetchHabits} from "../http/habitAPI";
import {addLocalHabit, loadHabits} from "../store/reducers/habitSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {HABITS_ROUTE} from "../utils/consts";
import Popup from "../components/modals/Popup";
import HabitForm from "../components/forms/HabitForm";
import styled from 'styled-components'
import {addDays, format} from "date-fns";

const N = 7

const HabitListPage = () => {

    const [openPopup, setOpenPopup] = useState(false)
    const [currentHabit, setCurrentHabit] = useState(false)
    const [today] = useState(new Date())

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

    const isDayChecked = (currentDay, days) => {
        for (let day of days) {
            if (day.date === currentDay) {
                return true
            }
        }
        return false
    }

    return (
        <div>
            <HabitListHeader>
                <Menu/>
                <HabitListHeaderText>Список привычек</HabitListHeaderText>
            </HabitListHeader>
            <PageContent>
                <Table>
                    <TableHeadings>
                        <tr>
                            <th></th>
                            {
                                [...Array(N)].map((e, i) => <th key={i}>{addDays(today, i).getDate()}</th>)
                            }
                        </tr>
                    </TableHeadings>
                    <TableContent>
                        {habits.map(habit =>
                            <tr key={habit.id}>
                                <td onClick={() => navigate(HABITS_ROUTE + '/' + habit.id)}>{habit.name}</td>
                                {
                                    [...Array(N)].map((e, i) => <td key={i}>
                                        <input
                                            type="checkbox"
                                            checked={isDayChecked(format(addDays(today, i), 'yyyy-MM-dd'), habit.habitDays)}
                                        />
                                    </td>)
                                }
                            </tr>
                        )}
                    </TableContent>
                </Table>
            </PageContent>
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

const HabitListHeader = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;
  background: white;
`

const HabitListHeaderText = styled.h1`
  font-size: 30px;
  font-weight: normal;
`

const PageContent = styled.div`
  display: flex;
  justify-content: center;
`

const Table = styled.table`
  font-size: 20px;
`

const TableHeadings = styled.thead`
  
`

const TableContent = styled.tbody`
  
`