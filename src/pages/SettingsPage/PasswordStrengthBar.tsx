import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { Box, ThemeProvider, Typography, createTheme } from '@mui/material';

interface PasswordStrengthBarProps {
  password: string;
  score: number; // Définition de l'interface pour les props
}
const PasswordStrengthBar: React.FC<PasswordStrengthBarProps> = ({
  password,
}) => {
  let score = 0;
  const conditions = [
    /.{8,}/, // Au moins 8 caractères
    /[a-z]/, // Au moins une minuscule
    /[A-Z]/, // Au moins une majuscule
    /[0-9]/, // Au moins un chiffre
    /[$&+,:;=?@#|'<>.^*()%!-]/, // Au moins un caractère spécial
  ];

  conditions.forEach((condition) => {
    if (condition.test(password)) score += 1;
  });

  const getColor = () => {
    switch (score) {
      case 1:
        return '#f57c00'; // Rouge
      case 2:
        return '#f6e58d'; // jaune
      case 3:
      case 4:
        return '#66bb6a'; // Vert
      case 5:
        return '#388e3c'; // Vert foncé
      default:
        return '#EEE'; // Gris par défaut
    }
  };

  const getLabel = () => {
    switch (score) {
      case 1:
        return 'Très faible';
      case 2:
        return 'Faible';
      case 3:
        return 'Moyen';
      case 4:
        return 'Fort';
      case 5:
        return 'Très fort';
      default:
        return 'Invalide';
    }
  };

  const customTheme = createTheme({
    components: {
      MuiLinearProgress: {
        styleOverrides: {
          bar: {
            backgroundColor: getColor(),
          },
        },
      },
    },
  });

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ width: '100%', mt: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Sécurité du mot de passe: {getLabel()}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={(score / 5) * 100}
          sx={{
            height: 10,
            borderRadius: 5,
            backgroundColor: 'grey',
          }}
        />
      </Box>
    </ThemeProvider>
  );
};

export default PasswordStrengthBar;
