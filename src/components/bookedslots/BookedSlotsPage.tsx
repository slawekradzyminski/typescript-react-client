import React, { useEffect, useState } from 'react';
import { getBookedSlots, cancelBooking } from '../../api/slots/slots.api';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { format } from 'date-fns';
import ThemedContainer from '../core/ThemedContainer';

const BookedSlotsPage = () => {
    const [slots, setSlots] = useState([]);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [slotToCancel, setSlotToCancel] = useState(null);

    useEffect(() => {
        const fetchBookedSlots = async () => {
            let slots = await getBookedSlots();
            slots = slots.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
            setSlots(slots);
        };
        fetchBookedSlots();
    }, []);

    const handleCancel = (slot) => {
        setSlotToCancel(slot);
        setDialogOpen(true);
    };

    const confirmCancel = async () => {
        await cancelBooking(slotToCancel.id);
        setSlots(slots.filter(slot => slot.id !== slotToCancel.id));
        setDialogOpen(false);
    };

    return (
        <ThemedContainer maxWidth="md">
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Doctor Name</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Specialties</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Start Time</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>End Time</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', color: 'primary.main' }}>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {slots.map((slot) => (
                            <TableRow key={slot.id}>
                                <TableCell>{slot.doctorFullName}</TableCell>
                                <TableCell>{slot.doctorSpecialties.join(', ')}</TableCell>
                                <TableCell>{slot.startTime ? format(new Date(slot.startTime), 'dd/MM/yyyy hh:mm a') : ''}</TableCell>
                                <TableCell>{slot.endTime ? format(new Date(slot.endTime), 'dd/MM/yyyy hh:mm a') : ''}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" onClick={() => handleCancel(slot)}>
                                        Cancel
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={dialogOpen}
                onClose={() => setDialogOpen(false)}
            >
                <DialogTitle>Cancel Appointment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to cancel this appointment with {slotToCancel?.doctorFullName} on{' '}
                        {slotToCancel && format(new Date(slotToCancel.startTime), 'dd/MM/yyyy')} from{' '}
                        {slotToCancel && format(new Date(slotToCancel.startTime), 'hh:mm a')} to{' '}
                        {slotToCancel && format(new Date(slotToCancel.endTime), 'hh:mm a')}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="primary">
                        No
                    </Button>
                    <Button onClick={confirmCancel} color="primary" autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </ThemedContainer>
    );
};

export default BookedSlotsPage;
