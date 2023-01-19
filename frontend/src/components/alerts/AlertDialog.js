import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const AlertDialog = (props) => {

    const {title, message, open, closeHandler, action} = props

    const actionHandler = () => {
        action()
        closeHandler()
    }

    return (
        <Dialog
            open={open}
            onClose={closeHandler}
        >
            <DialogTitle>
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color='primary' onClick={actionHandler}>Удалить</Button>
                <Button color='error' onClick={closeHandler}>Отмена</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertDialog