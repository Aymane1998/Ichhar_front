import React, { ReactElement, ReactNode, useState } from 'react';
import CSelectItem from 'src/components/UI/CSelectMenu/CSelectItem';
import { useAppSelector } from 'src/hooks';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store/store';
import CSelectMenu from 'src/components/UI/CSelectMenu/CSelectMenu';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, useTheme } from '@mui/material';

interface MenuItem {
  title: string;
  isHighlighted?: boolean;
  hasIcon?: boolean;
  icon?: ReactElement;
  onClick?: () => void;
}

const UserMenu: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();

  const user = useAppSelector((state) => state.auth.userInfos.data);

  function stringAvatar(name: string) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  const [isMenuOpened, setIsMenuOpened] = useState<boolean>(false);

  const handleDisconnection = () => {
    navigate('/login');
    dispatch({ type: 'store/reset' });
  };

  const handleOpenMenu = (state: boolean) => {
    setIsMenuOpened(state);
  };

  const menuItems: MenuItem[] = [
    {
      title:
        user.first_name !== ''
          ? `${user.first_name} ${user.last_name}`
          : 'Anonyme',
      isHighlighted: true,
      hasIcon: true,
      icon: <AccountCircleIcon />,
    },
    {
      title: 'Paramètres',
      hasIcon: true,
      icon: <SettingsIcon />,
      onClick: () => {
        navigate('/parametres');
        setIsMenuOpened(false);
      },
    },
    {
      title: 'Déconnexion',
      hasIcon: true,
      icon: <LogoutIcon />,
      isHighlighted: true,
      onClick: () => handleDisconnection(),
    },
  ];

  const hasAtLeastOneIcon = menuItems.some((item) => item.hasIcon === true);

  const MenuList = (): ReactNode => (
    <>
      {menuItems.map((item, index) => (
        <CSelectItem
          key={index}
          title={item.title}
          isHighlighted={item.isHighlighted || false}
          hasIcon={item.hasIcon}
          anyItemHasIcon={hasAtLeastOneIcon}
          icon={item.icon}
          onClick={item.onClick}
        />
      ))}
    </>
  );

  return (
    <CSelectMenu
      icon={
        <Avatar
          {...stringAvatar(`${user.first_name} ${user.last_name}`)}
          sx={{
            width: 36,
            height: 36,
            padding: '10px',
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.primary.main,
            zIndex: theme.zIndex.drawer + 1, // ensure it's above AppBar
          }}
        />
      }
      list={MenuList()}
      isOpen={isMenuOpened}
      setIsOpen={handleOpenMenu}
    />
  );
};

export default UserMenu;
