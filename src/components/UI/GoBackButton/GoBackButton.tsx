import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { Box, Button, useTheme } from '@mui/material';

const GoBackButton = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ marginBottom: theme.spacing(2) }}>
      <Button variant="contained" onClick={() => navigate(-1)}>
        <ArrowBackIcon /> Retour
      </Button>
    </Box>
  );
};

export default GoBackButton;
