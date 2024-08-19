import { SxProps } from '@mui/material';

interface CPieChartStyles {
  wrapper: SxProps;
  pieChart: SxProps;
  totalTypo: SxProps;
}

export const cPieChartStyles = (): CPieChartStyles => ({
  wrapper: {
    position: 'relative',
  },

  pieChart: {
    width: '50%',
    backgroundColor: 'red',
  },

  totalTypo: {
    position: 'absolute',
    top: '50%',
    left: '33%',
    transform: 'translate(-50%, -50%)',
  },
});
