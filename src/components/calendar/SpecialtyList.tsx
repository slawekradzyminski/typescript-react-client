import { Select, MenuItem, Typography, Box } from '@mui/material';
import React from 'react';
import ThemedContainer from '../core/ThemedContainer';

const SpecialtyList = ({ specialties, handleChange }) => {
    const [selectedSpecialty, setSelectedSpecialty] = React.useState("");

    const handleSelectChange = (event) => {
        setSelectedSpecialty(event.target.value);
        handleChange(event);
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
                <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
                    Pick a specialist first
                </Typography>
                <Select
                    value={selectedSpecialty || ""}
                    onChange={handleSelectChange}
                    displayEmpty>
                    <MenuItem value="" disabled>
                        Select a specialty
                    </MenuItem>
                    {specialties.map((specialty, index) => (
                        <MenuItem key={index} value={specialty.id}>
                            {specialty.name}
                        </MenuItem>
                    ))}
                </Select>
                <Box sx={{ mt: 3, overflow: 'hidden' }}>
                    <img src="/doctors2.webp" alt="Doctors" style={{ maxWidth: '100%' }} />
                </Box>
            </Box>
        </ThemedContainer>
    );
};

export default SpecialtyList