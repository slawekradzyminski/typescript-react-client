import React, { useContext, useState } from 'react';
import { TextareaAutosize, Button, Box, CircularProgress } from '@mui/material';
import { CreateQrDto, generateQrCode } from '../../api/qr.api';
import { ToastContext } from '../../context/ToastContext';

function QrComponent() {
    const [text, setText] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const setToast = useContext(ToastContext);

    const generateQr = async (e) => {
        e.preventDefault();
        if (!text) {
            setToast({ type: 'error', message: 'Please provide text' });
            return;
        }
        setIsLoading(true);
        const createQrDto: CreateQrDto = { text }
        const response = await generateQrCode(createQrDto);
        setQrCodeUrl(response);
        setIsLoading(false);
    };

    const clearQr = () => {
        setText('');
        setQrCodeUrl(null);
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <h2 style={{ marginBottom: '2rem' }}>QR Code Generator</h2>
            <form onSubmit={generateQr}>
                <TextareaAutosize
                    minRows={5}
                    name="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    style={{ width: '500px', marginBottom: '1rem' }}
                />
                {!text && isLoading && <p style={{ color: 'red' }}>This field is required</p>}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isLoading}
                        sx={{ mt: 2 }}
                    >
                        {isLoading ? <CircularProgress size={24} /> : 'Generate QR Code'}
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        disabled={isLoading}
                        onClick={clearQr}
                        sx={{ mt: 2 }}
                    >
                        Clear QR Code
                    </Button>
                </Box>
            </form>
            {qrCodeUrl && <img src={qrCodeUrl} alt="Generated QR Code" />}
        </Box>
    );
}

export default QrComponent