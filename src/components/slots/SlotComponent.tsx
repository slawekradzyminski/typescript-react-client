import React, { useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { TextField, Select, MenuItem, FormControl, InputLabel, FormHelperText } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { RootState } from '../../_reducers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import pl from 'date-fns/locale/pl';
import { Roles } from '../../types';
import ThemedContainer from '../core/ThemedContainer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { CreateSlotRangeDto, createSlots } from '../../api/slots/slots.api';
import { ToastContext } from '../../context/ToastContext';
import { roundToNextQuarterHour } from './slotUtil';

const eightHoursInMillis = 8 * 60 * 60 * 1000
const thirtyMinutes = 30 * 60000

const acceptedDurationsInMinutes = [30, 45, 60, 75, 90, 105, 120]

const SlotForm = () => {
    const user = useSelector((state: RootState) => state.authentication.user);
    const isAdmin = user.roles.includes(Roles.ROLE_ADMIN);
    const [username, setUsername] = useState(user.username);
    const [startAvailability, setStartAvailability] = useState(roundToNextQuarterHour(new Date()));
    const [endAvailability, setEndAvailability] = useState(new Date(startAvailability.getTime() + thirtyMinutes));
    const [slotDuration, setSlotDuration] = useState(30);
    const [dateError, setDateError] = useState('');
    const setToast = useContext(ToastContext);

    const handleSlotDurationChange = (e) => {
        const value = e.target.value;
        setSlotDuration(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        setDateError('');
        if (endAvailability <= startAvailability) {
            setDateError('End Availability must be after Start Availability.');
            return;
        }

        const timeDifference = (endAvailability.getTime() - startAvailability.getTime()) / (1000 * 60 * 60);
        if (timeDifference > 8) {
            setDateError('The time difference must be at most 8 hours.');
            return;
        }

        const createSlotRangeDto: CreateSlotRangeDto = {
            username: username,
            startAvailability: startAvailability,
            endAvailability: endAvailability,
            slotDurationMinutes: slotDuration
          };

        try {
            await createSlots(createSlotRangeDto);
            setToast({ type: 'success', message: 'Slots created successfully!' });
        } catch (error) {
            setToast({ type: 'error', message: error.toString() });
        }
    };

    return (
        <ThemedContainer maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <ScheduleIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Create Slots
                </Typography>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={pl}>
                    <form onSubmit={handleSubmit}>
                        {isAdmin && (
                            <TextField
                                label="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                fullWidth
                                disabled
                                margin="normal"
                            />
                        )}
                        <DateTimePicker
                            label="Start Availability"
                            value={startAvailability}
                            onChange={setStartAvailability}
                            minDate={roundToNextQuarterHour(new Date())}
                            maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 1))}
                            minutesStep={15}
                            sx={{ width: '100%', mt: 1, mb: 2.5 }}
                        />
                        <DateTimePicker
                            label="End Availability"
                            value={endAvailability}
                            onChange={setEndAvailability}
                            minDate={new Date(startAvailability.getTime() + thirtyMinutes)}
                            maxDate={new Date(startAvailability.getTime() + eightHoursInMillis)}
                            minutesStep={15}
                            sx={{ width: '100%' }}
                        />
                        {dateError && (
                            <FormHelperText error>{dateError}</FormHelperText>
                        )}
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="slot-duration-label">Slot Duration (minutes)</InputLabel>
                            <Select
                                labelId="slot-duration-label"
                                value={slotDuration}
                                label="Slot Duration (minutes)"
                                onChange={handleSlotDurationChange}
                            >
                                {acceptedDurationsInMinutes.map((duration) => (
                                    <MenuItem key={duration} value={duration}>
                                        {duration}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onSubmit={handleSubmit}
                        >
                            Create Slots
                        </Button>
                    </form>
                </LocalizationProvider>
            </Box>
        </ThemedContainer>
    );
};

export default SlotForm;
