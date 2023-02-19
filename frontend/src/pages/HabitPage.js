import React, {useEffect, useState} from 'react';
import {fetchOneHabit} from "../http/habitAPI";
import {useParams} from "react-router-dom";

const HabitPage = () => {

    const [habit, setHabit] = useState({})

    const { id } = useParams()

    useEffect(() => {
        fetchOneHabit(id).then(data => setHabit(data))
    }, [])

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
        </div>
    );
};

export default HabitPage;