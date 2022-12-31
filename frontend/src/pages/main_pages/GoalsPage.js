import React, {useState} from 'react'
import './CalendarPage.css'
import TaskModal from "../../components/modals/TaskModal";
import {Box, Checkbox, Chip, Container, Fab, IconButton, Paper, Stack, Typography} from "@mui/material";
import {Menu} from "../../components/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import './TasksPage.css'
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from '@mui/icons-material/Add';
import GoalModal from "../../components/modals/GoalModal";

const GoalsPage = () => {

    const [openGoalModal, setOpenGoalModal] = useState(false)

    let imgs = [
        'https://www.marxist.com/images/stories/economy/Money_-_Pictures_of_Money--Flickr_flickr.com--photos--pictures-of-money--17123251389.jpg',
        'https://cdn2.tu-tu.ru/image/pagetree_node_data/1/04fa707168061610e0d219a9c6ed83ef/',
        'https://thumbs.dreamstime.com/b/language-school-adult-kids-english-courses-class-language-school-adult-kids-english-courses-class-141377421.jpg',
        'https://andreykirillov.art/wp-content/uploads/2020/08/blog.jpg'
    ]

    let goalList = [
        {id: 1, name: 'Удвоить доход', category: 'Финансы', tasks: '3/5', habits: '2', dueDate: '02.02.2023'},
        {id: 2, name: 'Слетать в Тунис', category: 'Путешествия', tasks: '1/4', habits: '0', dueDate: '07.06.2023'},
        {id: 3, name: 'Прокачать английский', category: 'Образование', tasks: '0/0', habits: '1'},
        {id: 4, name: 'Завести блог', category: 'Досуг', tasks: '3/5', habits: '3', dueDate: '15.05.2023'},
    ]

    return (
        <div>
            <div className='header'>
                <Menu/>
                <Typography variant='h4'>Список целей</Typography>
            </div>
            <Container className='task-list__list'>
                {goalList.map((goal, index) =>
                    <Paper elevation={3} className='task-list__task' style={{backgroundColor: goal.highlight}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <img src={imgs[index]} alt="img" style={{width: '200px', height: '200px', borderRadius: '20px'}} />
                            <div style={{marginLeft: '30px'}}>
                                <Typography variant={'h5'}>{goal.name}</Typography>
                                <Typography>{goal.category}</Typography>
                            </div>
                        </div>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                <div>
                                    {'Задачи: ' + goal.tasks}
                                </div>
                                <div>
                                    {'Привычки: ' + goal.habits}
                                </div>
                            </div>
                            <Chip label={'Срок: ' + goal.dueDate} sx={{marginLeft: '40px'}} variant="outlined" />
                            <Checkbox
                                color="default"
                                icon={<RadioButtonUncheckedIcon/>}
                                checkedIcon={<CheckCircleIcon/>}
                            />
                        </div>
                    </Paper>
                )}
            </Container>
            <Fab color="primary" sx={{left: '170vh', marginTop: '70px'}} onClick={() => setOpenGoalModal(true)}>
                <AddIcon />
            </Fab>
            <GoalModal open={openGoalModal} closeHandler={() => setOpenGoalModal(false)} />
        </div>
    )
}

export default GoalsPage