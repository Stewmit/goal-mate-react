import React from 'react';
import styled from 'styled-components'
import {Button, IconButton, TextField} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {useForm} from "../../hooks/useForm";
import {useEffect} from "react";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {format} from "date-fns";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";

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

    const {currentHabit, addHabit, closeHabit} = props

    const habitForm = useForm(initialValues)

    useEffect(() => {
        if (currentHabit != null) {
            habitForm.setInputs({
                id: currentHabit.id,
                name: currentHabit.name,
                regularity: currentHabit.regularity,
                endDate: currentHabit.endDate,
                target: currentHabit.target,
                unit: currentHabit.unit,
                description: currentHabit.description
            })
        }
    }, [])

    const handleSubmit = () => {
        addHabit({...habitForm.inputs})
        closeHabit()
    }

    return (
        <div>
            <div style={{display: "flex", justifyContent: "right", width: '100%'}}>
                <IconButton onClick={closeHabit}>
                    <CloseIcon/>
                </IconButton>
            </div>
            <HabitBox>
                <TextField
                    label='Название'
                    value={habitForm.inputs.name}
                    onChange={(e) => habitForm.handleChange('name', e.target.value)}
                />
                <TextField
                    label='Регулярность'
                    value={habitForm.inputs.regularity}
                    onChange={(e) => habitForm.handleChange('regularity', e.target.value)}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label='Дата окончания'
                        value={habitForm.inputs.endDate}
                        onChange={(date) => habitForm.handleChange('endDate', format(date, 'yyyy-MM-dd'))}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
                <TextField
                    label='Объём'
                    value={habitForm.inputs.target}
                    onChange={(e) => habitForm.handleChange('target', e.target.value)}
                />
                <TextField
                    label='Единица измерения'
                    value={habitForm.inputs.unit}
                    onChange={(e) => habitForm.handleChange('unit', e.target.value)}
                />
                <TextField
                    label='Описание'
                    value={habitForm.inputs.description}
                    onChange={(e) => habitForm.handleChange('description', e.target.value)}
                    multiline={true}
                    rows={5}
                />
                <Button variant='outlined' onClick={handleSubmit}>Ok</Button>
            </HabitBox>
        </div>
    );
};

export default HabitForm;

const HabitBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
`