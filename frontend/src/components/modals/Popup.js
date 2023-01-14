import React from 'react'
import {Box, Container, IconButton, Modal} from "@mui/material";
import './Popup.css'
import CloseIcon from '@mui/icons-material/Close';

const Popup = (props) => {

    const {openPopup, setOpenPopup} = props

    return (
        // Перенести сюда оформление окна
        <Modal open={openPopup}>
            <Box>
                <Container
                    sx={{
                        position: 'absolute',
                        padding: 3,
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: 'auto',
                        height: 'auto',
                        background: 'white',
                        borderRadius: 3,
                    }}
                >
                    <div style={{display: "flex", justifyContent: "right", width: '100%'}}>
                        <IconButton onClick={()=>{setOpenPopup(false)}}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                    {props.children}
                </Container>
            </Box>
        </Modal>
    )
}

export default Popup