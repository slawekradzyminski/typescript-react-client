import * as React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import BugReportIcon from '@mui/icons-material/BugReport';
import MenuItem from '@mui/material/MenuItem';
import { loggedInPages, pagePaths, loggedOutPages, openSlots } from '../navbarConstants';
import { Menu } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../_reducers';
import { isDoctorOrAdmin } from '../rolesHelper';

const MobileView = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const loggedIn = useSelector((state: RootState) => state.authentication.loggedIn);
    const user = useSelector((state: RootState) => state.authentication.user);
    const userRoles = user?.roles || [];

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const renderButtons = (pages: string[]) => (
        pages.map((page) => {
            const active = location.pathname === pagePaths[page];
            return (
                <MenuItem
                    key={page}
                    onClick={() => {
                        handleCloseNavMenu();
                        navigate(pagePaths[page]);
                    }}
                    sx={{ fontWeight: active ? 'bold' : 'normal' }}
                >
                    <Typography textAlign="center">{page}</Typography>
                </MenuItem>
            );
        })
    );

    return (
        <>
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleOpenNavMenu}
                    color="inherit"
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorElNav}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorElNav)}
                    onClose={handleCloseNavMenu}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                    }}
                >
                    {loggedIn ? renderButtons(loggedInPages) : renderButtons(loggedOutPages)}
                    {loggedIn && isDoctorOrAdmin(userRoles) && (
                        renderButtons(openSlots)
                    )}
                </Menu>
            </Box>
            <BugReportIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
                variant="h5"
                noWrap
                component="div"
                sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    cursor: 'pointer'
                }}
                onClick={() => navigate('/')}
            > HOME
            </Typography>
        </>
    )
};

export default MobileView;