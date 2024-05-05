import React from 'react';
import { Typography } from '@mui/material';
import { format } from 'date-fns';

const CalendarEvent = ({ event }) => {
    return (
        <Typography variant="caption" color="white">
            {`[${format(event.start, 'h:mm a')} - ${format(event.end, 'h:mm a')}] ${event.title}`}
        </Typography>
    );
};

export default CalendarEvent;