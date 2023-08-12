import {useEffect, useState} from "react";
import styled from 'styled-components'
import {
    Autocomplete,
    Checkbox,
    IconButton,
    TextField, Typography
} from "@mui/material"
import CloseIcon from "@mui/icons-material/Close"
import {useForm} from "../../hooks/useForm.js"
import DeleteIcon from "@mui/icons-material/Delete.js";
import AddIcon from "@mui/icons-material/Add.js";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {format} from "date-fns";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked.js";
import CheckCircleIcon from "@mui/icons-material/CheckCircle.js";
import {NavLink} from "react-router-dom";

const initialValues = {
    id: 0,
    name: '',
    category: '',
    img: null,
    dueDate: null,
    description: '',
    isComplete: false
}

const GoalForm = (props) => {

    const {currentGoal, closeGoal, saveGoal} = props

    let categories = ['Финансы', 'Путешествия', 'Образование', 'Досуг', 'Семья', 'Здоровье']

    const [openTaskPopup, setOpenTaskPopup] = useState(false)
    const [openHabitPopup, setOpenHabitPopup] = useState(false)

    const goalForm = useForm(initialValues)

    useEffect(() => {
        if (currentGoal != null) {
            goalForm.setInputs({
                id: currentGoal.id,
                name: currentGoal.name,
                category: currentGoal.category,
                dueDate: currentGoal.dueDate,
                description: currentGoal.description,
                isComplete: currentGoal.isComplete
            })
            // setTasks(currentTask.subtasks.map(subtask => ({...subtask, number: uuid()})))
        }
    }, [])

    const handleSubmit = () => {
        saveGoal({...goalForm.inputs})
        handleExit()
    }

    const handleExit = () => {
        goalForm.resetForm()
        closeGoal()
    }

    return (
        <div>
            <div style={{display: "flex", justifyContent: "right", width: '100%'}}>
                <IconButton onClick={handleExit}>
                    <CloseIcon/>
                </IconButton>
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between', padding: '10px'}}>
                <div style={{display: 'flex', flexDirection: 'column', width: '350px', gap: '20px'}}>
                    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
                        <GoalImage src={'https://cdn2.iconfinder.com/data/icons/business-office-icons/256/Business_Goals-1024.png'}/>
                        <ImageEditButton
                            type='file'
                            onChange={e => goalForm.handleChange('img', e.target.files[0])}
                        />
                    </div>
                    <div style={{display: 'flex', gap: '10px'}}>
                        <TextField
                            value={goalForm.inputs.name}
                            onChange={(e) => goalForm.handleChange('name', e.target.value)}
                            label="Цель"
                            variant="outlined"
                            sx={{width: '100%'}}
                        />
                        <div style={{display: 'flex'}}>
                            <Checkbox
                                type='checkbox'
                                checked={false}
                                color="default"
                                icon={<RadioButtonUncheckedIcon sx={{fontSize: '25px'}}/>}
                                checkedIcon={<CheckCircleIcon sx={{fontSize: '25px'}}/>}
                            />
                            <IconButton>
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                    </div>
                    <Autocomplete
                        disablePortal
                        options={categories}
                        inputValue={goalForm.inputs.category}
                        onInputChange={(event, newInputValue) => {
                            goalForm.handleChange('category', newInputValue)
                        }}
                        renderInput={(params) => <TextField {...params} label="Категория" />}
                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Срок"
                            value={goalForm.inputs.dueDate}
                            onChange={(date) => goalForm.handleChange('dueDate', format(date, 'yyyy-MM-dd'))}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                    <TextField
                        variant='outlined'
                        placeholder='Описание'
                        multiline
                        value={goalForm.inputs.description}
                        onChange={(e) => goalForm.handleChange('description', e.target.value)}
                        rows={5}
                        maxRows={10}
                    />
                    <SubmitButton onClick={handleSubmit}>ОК</SubmitButton>
                </div>
                <div style={{display: 'flex', flexDirection: 'column', width: '300px', marginLeft: '40px'}}>
                    <div style={{marginTop: '10px', fontSize: '25px'}}>Задачи:</div>
                    <div style={{marginTop: '10px', marginBottom: '10px'}}>
                        <IconButton>
                            <AddIcon style={{ color: '#0080ff'}} />
                        </IconButton>
                        <NavLink style={{ color: '#0080ff', fontSize: '1.2em', textDecoration: 'none', fontFamily: 'Roboto, sans-serif' }}>Создать</NavLink>
                    </div>

                    {/*<div style={{display: 'flex', gap: '10px', padding: '10px', borderRadius: '15px', boxShadow: '1px 2px 6px #aaa', alignItems: 'center'}}>*/}
                    {/*    <div style={{width: '200px'}}>{tasks[0]}</div>*/}
                    {/*    <div style={{display: 'flex'}}>*/}
                    {/*        <Checkbox*/}
                    {/*            type='checkbox'*/}
                    {/*            checked={false}*/}
                    {/*            color="default"*/}
                    {/*            icon={<RadioButtonUncheckedIcon sx={{fontSize: '25px'}}/>}*/}
                    {/*            checkedIcon={<CheckCircleIcon sx={{fontSize: '25px'}}/>}*/}
                    {/*        />*/}
                    {/*        <IconButton>*/}
                    {/*            <DeleteIcon/>*/}
                    {/*        </IconButton>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <div style={{display: 'flex', gap: '10px', padding: '10px', borderRadius: '15px', boxShadow: '1px 2px 6px #aaa', marginTop: '20px', alignItems: 'center'}}>
                        {/* <Autocomplete
                            sx={{width: '250px', paddingBottom: '10px'}}
                            disablePortal
                            options={tasks}
                            renderInput={(params) => <TextField {...params} variant={'standard'} label="Задача" />}
                        /> */}
                        <IconButton>
                            <AddIcon/>
                        </IconButton>
                    </div>

                </div>
                <div style={{display: 'flex', flexDirection: 'column', width: '300px', marginLeft: '40px'}}>
                    <div style={{marginTop: '10px', fontSize: '25px'}}>Привычки:</div>
                    <div style={{marginTop: '10px', marginBottom: '10px'}}>
                        <IconButton>
                            <AddIcon style={{ color: '#0080ff'}} />
                        </IconButton>
                        <NavLink style={{ color: '#0080ff', fontSize: '1.2em', textDecoration: 'none', fontFamily: 'Roboto, sans-serif' }}>Создать</NavLink>
                    </div>

                    {/*<div style={{display: 'flex', gap: '10px', padding: '10px', borderRadius: '15px', boxShadow: '1px 2px 6px #aaa', alignItems: 'center'}}>*/}
                    {/*    <div style={{width: '230px'}}>{habits[0]}</div>*/}
                    {/*    <IconButton>*/}
                    {/*        <DeleteIcon/>*/}
                    {/*    </IconButton>*/}
                    {/*</div>*/}

                    {/*<div style={{display: 'flex', gap: '10px', padding: '10px', borderRadius: '15px', boxShadow: '1px 2px 6px #aaa', marginTop: '20px', alignItems: 'center'}}>*/}
                    {/*    <div style={{width: '230px'}}>{habits[1]}</div>*/}
                    {/*    <IconButton>*/}
                    {/*        <DeleteIcon/>*/}
                    {/*    </IconButton>*/}
                    {/*</div>*/}

                    <div style={{display: 'flex', gap: '10px', padding: '10px', borderRadius: '15px', boxShadow: '1px 2px 6px #aaa', marginTop: '20px'}}>
                        {/* <Autocomplete
                            sx={{width: '250px', paddingBottom: '10px'}}
                            disablePortal
                            options={habits}
                            renderInput={(params) => <TextField {...params} variant={'standard'} label="Привычка" />}
                        /> */}
                        <IconButton>
                            <AddIcon/>
                        </IconButton>
                    </div>

                </div>
            </div>
            {/* <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>
                <TaskForm
                    currentTask={currentTask}
                    saveTask={addOrEditTask}
                    closeTask={closeTask}
                />
            </Popup> */}
        </div>
    );
};

export default GoalForm;

const SubmitButton = styled.button`
  margin-top: 10px;
  padding: 15px 45px;
  font-size: 1em;
  width: 100%;
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

const ImageEditButton = styled.input`
  margin-top: 15px;
  margin-left: 50px;
`

const GoalImage = styled.img`
  width: 220px;
  height: 220px;
  margin-top: 10px;
  border-radius: 20px;
`