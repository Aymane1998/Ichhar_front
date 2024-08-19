import { SxProps, Theme } from '@mui/material';

interface CStepperStyles {
  wrapper: SxProps;
}

export const cStepperStyles = (theme: Theme): CStepperStyles => ({
  wrapper: {
    border: theme.palette.primary.main,
    width: '100%',
  },
});
