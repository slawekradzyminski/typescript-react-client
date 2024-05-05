import { Box, Paper, Typography, TextField, Button } from "@mui/material";
import React from "react";

const AddSpecialty = ({ newSpecialtyName: newSpecialityName, handleCreate, setNewSpecialityName }) => (
    <Box mt={3} p={1} component={Paper} elevation={3} bgcolor="grey.100">
        <Typography variant="body1" align="center" gutterBottom>
            Can't find your specialty? Add it!
        </Typography>
        <Box display="flex" justifyContent="center" mt={1} style={{ marginTop: '16px' }}>
            <TextField value={newSpecialityName} onChange={(e) => setNewSpecialityName(e.target.value)} label="New Doctor Type" />
            <Button variant="contained" color="primary" onClick={handleCreate} style={{ marginLeft: '5px' }}>
                Add
            </Button>
        </Box>
    </Box>
);

export default AddSpecialty