import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { ToastContext } from '../../context/ToastContext';
import RegisterForm from './RegisterForm';
import { userService } from '../../api/user.api';

function RegisterPage() {
    const setToast = useContext(ToastContext);
    const navigate = useNavigate()

    const handleSubmit = async (user: any) => {
        try {
            await userService.register(user);
            setToast({ type: 'success', message: 'Registration successful!' });
            navigate('/login')
            return user;
        } catch (error) {
            setToast({ type: 'error', message: error.toString() });
        }
    }

    return (
            <RegisterForm onSubmit={handleSubmit} />
    );
}

export { RegisterPage };