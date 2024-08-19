import { Box, Typography, useTheme } from '@mui/material';
// import fusee from 'src/assets/images/starship.png';
import sx from 'mui-sx';

import { landingPageStyles } from './styles';
import { useAppSelector } from 'src/hooks';
import LogoIchhar from '../../assets/logo_ichhar.png';

const LandingPage = () => {
  const theme = useTheme();
  const user = useAppSelector((state) => state.auth.userInfos.data);

  console.log('user', user.groups);

  return (
    <Box sx={landingPageStyles(theme).mainWrapper}>
      <Box sx={landingPageStyles(theme).cardContainer}>
        <Typography variant="h2" sx={landingPageStyles(theme).title}>
          Bonjour
          <Typography component="span" sx={landingPageStyles(theme).username}>
            {' '}
            {user?.first_name} {user?.last_name}
          </Typography>
        </Typography>
      </Box>
      <Box
        sx={sx(
          landingPageStyles(theme).cardContainer,
          landingPageStyles(theme).infosContainer,
        )}
      >
        <Box sx={landingPageStyles(theme).infosText}>
          <Typography variant="h3" sx={landingPageStyles(theme).infosTitle}>
            {"Bienvenue sur l'application de Génération de contenu UGC Ichhar."}
          </Typography>
          <Typography variant="body1" paragraph>
            {
              'Cette application est faite pour vous accompagner pour toutes vos démarches publicitaires.'
            }
          </Typography>
        </Box>
        <Box sx={landingPageStyles(theme).infosImage}>
          <img src={LogoIchhar} alt="fusee" />
        </Box>
      </Box>
    </Box>
  );
};

export default LandingPage;
