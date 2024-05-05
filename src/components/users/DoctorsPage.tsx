import React, { useContext, useEffect, useState } from 'react';
import UserTable from './UserTable';
import { CssBaseline, Box } from "@mui/material";
import { userService } from '../../api/user.api';
import { ToastContext } from '../../context/ToastContext';
import ThemedContainer from '../core/ThemedContainer';
import { Roles, User } from '../../types';

function DoctorsPage() {
    const [users, setUsers] = useState([]);
    const setToast = useContext(ToastContext);

    useEffect(() => {
        const fetchUsers = async () => {
            const usersFromApi = await userService.getAll();
            const doctorsWithSpecialties = usersFromApi.filter((user: User) =>
                user.roles.includes(Roles.ROLE_DOCTOR) && user.specialties.length > 0
            );
            setUsers(doctorsWithSpecialties);
        };
        fetchUsers();
    }, []);

    const handleDelete = async (username: string) => {
        if (window.confirm("Are you sure you wish to delete this item?")) {
            try {
                await userService.delete(username);
                const updatedUserList = users.filter(user => user.username !== username);
                setUsers(updatedUserList);
                setToast({ type: 'success', message: 'User deleted successfully' });
            } catch (error) {
                setToast({ type: 'error', message: error.toString() });
            }
        }
    }

    return (
        <ThemedContainer maxWidth="md">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <h1>All registered users</h1>
                {users.length === 0 && <em>Loading users...</em>}
                {users && <UserTable users={users} handleDelete={handleDelete} />}
            </Box>
        </ThemedContainer>
    );
}

export default DoctorsPage;