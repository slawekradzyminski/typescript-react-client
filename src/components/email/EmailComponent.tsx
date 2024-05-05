import React, {  } from 'react';
import { useLocation } from "react-router-dom";
import { Typography, Box, CssBaseline, Avatar } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import ThemedContainer from '../core/ThemedContainer';
import EmailForm from './EmailForm';

function EmailComponent() {
    const location = useLocation()
    const user = location.state.user;
    const to = user.email

    return (
        <ThemedContainer maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <EmailIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Email user
                </Typography>
                <EmailForm to={to} />
            </Box>
        </ThemedContainer>
    );
}

export { EmailComponent };