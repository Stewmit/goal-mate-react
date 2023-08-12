import React, {useEffect, useState} from 'react'
import {deleteHabit, fetchOneHabit} from "../http/habitAPI.js"
import {useNavigate, useParams} from "react-router-dom"
import {
    Button,
    Checkbox,
    FormControl,
    IconButton,
    InputLabel, MenuItem, Select,
    TextField,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material"
import {HABITS_ROUTE} from "../utils/consts.js"
import styled from "styled-components";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank.js";
import CheckBoxIcon from "@mui/icons-material/CheckBox.js";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {format} from "date-fns";
import {useForm} from "../hooks/useForm.js";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft.js";
import DeleteIcon from '@mui/icons-material/Delete';
import Chart from "react-apexcharts";

const initialValues = {
    id: 0,
    name: '',
    regularity: '',
    endDate: null,
    target: '',
    unit: '',
    description: ''
}

const HabitPage = () => {

    const [habit, setHabit] = useState({})
    const { id } = useParams()

    const [days, setDays] = useState(() => ['1a', '1b', '1c', '1d', '1e', '1f', '1g'])
    const [goal, setGoal] = useState('')

    const [name, setName] = useState(null)
    const [date, setDate] = useState(null)

    const habitForm = useForm(initialValues)

    const navigate = useNavigate()

    const lineChartData = {
        labels: ["October", "November", "December"],
        datasets: [
            {
                data: [8137119, 9431691, 10266674],
                label: "Infected",
                borderColor: "#3333ff",
                fill: true,
                lineTension: 0.5
            },
            // {
            //     data: [1216410, 1371390, 1477380],
            //     label: "Deaths",
            //     borderColor: "#ff3333",
            //     backgroundColor: "rgba(255, 0, 0, 0.5)",
            //     fill: true,
            //     lineTension: 0.5
            // }
        ]
    };

    useEffect(() => {
        fetchOneHabit(id).then(data => setHabit(data))
    }, [])

    const handleDelete = async (id) => {
        await deleteHabit(id)
        navigate(HABITS_ROUTE)
    }

    return (
        <div style={{display: 'flex'}}>
            <InfoBody>
                <HabitPageHeader>
                    <Checkbox
                        color="default"
                        checked={true}
                        icon={<KeyboardBackspaceIcon fontSize='large' style={{ color: 'white' }} />}
                        checkedIcon={<KeyboardBackspaceIcon fontSize='large' style={{ color: 'white' }} />}
                    />
                    <div style={{
                        display: 'flex',
                        justifyContent: "center"
                    }}>
                        <HabitPageHeaderText>К списку</HabitPageHeaderText>
                    </div>
                </HabitPageHeader>
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <HabitBox>
                        <TextField
                            style={{width: '70%'}}
                            label='Название'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <UnitLine>
                            <TextField
                                style={{width: '100%'}}
                                label='Объём'
                                value={habit.target}
                                onChange={(e) => habitForm.handleChange('target', e.target.value)}
                            />
                            <TextField
                                style={{width: '100%'}}
                                label='Единица измерения'
                                value={habit.unit}
                                onChange={(e) => habitForm.handleChange('unit', e.target.value)}
                            />
                        </UnitLine>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label='Дата окончания'
                                value={date}
                                onChange={(date) => setDate(format(date, 'yyyy-MM-dd'))}
                                renderInput={(params) => <TextField style={{width: '70%'}} {...params} />}
                            />
                        </LocalizationProvider>
                        <PickerLine>
                            <ToggleButtonGroup
                                value={days}
                            >
                                <ToggleButton sx={{width: '40px', height: '40px'}} value="1a" >
                                    <div>ПН</div>
                                </ToggleButton>
                                <ToggleButton sx={{width: '40px', height: '40px'}} value="1b">
                                    <div>ВТ</div>
                                </ToggleButton>
                                <ToggleButton sx={{width: '40px', height: '40px'}} value="1c">
                                    <div>СР</div>
                                </ToggleButton>
                                <ToggleButton sx={{width: '40px', height: '40px'}} value="1d">
                                    <div>ЧТ</div>
                                </ToggleButton>
                                <ToggleButton sx={{width: '40px', height: '40px'}} value="1e">
                                    <div>ПТ</div>
                                </ToggleButton>
                                <ToggleButton sx={{width: '40px', height: '40px'}} value="1f">
                                    <div>СБ</div>
                                </ToggleButton>
                                <ToggleButton sx={{width: '40px', height: '40px'}} value="1g">
                                    <div>ВС</div>
                                </ToggleButton>
                            </ToggleButtonGroup>
                            <FormControl fullWidth>
                                <InputLabel>Цель</InputLabel>
                                <Select
                                    sx={{width: '100%', height: '50px', display: 'flex', alignItems: 'center'}}
                                    value={goal}
                                    label="Цель"
                                    onChange={(e) => setGoal(e.target.value)}
                                >
                                    <MenuItem value={10}>Нет</MenuItem>
                                </Select>
                            </FormControl>
                        </PickerLine>
                        <TextField
                            style={{width: '70%'}}
                            label='Описание'
                            value={habitForm.inputs.description}
                            onChange={(e) => habitForm.handleChange('description', e.target.value)}
                            multiline={true}
                            rows={7}
                        />
                        <div style={{display: 'flex', gap: '20px', width: '70%', justifyContent: "center"}}>
                            <SubmitButton style={{width: '100%'}} variant='outlined'>Применить</SubmitButton>
                            <IconButton>
                                <DeleteIcon />
                            </IconButton>
                        </div>

                    </HabitBox>
                </div>
            </InfoBody>
            <ChartBody>
                <HabitStatBox>
                    <div style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'start', paddingLeft: '30px', gap: '10px', marginBottom: '40px', marginTop: '10px'}}>
                        <div style={{fontSize: '20px', display: 'flex', gap: '10px'}}>
                            <div>Общее количество дней:</div>
                            <div>129</div>
                        </div>
                        <div style={{fontSize: '20px', display: 'flex', gap: '10px'}}>
                            <div>Дней подряд:</div>
                            <div>5</div>
                        </div>
                    </div>
                    <Chart
                        options={
                            {
                                chart: {
                                    id: "basic-bar"
                                },
                                xaxis: {
                                    categories: ['Октябрь 2022', 'Ноябрь 2022', 'Декабрь 2022', 'Январь 2023', 'Февраль 2023', 'Март 2023', 'Апрель 2023', 'Май 2023']
                                }
                            }
                        }
                        series={[
                            {
                                name: "series-1",
                                data: [14, 10, 20, 24, 5, 19, 27, 10]
                            }
                        ]}
                        type="bar"
                        width="900px"
                    />
                </HabitStatBox>
            </ChartBody>
        </div>
    )
}

