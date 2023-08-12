import {useState} from "react";
import styled from 'styled-components'
import {
    Button, FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    ToggleButton,
    ToggleButtonGroup
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import {useForm} from "../../hooks/useForm.js"
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns"
import {DatePicker} from "@mui/x-date-pickers/DatePicker"
import {format} from "date-fns"
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider"

const initialValues = {
    id: 0,
    name: '',
    regularity: '',
    endDate: null,
    target: '',
    unit: '',
    description: ''
}

const HabitForm = (props) => {

    const {saveHabit, closeHabit} = props

    const [days, setDays] = useState(() => ['1a', '1b', '1c', '1d', '1e', '1f', '1g'])
    const [goal, setGoal] = useState('')

    const habitForm = useForm(initialValues)

    const handleSubmit = () => {
        saveHabit({...habitForm.inputs})
        handleExit()
    }

    const handleExit = () => {
        habitForm.resetForm()
        closeHabit()
    }

    const handleDays = (event, newDays) => {
        setDays(newDays)
        let dayString = ''
        for (let newDay of newDays) {
            dayString += newDay[0]
        }
        habitForm.handleChange('regularity', dayString)
        console.log(dayString)
    }

    return (
        <div>
            <div style={{display: "flex", justifyContent: "right", width: '100%'}}>
                <IconButton onClick={handleExit}>
                    <CloseIcon/>
                </IconButton>
            </div>
            <HabitBox>
                <FormTitle>Создать привычку</FormTitle>
                <TextField
                    style={{width: '80%'}}
                    label='Название'
                    value={habitForm.inputs.name}
                    onChange={(e) => habitForm.handleChange('name', e.target.value)}
                />
                <UnitLine>
                    <TextField
                        style={{width: '80%'}}
                        label='Объём'
                        value={habitForm.inputs.target}
                        onChange={(e) => habitForm.handleChange('target', e.target.value)}
                    />
                    <TextField
                        style={{width: '80%'}}
                        label='Единица измерения'
                        value={habitForm.inputs.unit}
                        onChange={(e) => habitForm.handleChange('unit', e.target.value)}
                    />
                </UnitLine>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label='Дата окончания'
                        value={habitForm.inputs.endDate}
                        onChange={(date) => habitForm.handleChange('endDate', format(date, 'yyyy-MM-dd'))}
                        renderInput={(params) => <TextField style={{width: '80%'}} {...params} />}
                    />
                </LocalizationProvider>
                <PickerLine>
                    <ToggleButtonGroup
                        value={days}
                        onChange={handleDays}
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
                            sx={{width: '140px', height: '50px', display: 'flex', alignItems: 'center'}}
                            value={goal}
                            label="Цель"
                            onChange={(e) => setGoal(e.target.value)}
                        >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                        </Select>
                    </FormControl>
                </PickerLine>
                <TextField
                    style={{width: '80%'}}
                    label='Описание'
                    value={habitForm.inputs.description}
                    onChange={(e) => habitForm.handleChange('description', e.target.value)}
                    multiline={true}
                    rows={5}
                />
                <SubmitButton style={{width: '80%'}} variant='outlined' onClick={handleSubmit}>Ok</SubmitButton>
            </HabitBox>
        </div>
    );
};

export default HabitForm;

const HabitBox = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 550px;
`

const PickerLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`

const UnitLine = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`

const FormTitle = styled.div`
  font-size: 36px;
  margin-bottom: 5px;
  font-weight: bold;
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