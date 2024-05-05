import React from 'react';
import { Avatar, Dialog, DialogContent, DialogContentText, DialogActions, Button, Box, Typography } from '@mui/material';

interface BookingDialogProps {
    open: boolean;
    onClose: () => void;
    onBook: () => void;
    selectedEvent: any;
}

const BookingDialog: React.FC<BookingDialogProps> = ({ open, onClose, onBook, selectedEvent }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogContent>
            <DialogContentText>
                Are you sure you want to book this slot?
            </DialogContentText>
            <Avatar alt="Doctor" src="/appointment.jpeg" sx={{ width: 100, height: 100, margin: 'auto', marginTop: 2 }} />
            {selectedEvent && (
                <Box mt={2}>
                    <Typography variant="body1"><strong>Doctor:</strong> {selectedEvent.title}</Typography>
                    <Typography variant="body1"><strong>Start Time:</strong> {selectedEvent.start.toLocaleString()}</Typography>
                    <Typography variant="body1"><strong>End Time:</strong> {selectedEvent.end.toLocaleString()}</Typography>
                    <Typography variant="body1"><strong>Specialties:</strong> {selectedEvent.doctorSpecialties.join(', ')}</Typography>
                </Box>
            )}
        </DialogContent>
        <DialogActions>
            <Button onClick={onBook} color="primary" variant="contained">
                Book
            </Button>
            <Button onClick={onClose} color="secondary">
                Cancel
            </Button>
        </DialogActions>
    </Dialog>
);

export default BookingDialog;