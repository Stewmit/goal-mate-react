import React, {useState} from 'react'
import HabitModal from "../components/modals/HabitModal";
import {Checkbox, Chip, Container, Fab, Paper, Typography} from "@mui/material";
import {Menu} from "../components/Menu";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from '@mui/icons-material/Add';

const HabitListPage = () => {

    const [openHabitModal, setOpenHabitModal] = useState(false)

    let habitList = [
        {id: 1, name: 'Чтение', regularity: '0101010', endDate: '06.12.2022'},
        {id: 2, name: 'Английский', regularity: '1111111'},
        {id: 3, name: 'Тренировка', regularity: '1111111'},
        {id: 4, name: 'Пить воду', regularity: '1111111', endDate: '14.12.2022'},
        {id: 5, name: 'Слепая печать', regularity: '1111111'},
    ]

    return (
        <div>
            <div className='header'>
                <Menu/>
                <Typography variant='h4'>Список привычек</Typography>
            </div>
            <Container className='task-list__list'>
                {habitList.map(habit =>
                    <Paper elevation={3} className='task-list__task' style={{backgroundColor: habit.highlight}}>
                        <div className='board__task-content'>
                            <div className='board__task-time'>{habit.time}</div>
                            <div className='board__task-name'>{habit.name}</div>
                        </div>
                        <div>
                            <Chip label={'конец: ' + habit.endDate} variant="outlined" />
                            <Checkbox
                                color="default"
                                icon={<RadioButtonUncheckedIcon/>}
                                checkedIcon={<CheckCircleIcon/>}
                            />
                        </div>
                    </Paper>
                )}
            </Container>
            <Fab color="primary" sx={{left: '170vh', marginTop: '70px'}} onClick={() => setOpenHabitModal(true)}>
                <AddIcon />
            </Fab>
            <HabitModal open={openHabitModal} closeHandler={() => setOpenHabitModal(false)} />
        </div>
    )
}

export default HabitListPage