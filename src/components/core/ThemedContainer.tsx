import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Container } from '@mui/material';

const ThemedContainer = ({ maxWidth = 'md', children }) => {
    const defaultTheme = createTheme();

    return (
        <ThemeProvider theme={defaultTheme}>
            {/* @ts-ignore */}
            <Container component="main" maxWidth={maxWidth}>
                {children}
            </Container>
        </ThemeProvider>
    );
};

export default ThemedContainer;