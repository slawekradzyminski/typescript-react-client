import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { TextField, Button, Box } from "@mui/material";
import { Roles, EditUser, User } from '../../types';
import RolesCheckboxGroup from '../common/RolesCheckboxGroup';
import FormHelperText from '@mui/material/FormHelperText';

interface Props {
    user: User;
    onSubmit: (user: EditUser) => void;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EditUserForm: React.FC<Props> = ({ user, onSubmit }) => {
    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);
    const [roles, setRoles] = useState(user.roles);
    const [attemptedRegister, setAttemptedRegister] = useState(false);
    const username = user.username

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const handleRoleChange = (role: Roles) => {
        if (roles.includes(role)) {
            setRoles(roles.filter((r) => r !== role));
        } else {
            setRoles([...roles, role]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setAttemptedRegister(true);

        if (!emailRegex.test(email)) {
            setEmailError(true);
            return;
        }

        if (firstName.length < 3) {
            setFirstNameError(true);
            return;
        }

        if (lastName.length < 3) {
            setLastNameError(true);
            return;
        }

        if (roles.length === 0) {
            return;
        }

        onSubmit({ firstName, lastName, email, roles });
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
                name="username"
                value={username}
                disabled
                label="Username"
                fullWidth margin="normal" />
            <TextField
                error={firstNameError}
                name="firstName"
                value={firstName}
                onChange={e => {
                    setFirstName(e.target.value);
                    setFirstNameError(e.target.value.length < 3);
                }}
                label="First Name"
                fullWidth
                margin="normal"
            />
            {firstNameError && <FormHelperText error>First Name must be at least 3 characters long</FormHelperText>}
            <TextField
                error={lastNameError}
                name="lastName"
                value={lastName}
                onChange={e => {
                    setLastName(e.target.value);
                    setLastNameError(e.target.value.length < 3);
                }}
                label="Last Name"
                fullWidth
                margin="normal"
            />
            {lastNameError && <FormHelperText error>Last Name must be at least 3 characters long</FormHelperText>}
            <TextField
                error={emailError}
                name="email"
                value={email}
                onChange={e => {
                    setEmail(e.target.value);
                    setEmailError(!emailRegex.test(e.target.value));
                }}
                label="Email"
                fullWidth
                margin="normal"
            />
            {emailError && <FormHelperText error>Email is not valid</FormHelperText>}
            <RolesCheckboxGroup selectedRoles={roles} handleRoleChange={handleRoleChange} attemptedRegister={attemptedRegister} />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={firstNameError || lastNameError || emailError || roles.length === 0}
            >
                Edit User
            </Button>
            <Button component={Link} to="/" variant="text" fullWidth>Cancel</Button>
        </Box>
    );
};

export default EditUserForm;