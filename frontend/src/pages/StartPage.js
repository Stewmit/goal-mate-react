import React, {useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import {CALENDAR_ROUTE, REGISTRATION_ROUTE} from "../utils/consts";
import {useSelector} from "react-redux";
import styled from 'styled-components'
import FlagIcon from '@mui/icons-material/Flag';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import TimelineIcon from '@mui/icons-material/Timeline';
import PeopleIcon from '@mui/icons-material/People';
import ShareIcon from '@mui/icons-material/Share';
import ChatIcon from '@mui/icons-material/Chat';
import background from '../assets/background.png'

const StartPage = () => {

    const isAuth = useSelector(state => state.user.isAuth)
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuth) {
            navigate(CALENDAR_ROUTE)
        }
    }, [])

    return (
        <PageBody>
            <MainTitle>Организуйте свои задачи</MainTitle>
            <BenefitList>
                <Benefit>
                    <FlagIcon/>
                    <div>Ставьте цели</div>
                </Benefit>
                <Benefit>
                    <TaskAltIcon/>
                    <div>Управляйте задачами</div>
                </Benefit>
                <Benefit>
                    <TimelineIcon/>
                    <div>Отслеживайте привычки</div>
                </Benefit>
                <Benefit>
                    <PeopleIcon/>
                    <div>Делегируйте задачи</div>
                </Benefit>
                <Benefit>
                    <ShareIcon/>
                    <div>Делитесь результатами</div>
                </Benefit>
                <Benefit>
                    <ChatIcon/>
                    <div>Общайтесь</div>
                </Benefit>
            </BenefitList>
            <StartButton onClick={() => navigate(REGISTRATION_ROUTE)}>Начать</StartButton>
        </PageBody>
    )
}

export default StartPage

const PageBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 20px;
  background-image: url('${background}');
  background-repeat: no-repeat;
  background-size: cover;
`

const MainTitle = styled.h1`
  font-size: 3em;
  font-weight: bold;
  color: #111;
  text-align: center;
`

const BenefitList = styled.ul`
  margin-top: 100px;
  list-style-type: none;
`

const Benefit = styled.li`
  margin-top: 15px;
  display: flex;
  gap: 10px;
  font-weight: 500;
`

const StartButton = styled.button`
  margin-top: 100px;
  font-size: 1em;
  width: 250px;
  height: 60px;
  border: none;
  border-radius: 10px;
  background-color: lightsteelblue;
  cursor: pointer;
  font-weight: 500;
`