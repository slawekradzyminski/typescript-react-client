import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { useSelector } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import UserSettingsMenu from './UserSettingsMenu';
import MobileView from './mobile/MobileView';
import DesktopView from './desktop/DesktopView';
import { RootState } from '../../_reducers';
import { useState } from 'react';

const ResponsiveAppBar = () => {
  const loggedIn = useSelector((state: RootState) => state.authentication.loggedIn);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AppBar position="static" sx={{ marginBottom: '30px' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {isMobile ? <MobileView /> : <DesktopView />}
          {loggedIn && (
            <UserSettingsMenu
              anchorElUser={anchorElUser}
              handleOpenUserMenu={handleOpenUserMenu}
              handleCloseUserMenu={handleCloseUserMenu}
            />
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;