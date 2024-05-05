import { Box, Button, FormHelperText, TextField, TextareaAutosize } from '@mui/material';
import { Link } from 'react-router-dom'
import React, { useState, useContext } from 'react';
import { sendEmail } from '../../api/email/email.api';
import { ToastContext } from '../../context/ToastContext';

function EmailForm({ to }) {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const setToast = useContext(ToastContext);
    const [subjectError, setSubjectError] = useState(false);
    const [messageError, setMessageError] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (subjectError || messageError) {
            return;
        }

        try {
            await sendEmail({ to, subject, message });
            setToast({ type: 'success', message: 'Email scheduled to be send' });
            setSubject('')
            setMessage('')
        } catch (error) {
            setToast({ type: 'error', message: error.toString() });
        }
    };

    return (
        <Box component="form" onSubmit={submitHandler} noValidate sx={{ mt: 1 }}>
            <TextField disabled fullWidth name="email" value={to} label="Email" margin="normal" />
            <TextField name="subject" value={subject} error={submitted && subjectError}
                onChange={(e) => {
                    setSubject(e.target.value);
                    setSubjectError(e.target.value.length < 3);
                }} 
                label="Subject" fullWidth margin="normal" />
            {subjectError && <FormHelperText error>Subject must be at least 3 characters long</FormHelperText>}
            <TextareaAutosize
                aria-label="message"
                minRows={5}
                name="message"
                value={message}
                onChange={(e) => {
                    setMessage(e.target.value);
                    setMessageError(e.target.value.length < 3);
                }}
                style={{ width: '500px', marginBottom: '1rem' }}
            />
            {messageError && <FormHelperText error>Message must be at least 3 characters long</FormHelperText>}
            <Box sx={{ mt: 2, mb: 2 }}>
                <Button type="submit" variant="contained" color="primary" fullWidth>Send email</Button>
                <Button component={Link} to="/" variant="text" fullWidth>Cancel</Button>
            </Box>
        </Box>
    );
}

export default EmailForm;