import React, { useState } from 'react';
import { Button, ButtonGroup, Box, Typography, InputLabel, FormControl } from '@mui/material';
import { Navigate } from 'react-big-calendar';

const CalendarToolbar = ({ specialties, ...toolbar }) => {

    const goToBack = () => {
        toolbar.onNavigate(Navigate.PREVIOUS);
    };

    const goToNext = () => {
        toolbar.onNavigate(Navigate.NEXT);
    };

    const goToCurrent = () => {
        toolbar.onNavigate(Navigate.TODAY);
    };

    return (
        <Box display="flex" justifyContent="space-between">
            <Box marginBottom={2}>
                <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">
                    <Button onClick={goToCurrent}>Today</Button>
                    <Button onClick={goToBack}>Back</Button>
                    <Button onClick={goToNext}>Next</Button>
                </ButtonGroup>
            </Box>
            <Box marginBottom={2}>
                <Typography variant="h6">{toolbar.label}</Typography>
            </Box>
            <Box marginBottom={2}>
                <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                    <Button onClick={() => toolbar.onView('month')}>Month</Button>
                    <Button onClick={() => toolbar.onView('week')}>Week</Button>
                    <Button onClick={() => toolbar.onView('day')}>Day</Button>
                </ButtonGroup>
            </Box>
        </Box>
    );
};

export default CalendarToolbar;
