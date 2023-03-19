import React, {useEffect, useState} from 'react'
import {deleteHabit, fetchOneHabit} from "../http/habitAPI.js"
import {useNavigate, useParams} from "react-router-dom"
import {Button} from "@mui/material"
import {HABITS_ROUTE} from "../utils/consts.js"

const HabitPage = () => {

    const [habit, setHabit] = useState({})
    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {
        fetchOneHabit(id).then(data => setHabit(data))
    }, [])

    const handleDelete = async (id) => {
        await deleteHabit(id)
        navigate(HABITS_ROUTE)
    }

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{fontSize: '18px'}}>
                Stats:
            </div>
            <div>
                {`Name: ${habit.name}`}
            </div>
            <div>
                {`Regularity: ${habit.regularity}`}
            </div>
            <div>
                {`Start Date: ${habit.startDate}`}
            </div>
            <div>
                {`End Date: ${habit.endDate ? habit.endDate : 'Not stated'}`}
            </div>
            <div>
                {`Target: ${habit.target ? habit.target : 'Not stated'} ${habit.unit ? habit.unit : ''}`}
            </div>
            <div>
                {`Description: ${habit.description ? habit.description : 'Not stated'}`}
            </div>
            <div>
                {`Total: ${habit.habitDays?.length}`}
            </div>
            <div>
                {habit.habitDays?.map(habit => <div key={habit.id}>{habit.date}</div>)}
            </div>
            <Button variant='outlined' color='secondary' onClick={() => handleDelete(habit.id)}>Delete</Button>
        </div>
    )
}

export default HabitPage