export default HabitPage

const HabitBox = styled.div`
  padding-top: 40px;
  padding-bottom: 40px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  width: 750px;
  height: 800px;
  box-shadow: 1px 2px 6px #aaa;
  border-radius: 20px;
`

const HabitStatBox = styled.div`
  padding-top: 40px;
  padding-bottom: 40px;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: 40px;
  width: 95%;
  height: 800px;
  box-shadow: 1px 2px 6px #aaa;
  border-radius: 20px;
`

const PickerLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 70%;
`

const UnitLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  width: 70%;
`

const SubmitButton = styled.button`
  margin-top: 10px;
  padding: 15px 45px;
  font-size: 1em;
  width: 250px;
  height: 50px;
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
  margin-bottom: 10px;

  &:hover {
    background-position: right center;
    color: #fff;
    text-decoration: none;
  }
`

const InfoBody = styled.header`
  height: 100vh;
  width: 50%;
`

const ChartBody = styled.header`
  height: 100vh;
  width: 50%;
`

const HabitPageHeader = styled.header`
  margin-left: 25px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  width: 205px;
  gap: 10px;
  background: linear-gradient(90deg, rgb(0, 207, 241) 22%, rgba(213, 29, 253, 1) 78%);
  border-radius: 30px;
`

const HabitPageHeaderText = styled.h1`
  font-size: 30px;
  font-weight: normal;
  color: white;
`