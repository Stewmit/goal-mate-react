export function useTask(initialValues) {

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

    const addOrEditTask = async (task) => {
        try {
            if (task.id === 0) {
                const data = await createTask(task)
                dispatch(addLocalTask(data))
            }
            else {
                await updateTask(task)
                dispatch(editLocalTask(task))
            }
        }
        catch (err) {
            alert(err)
        }
    }

    return {
        addOrEditTask
    }
}