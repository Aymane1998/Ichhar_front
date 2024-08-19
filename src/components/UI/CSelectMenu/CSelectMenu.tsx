import React, { ReactNode, useEffect, useState } from 'react';
import { Box, Button, IconButton, Typography, useTheme } from '@mui/material';
import { cSelectMenuStyles } from './styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CSelectWindow from './CSelectWindow';
import { v4 as uuidv4 } from 'uuid';
import useIsTabletPortait from 'src/hooks/useIsTablet';

type CSelectMenuProps = {
  icon?: React.ReactNode;
  textMenu?: string;
  list?: React.ReactNode;
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  setIsOpen: (state: boolean) => void;
};

const CSelectMenu: React.FC<CSelectMenuProps> = ({
  icon,
  textMenu,
  list,
  isOpen,
  setIsOpen,
}) => {
  const theme = useTheme();
  const isTablet = useIsTabletPortait();

  const BUTTON_ID = `notification-button-${uuidv4()}`;
  const WINDOW_LIST_WIDTH = 250;

  const [windowPosition, setWindowPosition] = useState<number | 'unset'>(
    'unset',
  );

  const handleOpenMenu = () => {
    setIsOpen(true);
    setWindowPosition(calculateListPosition());
  };

  const handleCloseMenu = () => {
    setIsOpen(false);
  };

  const calculateListPosition = () => {
    const button = document.getElementById(BUTTON_ID);

    if (button) {
      const buttonRect = button.getBoundingClientRect();

      // Calculate the potential right position of the wrapper
      const rightPosition = buttonRect.right + WINDOW_LIST_WIDTH;

      // Check if the wrapper would go off the screen
      if (rightPosition > window.innerWidth) {
        return buttonRect.right - WINDOW_LIST_WIDTH;
      }

      return 'unset';
    }

    return 'unset';
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowPosition(calculateListPosition());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [window.innerWidth]);

  const MenuIcon = (): ReactNode => {
    const getButton = (children: ReactNode) => (
      <Button
        id={BUTTON_ID}
        sx={cSelectMenuStyles(theme).textButton}
        onClick={() => (isOpen ? handleCloseMenu() : handleOpenMenu())}
      >
        {children}
      </Button>
    );

    const menu = icon ? (
      <IconButton
        id={BUTTON_ID}
        sx={cSelectMenuStyles(theme).icon}
        onClick={() => (isOpen ? handleCloseMenu() : handleOpenMenu())}
      >
        {icon}
      </IconButton>
    ) : textMenu ? (
      getButton(
        <>
          <Typography>{textMenu}</Typography>
          <ArrowDropDownIcon />
        </>,
      )
    ) : (
      getButton(
        <>
          <Typography>Menu</Typography>
          <ArrowDropDownIcon />
        </>,
      )
    );

    return menu;
  };

  return (
    <Box>
      {MenuIcon()}
      {isOpen && (
        <CSelectWindow
          onClose={handleCloseMenu}
          sx={{
            left: isTablet ? 0 : windowPosition,
            width: isTablet ? '100vw' : WINDOW_LIST_WIDTH,
          }}
        >
          {list}
        </CSelectWindow>
      )}
    </Box>
  );
};

export default CSelectMenu;
