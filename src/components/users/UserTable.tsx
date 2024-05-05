import React from 'react';
import { Roles, User } from '../../types';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Email as EmailIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../_reducers';

interface UserTableProps {
    users: User[];
    handleDelete: (username: string) => Promise<void>;
}

const UserTable: React.FC<UserTableProps> = ({ users, handleDelete }) => {
    const navigate = useNavigate();
    const user = useSelector((state: RootState) => state.authentication.user);
    const isAdmin = user.roles.includes(Roles.ROLE_ADMIN);

    const editUser = (user: User) => {
        navigate('/edit-user', { state: { user } });
    }

    const emailUser = (user: User) => {
        navigate('/email', { state: { user } });
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Specialties</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user) =>
                        <TableRow key={user.id}>
                            <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
                            <TableCell>
                                {user.specialties.map(specialty => specialty.name).join(', ')}
                            </TableCell>
                            <TableCell>
                                {isAdmin &&
                                    <IconButton onClick={() => handleDelete(user.username)} color="error">
                                        <DeleteIcon />
                                    </IconButton>
                                }
                                {isAdmin &&
                                    <IconButton onClick={() => editUser(user)} color="primary">
                                        <EditIcon />
                                    </IconButton>
                                }
                                <IconButton onClick={() => emailUser(user)} color="primary">
                                    <EmailIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default UserTable;