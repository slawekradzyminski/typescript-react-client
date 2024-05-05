import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../_reducers';
import { CssBaseline, Box } from "@mui/material";
import ThemedContainer from '../core/ThemedContainer';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { get10RandomItems } from './images';


function HomePage() {
    const user = useSelector((state: RootState) => state.authentication.user);

    return (
        <ThemedContainer maxWidth="md">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <h1>Hi {user.firstName}!</h1>
                <p>You're logged in! Congratulations :)</p>
                <ImageGallery items={get10RandomItems()} />
            </Box>
        </ThemedContainer>
    );
}

export { HomePage };