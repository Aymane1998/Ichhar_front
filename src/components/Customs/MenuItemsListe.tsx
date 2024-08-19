import React from 'react';
import { Box, IconButton, useTheme } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CloseIcon from '@mui/icons-material/Close';
import { cAccordionMenuStyles } from '../UI/CAccordionMenu/styles';
import { leftMenuOpened } from 'src/store/navigation/navigationSlice';
import { useDispatch } from 'react-redux';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InfoIcon from '@mui/icons-material/Info';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import DifferenceIcon from '@mui/icons-material/Difference';
import PaymentIcon from '@mui/icons-material/Payment';
import { defineUserAbilities } from './abilities';

const MenuItemsListe: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const ability = defineUserAbilities(); // useAbility hook to access the ability instance
  const handleCloseMenu = () => {
    dispatch(leftMenuOpened(false));
  };

  return (
    <>
      <Box sx={cAccordionMenuStyles(theme).iconContainer}>
        <IconButton onClick={() => handleCloseMenu()}>
          <CloseIcon />
        </IconButton>
      </Box>

      <Box role="menu_items_liste">
        <List>
          {ability.can('read', 'Cart') && (
            <ListItem key={'Panier'} disablePadding>
              <ListItemButton
                component="a"
                href="/cart"
                onClick={() => handleCloseMenu()}
              >
                <ListItemIcon>
                  <ShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary={'Panier'} />
              </ListItemButton>
            </ListItem>
          )}
          {ability.can('read', 'AboutUs') && (
            <ListItem key={'AboutUs'} disablePadding>
              <ListItemButton
                component="a"
                href="/aboutus"
                onClick={() => handleCloseMenu()}
              >
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText primary={'AboutUs'} />
              </ListItemButton>
            </ListItem>
          )}
          {ability.can('read', 'Dashboard') && (
            <ListItem key={'Dashboard'} disablePadding>
              <ListItemButton
                component="a"
                href="/dashboard"
                onClick={() => handleCloseMenu()}
              >
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary={'Dashboard'} />
              </ListItemButton>
            </ListItem>
          )}
          {ability.can('read', 'Contenu') && (
            <ListItem key={'Contenu'} disablePadding>
              <ListItemButton
                component="a"
                href="/demande"
                onClick={() => handleCloseMenu()}
              >
                <ListItemIcon>
                  <DifferenceIcon />
                </ListItemIcon>
                <ListItemText primary={'Contenu'} />
              </ListItemButton>
            </ListItem>
          )}
          {ability.can('read', 'Createurs') && (
            <ListItem key={'Createurs'} disablePadding>
              <ListItemButton
                component="a"
                href="/createur"
                onClick={() => handleCloseMenu()}
              >
                <ListItemIcon>
                  <MovieFilterIcon />
                </ListItemIcon>
                <ListItemText primary={'Createurs'} />
              </ListItemButton>
            </ListItem>
          )}
          {ability.can('read', 'Payment') && (
            <ListItem key={'Payment'} disablePadding>
              <ListItemButton
                component="a"
                href="/payment"
                onClick={() => handleCloseMenu()}
              >
                <ListItemIcon>
                  <PaymentIcon />
                </ListItemIcon>
                <ListItemText primary={'Payment'} />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Box>
    </>
  );
};

export default MenuItemsListe;
