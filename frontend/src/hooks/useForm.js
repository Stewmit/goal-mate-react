import { useState } from 'react'

export function useForm(initialValues) {

    const [inputs, setInputs] = useState(initialValues)

    const handleChange = (name, value) => {
        setInputs({
            ...inputs,
            [name]: value
        })
    }

    const resetForm = () => {
        setInputs(initialValues)
    }

    return {
        inputs,
        setInputs,
        handleChange,
        resetForm
    }
}