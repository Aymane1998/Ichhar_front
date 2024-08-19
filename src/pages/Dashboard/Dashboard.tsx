import { Box, Typography, useTheme } from '@mui/material';
import React from 'react';
import CInfosTitleWrapper from 'src/components/UI/CInfosTitleWrapper/CInfosTitleWrapper';
import CPieChart from 'src/components/UI/CPieChart/CPieChart';
import { PieChartData } from 'src/components/UI/types';
import { componentsPagesStyles } from './styles';
import { useAppSelector } from 'src/hooks';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const user = useAppSelector((state) => state.auth.userInfos.data);
  const userRole = user?.groups;
  const CLIENT_ROLE = 'Client';
  const ADMIN_ROLE = 'Administrator';
  const CREATOR_ROLE = 'Createur';
  const isAdmin = userRole.includes(ADMIN_ROLE);
  const isClient = userRole.includes(CLIENT_ROLE);
  const isCreator = userRole.includes(CREATOR_ROLE);

  // Admin Messages
  const NbrClientsMessage = 'Nombre de Clients';
  const NbrCreatorsMessage = 'Nombre de Créateurs';
  const NbrVideosMessage = 'Nombre de Vidéos';
  // Createur Messages
  const NbrVideoCreatedMessage = 'Nombre de Vidéos Crées';
  const AmountReceptedMessage = 'Argent reçu en $';
  const AmountUpcomingMessage = 'Argent à recevoir en $';
  // Client Messages
  const SoldeMessage = 'Solde';
  const NbrVideoDoneMessage = 'Nombre de Vidéos faites';
  const NbrCreatorsDealMessage = 'Nombre de Créateurs';

  // Admin Data
  const NbrClients: PieChartData[] = [
    {
      value: 4,
      label: '',
    },
  ];
  const NbrCreators: PieChartData[] = [
    {
      value: 6,
      label: '',
    },
  ];
  const NbrVideos: PieChartData[] = [
    {
      value: 8,
      label: '',
    },
  ];
  // Createurs Data
  const NbrVideoCreated: PieChartData[] = [
    {
      value: 10,
      label: '',
    },
  ];
  const ArgentRecu: PieChartData[] = [
    {
      value: 6500,
      label: '',
    },
  ];
  const ArgentVenir: PieChartData[] = [
    {
      value: 4500,
      label: '',
    },
  ];

  // Client Data
  const Solde: PieChartData[] = [
    {
      value: 10000,
      label: '',
    },
  ];
  const NbrVideoDone: PieChartData[] = [
    {
      value: 6,
      label: '',
    },
  ];
  const NbrCreatorsDeal: PieChartData[] = [
    {
      value: 4,
      label: '',
    },
  ];

  const customColorsSuccess = [
    theme.palette.success.dark,
    theme.palette.success.main,
    theme.palette.success.darkest,
    theme.palette.success.light,
    theme.palette.success.lightest,
  ];

  const customColorsWarnings = [
    theme.palette.warning.dark,
    theme.palette.warning.main,
    theme.palette.warning.darkest,
    theme.palette.warning.light,
    theme.palette.warning.lightest,
  ];

  return (
    <CInfosTitleWrapper title={'Dashboard'}>
      <Box sx={componentsPagesStyles(theme).componentsListWrapperColumn}>
        <Box sx={componentsPagesStyles(theme).componentWrapper}>
          <CPieChart
            hasTotal
            data={
              isAdmin
                ? NbrClients
                : isClient
                  ? Solde
                  : isCreator
                    ? NbrVideoCreated
                    : []
            }
            animation
            colors={customColorsWarnings}
          />
          <Typography variant="body2">
            {isAdmin
              ? NbrClientsMessage
              : isClient
                ? SoldeMessage
                : isCreator
                  ? NbrVideoCreatedMessage
                  : null}
          </Typography>
        </Box>
        <Box sx={componentsPagesStyles(theme).componentWrapper}>
          <CPieChart
            data={
              isAdmin
                ? NbrCreators
                : isClient
                  ? NbrVideoDone
                  : isCreator
                    ? ArgentRecu
                    : []
            }
            hasTotal
            animation
          />
          <Typography variant="body2">
            {isAdmin
              ? NbrCreatorsMessage
              : isClient
                ? NbrVideoDoneMessage
                : isCreator
                  ? AmountReceptedMessage
                  : null}
          </Typography>
        </Box>
        <Box sx={componentsPagesStyles(theme).componentWrapper}>
          <CPieChart
            data={
              isAdmin
                ? NbrVideos
                : isClient
                  ? NbrCreatorsDeal
                  : isCreator
                    ? ArgentVenir
                    : []
            }
            hasTotal
            animation
            colors={customColorsSuccess}
          />
          <Typography variant="body2">
            {isAdmin
              ? NbrVideosMessage
              : isClient
                ? NbrCreatorsDealMessage
                : isCreator
                  ? AmountUpcomingMessage
                  : null}
          </Typography>
        </Box>
      </Box>
    </CInfosTitleWrapper>
  );
};

export default Dashboard;
