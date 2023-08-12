import React, {useEffect, useState} from 'react'
import {Fab, IconButton} from "@mui/material"
import {Menu} from "../components/Menu.jsx"
import AddIcon from '@mui/icons-material/Add'
import {createHabit, fetchHabits} from "../http/habitAPI.js"
import {addLocalHabit, loadHabits} from "../store/reducers/habitSlice.js"
import {useDispatch, useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {HABITS_ROUTE} from "../utils/consts.js"
import Popup from "../components/modals/Popup.jsx"
import HabitForm from "../components/forms/HabitForm.jsx"
import styled from 'styled-components'
import {addDays, format} from "date-fns"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import RemoveIcon from '@mui/icons-material/Remove'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

const N = 7

const HabitListPage = () => {

    const [openPopup, setOpenPopup] = useState(false)
    const [currentHabit, setCurrentHabit] = useState(null)
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

    return (
        <div>
            <HabitListHeader>
                <Menu/>
                <HabitListHeaderText>Привычки</HabitListHeaderText>
            </HabitListHeader>
            <PageContent>
                <ControlPanel>
                    <IconButton>
                        <ChevronLeftIcon fontSize={'large'} style={{color: 'black'}} />
                    </IconButton>
                    <IconButton>
                        <ChevronRightIcon fontSize={'large'} style={{color: 'black'}} />
                    </IconButton>
                </ControlPanel>
                <Table>
                    <div style={{display: 'flex', justifyContent: 'left'}}>
                        <Line>
                            <TableData>
                                <ImageBox/>
                            </TableData>
                            {
                                [...Array(N)].map((e, i) => <TableHeader key={i}>{addDays(today, -i).getDate()}</TableHeader>)
                            }
                        </Line>
                    </div>
                    {habits.map(habit =>
                        <div style={{display: 'flex', justifyContent: 'left'}}>
                            <Line key={habit.id}>
                                <TableData onClick={() => navigate(HABITS_ROUTE + '/' + habit.id)} style={{cursor: 'pointer'}}>
                                    {
                                        habit.name === 'Чтение'
                                            ?
                                            <HabitGoalImage src={'https://cdnn1.img.sputnik.az/img/07e5/05/13/426992652_512:0:2560:2048_1920x0_80_0_0_57cf099d1f69ca1ae66d807976aeb110.jpg'} />
                                            :
                                            (
                                                habit.name === 'Тренировка' || habit.name === 'Пробежка'
                                                    ?
                                                    <HabitGoalImage src={'https://sportishka.com/uploads/posts/2022-11/1667451365_12-sportishka-com-p-uspekh-v-sporte-krasivo-12.jpg'} />
                                                    :
                                                    (
                                                        habit.name === 'Английский'
                                                            ?
                                                            <HabitGoalImage src={'https://thumbs.dreamstime.com/b/language-school-adult-kids-english-courses-class-language-school-adult-kids-english-courses-class-141377421.jpg'} />
                                                            :
                                                            (
                                                                habit.name === 'Слепая печать'
                                                                    ?
                                                                    <HabitGoalImage src={'https://static.news.bitcoin.com/wp-content/uploads/2018/06/bchgeek-1392x1392.jpg'} />
                                                                    :
                                                                    <ImageBox/>
                                                            )
                                                    )
                                            )
                                    }
                                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'start'}}>
                                        <div style={{fontSize: '24px'}}>{habit.name}</div>
                                        <div style={{fontSize: '16px'}}>some text</div>
                                    </div>
                                </TableData>
                                {
                                    [...Array(N)].map((e, index) => <div key={index}>
                                        {/*<ArrowDownwardIcon fontSize={'large'} style={{ color: '#d40268' }} />*/}
                                        {/*<ArrowUpwardIcon fontSize={'large'} style={{ color: '#02D46E' }} />*/}
                                        <RemoveIcon fontSize={'large'} />

                                    </div>)
                                }
                            </Line>
                        </div>
                    )}
                </Table>
            </PageContent>
            <Fab color="primary" sx={{
                margin: 0,
                top: 'auto',
                right: 20,
                bottom: 20,
                left: 'auto',
                position: 'fixed',
                background: 'linear-gradient(90deg, rgba(0,219,255,1) 16%, rgba(213,29,253,1) 84%)'
            }} onClick={() => setOpenPopup(true)}>
                <AddIcon />
            </Fab>
            <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <HabitForm
                    currentHabit={currentHabit}
                    saveHabit={addHabit}
                    closeHabit={closeHabit}
                />
            </Popup>
        </div>
    )
}

export default HabitListPage

const HabitListHeader = styled.header`
  margin-left: 25px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  width: 225px;
  gap: 10px;
  background: linear-gradient(90deg, rgb(0, 207, 241) 22%, rgba(213, 29, 253, 1) 78%);
  border-radius: 30px;
`

const HabitListHeaderText = styled.h1`
  font-size: 30px;
  font-weight: normal;
  color: white;
`

const PageContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ControlPanel = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 1450px;
  justify-content: space-between;
  align-items: center;
`

const Table = styled.table`
  font-size: 20px;
  width: 80%;
  border: black solid 2px;
  border-radius: 10px;
  text-align: center;
  padding-left: 15px;
  padding-right: 20px;
`

const Line = styled.tr`
  display: flex;
  justify-content: left;
  align-items: center;
  height: 70px;
  width: 100%;
  gap: 100px;
`

const TableHeader = styled.th`
  font-size: 24px;
  padding-left: 3px;
  padding-right: 4px;
`

const TableData = styled.td`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 15px;
  padding: 10px;
  width: 350px;
  margin-left: 80px;
`

const HabitGoalImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 30px;
  border: black solid 2px;
  margin-bottom: 5px;
`

const ImageBox = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 30px;
`