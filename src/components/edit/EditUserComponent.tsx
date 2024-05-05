import React, { useContext } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContext } from '../../context/ToastContext';
import { userService } from '../../api/user.api';
import EditUserForm from './EditUserForm';
import EditIcon from '@mui/icons-material/Edit';
import { CssBaseline, Box, Avatar, Typography } from '@mui/material';
import ThemedContainer from '../core/ThemedContainer';
import { EditUser } from '../../types';

function EditUserComponent() {
    const location = useLocation();
    const navigate = useNavigate();
    const user = location.state.user;
    const setToast = useContext(ToastContext);

    const saveUser = async (editUser: EditUser) => {
        try {
            await userService.update(user.username, editUser);
            setToast({ type: 'success', message: 'Updating user successful!' });
            navigate('/')
        } catch (error) {
            setToast({ type: 'error', message: error.toString() });
        }
    };

    return (
        <ThemedContainer maxWidth='xs'>
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
                    <EditIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Edit User
                </Typography>
                <EditUserForm user={user} onSubmit={saveUser} />
            </Box>
        </ThemedContainer>
    );
}

export { EditUserComponent };
