import React, { useState } from 'react'
import {format} from "date-fns";

export function useForm(initialValues) {

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const handleInputChange = e => {
        let { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleDateChange = (date) => {
        setValues({
            ...values,
            ['date']: format(date, 'yyyy-MM-dd')
        })
    }

    const handleCheckboxChange = e => {
        let { checked } = e.target
        setValues({
            ...values,
            ['isComplete']: checked
        })
    }

    const handleColorChange = (color) => {
        setValues({
            ...values,
            ['highlightColor']: color
        })
    }

    const resetForm = () => {
        setValues(initialValues)
        setErrors({})
    }

    return {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        handleDateChange,
        handleCheckboxChange,
        handleColorChange,
        resetForm
    }
}