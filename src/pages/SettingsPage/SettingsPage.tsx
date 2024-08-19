import { Box, Divider, IconButton, Typography, useTheme } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { settingsPageStyles } from './styles';
import { useAppSelector } from 'src/hooks';
import PasswordSection from './PasswordSection';
import useIsTabletPortait from 'src/hooks/useIsTablet';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';

const SettingsPage = () => {
  const theme = useTheme();
  const isTablet = useIsTabletPortait();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Page des paramètres';

    return () => {
      document.title = 'Data Catalog';
    };
  }, []);
  const user = useAppSelector((state) => state.auth.userInfos.data);

  return (
    <Box sx={settingsPageStyles(theme).mainWrapper}>
      <Typography variant="h1">Paramètres</Typography>
      <Box sx={settingsPageStyles(theme).card}>
        <Box>
          <IconButton
            onClick={() => navigate('/')}
            sx={{ marginLeft: theme.spacing(2) }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
        </Box>
        <Typography
          sx={settingsPageStyles(theme).title}
          variant="h2"
          color="primary"
        >
          {`${user.first_name} ${user.last_name} - ${
            user?.groups.includes('Administrator')
              ? 'Administrateur'
              : user?.groups.includes('Client')
                ? 'Client'
                : ''
          }`}
        </Typography>

        <Divider sx={settingsPageStyles(theme).divider} />
        <Box sx={settingsPageStyles(theme).optionsWrapper}>
          {isTablet && <Divider sx={settingsPageStyles(theme).divider} />}
          <PasswordSection />
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsPage;
