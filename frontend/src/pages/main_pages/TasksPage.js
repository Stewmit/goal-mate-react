import React, {useState} from 'react'
import './CalendarPage.css'
import TaskModal from "../../components/modals/Popup";
import {Checkbox, Chip, Container, Fab, Paper, Typography} from "@mui/material";
import {Menu} from "../../components/Menu";
import './TasksPage.css'
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from '@mui/icons-material/Add';

const TasksPage = () => {

    const [openTaskModal, setOpenTaskModal] = useState(false)
    let taskList = [
        {id: 1, name: 'Подстричь газон', date: '06.11.2022'},
        {id: 2, name: 'Погулять с собакой', time: '6:00', date: '18.11.2022', highlight: '#89f5ba'},
        {id: 3, name: 'Сделать лабораторную'},
        {id: 4, name: 'Созвон', time: '13:45', date: '08.11.2022'},
        {id: 5, name: 'Наколоть дров', time: '10:00', date: '11.11.2022', highlight: '#89f5ba'},
        {id: 6, name: 'Прогулка', time: '6:00', date: '07.11.2022', highlight: '#defa55'},
        {id: 7, name: 'Выступление', time: '15:00', date: '08.11.2022'},
        {id: 8, name: 'Подготовиться к экзамену'},
    ]

    return (
        <div>
            <div className='header'>
                <Menu/>
                <Typography variant='h4'>Список задач</Typography>
            </div>
            <Container className='task-list__list'>
                {taskList.map(task =>
                    <Paper elevation={3} className='task-list__task' style={{backgroundColor: task.highlight}}>
                        <div className='board__task-content'>
                            <div className='board__task-time'>{task.time}</div>
                            <div className='board__task-name'>{task.name}</div>
                        </div>
                        <div>
                            <Chip label={task.date} variant="outlined" />
                            <Checkbox
                                color="default"
                                icon={<RadioButtonUncheckedIcon/>}
                                checkedIcon={<CheckCircleIcon/>}
                            />
                        </div>
                    </Paper>
                )}
            </Container>
            <Fab color="primary" sx={{left: '170vh', marginTop: '70px'}} onClick={() => setOpenTaskModal(true)}>
                <AddIcon />
            </Fab>
            <TaskModal open={openTaskModal} closeHandler={() => setOpenTaskModal(false)} />
        </div>
    )
}

export default TasksPage