import { Box, Typography, useTheme } from '@mui/material';

import { settingsPageStyles } from '../styles';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

type ValidationItemProps = {
  validated: boolean;
  conditionMessage: string;
};

const ValidationItem = ({
  validated,
  conditionMessage,
}: ValidationItemProps) => {
  const theme = useTheme();

  return (
    <Box sx={settingsPageStyles(theme).itemValidationWrapper}>
      {validated ? <DoneIcon color="success" /> : <CloseIcon color="error" />}
      <Typography
        variant="body2"
        sx={{ color: theme.palette[validated ? 'success' : 'error'].main }}
      >
        {conditionMessage}
      </Typography>
    </Box>
  );
};

export default ValidationItem;
