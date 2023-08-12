import React, {useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import {CALENDAR_ROUTE, REGISTRATION_ROUTE} from "../utils/consts.js"
import {useSelector} from "react-redux"
import styled from 'styled-components'
import FlagIcon from '@mui/icons-material/Flag'
import TaskAltIcon from '@mui/icons-material/TaskAlt'
import TimelineIcon from '@mui/icons-material/Timeline'
import PeopleIcon from '@mui/icons-material/People'
import ShareIcon from '@mui/icons-material/Share'
import ChatIcon from '@mui/icons-material/Chat'
import logo from '/logo_filled.png'
import image from '../assets/start_image.jpg'

const StartPage = () => {

    const isAuth = useSelector(state => state.user.isAuth)
    const navigate = useNavigate()

    useEffect(() => {
        if (isAuth) {
            navigate(CALENDAR_ROUTE)
        }
    }, [])

    return (
        <PageContent>
            <Header>
                <HeaderLogo src={logo}/>
                <HeaderTitle>GoalMate</HeaderTitle>
            </Header>
            <Body>
                <BodyBenefitGroup>
                    <BodyTitle>Мечтай!</BodyTitle>
                    <BodyTitle>Планируй!</BodyTitle>
                    <BodyTitle>Добивайся!</BodyTitle>
                    <BenefitList>
                        <Benefit>
                            <FlagIcon/>
                            <div>Ставь цели</div>
                        </Benefit>
                        <Benefit>
                            <TaskAltIcon/>
                            <div>Управляй задачами</div>
                        </Benefit>
                        <Benefit>
                            <TimelineIcon/>
                            <div>Отслеживай привычки</div>
                        </Benefit>
                        <Benefit>
                            <PeopleIcon/>
                            <div>Делегируй задачи</div>
                        </Benefit>
                        <Benefit>
                            <ShareIcon/>
                            <div>Делись результатами</div>
                        </Benefit>
                    </BenefitList>
                    <StartButton onClick={() => navigate(REGISTRATION_ROUTE)}>Начать</StartButton>
                </BodyBenefitGroup>
                <StartImage src={image}/>
            </Body>
        </PageContent>
    )
}

export default StartPage

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 25px;
`

const Header = styled.header`
  margin-top: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
`

const HeaderLogo = styled.img`
  width: 90px;
`

const HeaderTitle = styled.h1`
  font-size: 3em;
  font-weight: bold;
  color: #111;
  text-align: center;
`

const Body = styled.div`
  margin-top: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8%;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 20px;
  }
`

const BodyBenefitGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const BodyTitle = styled.h2`
  font-size: 1.9em;
  font-weight: 600;
  color: #111;
`

const BenefitList = styled.ul`
  margin-top: 25px;
  list-style-type: none;
`

const Benefit = styled.li`
  margin-top: 12px;
  display: flex;
  gap: 10px;
  align-items: center;
  font-weight: 500;
`

const StartImage = styled.img`
  width: 30%;
  max-width: 700px;
  min-width: 400px;
`

const StartButton = styled.button`
  margin-top: 40px;
  padding: 15px 45px;
  font-size: 1em;
  width: 250px;
  height: 60px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 500;
  background-image: linear-gradient(to right, #fc00ff 0%, #00dbde  51%, #fc00ff  100%);
  text-transform: uppercase;
  transition: 0.5s;
  background-size: 200% auto;
  color: white;
  box-shadow: 0 0 20px #eee;
  display: block;

  &:hover {
    background-position: right center;
    color: #fff;
    text-decoration: none;
  }
`