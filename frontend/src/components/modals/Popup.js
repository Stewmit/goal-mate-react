import React from 'react'
import {Box, Container, Modal} from "@mui/material";
import './Popup.css'

const Popup = (props) => {

    const {openPopup} = props

    return (
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
                    {props.children}
                </Container>
            </Box>
        </Modal>
    )
}

export default Popup