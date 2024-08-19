import React, { useCallback, useEffect } from 'react';
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store/store';
import MenuIcon from '@mui/icons-material/Menu';
import {
  leftMenuOpened,
  switchThemeMode,
} from 'src/store/navigation/navigationSlice';
import { homePageStyles } from './styles';
import { useAppSelector } from 'src/hooks';
import HomeIcon from '@mui/icons-material/Home';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import NightlightIcon from '@mui/icons-material/Nightlight';
import { useNavigate } from 'react-router';
import { getUserInfosAsync } from 'src/store/auth/authAsync';
import CSwitch from 'src/components/UI/CSwitch/CSwitch';
import MenuItemsListe from 'src/components/Customs/MenuItemsListe';
import Footer from 'src/components/Customs/Footer';
import UserMenu from './UserMenu/UserMenu';
interface Props {
  children?: React.ReactNode;
}

const HomePage: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();

  const mode = useAppSelector((state) => state.nav.themeMode);
  const [checked, setChecked] = React.useState(mode === 'dark');

  const menuOpen = useAppSelector((state) => state.nav.leftMenuOpened);
  const userInfos = useAppSelector((state) => state.auth.userInfos.data);
  const navigate = useNavigate();

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    dispatch(switchThemeMode(mode === 'light' ? 'dark' : 'light'));
  };

  const displayTabletMenu = () => {
    dispatch(leftMenuOpened(!menuOpen));
  };

  const handleGetUserInfos = useCallback(() => {
    dispatch(getUserInfosAsync());
  }, [dispatch]);

  useEffect(() => {
    handleGetUserInfos();
  }, [handleGetUserInfos]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
      <AppBar data-testid="AppBar" position="static" component="nav">
        <Toolbar sx={homePageStyles(theme).toolBar}>
          <Box sx={homePageStyles(theme).container}>
            <Box sx={homePageStyles(theme).pagesContainer}>
              <IconButton
                onClick={() => displayTabletMenu()}
                sx={homePageStyles(theme).buttonIcon}
              >
                <MenuIcon />
              </IconButton>
              <IconButton
                onClick={() => navigate('/')}
                sx={homePageStyles(theme).buttonIcon}
              >
                <Tooltip title="Page d'accueil" placement="bottom" arrow>
                  <HomeIcon />
                </Tooltip>
              </IconButton>
              <Drawer
                anchor="left"
                open={menuOpen}
                onClose={displayTabletMenu}
                sx={homePageStyles(theme).drawer}
              >
                <MenuItemsListe />
              </Drawer>
            </Box>
            <Box sx={homePageStyles(theme).userInfo}>
              <Typography>
                {userInfos?.first_name} {userInfos?.last_name}
              </Typography>
              <Box sx={homePageStyles(theme).switchTheme}>
                <CSwitch
                  onChange={handleSwitchChange}
                  checked={checked}
                  color="default"
                />
                {theme.palette.mode === 'dark' ? (
                  <NightlightIcon />
                ) : (
                  <WbSunnyIcon />
                )}
              </Box>
              <UserMenu />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Container sx={homePageStyles(theme).mainWrapper} component="main">
        {children}
      </Container>
      <Footer />
    </Box>
  );
};

export default HomePage;
