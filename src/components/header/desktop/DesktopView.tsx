import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import BugReportIcon from '@mui/icons-material/BugReport';
import { useLocation, useNavigate } from 'react-router-dom';
import { loggedInPages, pagePaths, loggedOutPages, openSlots } from '../navbarConstants';
import { useSelector } from 'react-redux';
import { RootState } from '../../../_reducers';
import { isDoctorOrAdmin } from '../rolesHelper';

const DesktopView = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const loggedIn = useSelector((state: RootState) => state.authentication.loggedIn);
    const user = useSelector((state: RootState) => state.authentication.user);
    const userRoles = user?.roles || [];

    const renderButtons = (pages: string[]) => (
        pages.map((page) => {
            const active = location.pathname === pagePaths[page];
            return (
                <Button
                    key={page}
                    sx={{ my: 2, color: 'white', display: 'block', fontWeight: active ? 'bold' : 'normal' }}
                    onClick={() => navigate(pagePaths[page])}
                >
                    {page}
                </Button>
            );
        })
    );


    return (
        <>
            <BugReportIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    cursor: 'pointer'
                }}
                onClick={() => navigate('/')}
            >
                HOME
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                {loggedIn ? renderButtons(loggedInPages) : renderButtons(loggedOutPages)}
                {loggedIn && isDoctorOrAdmin(userRoles) && (
                    renderButtons(openSlots)
                )}
            </Box>
        </>
    )
};

export default DesktopView;
