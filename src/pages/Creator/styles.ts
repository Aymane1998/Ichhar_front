import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

interface CreatoPagetyles {
  mainWrapper: SxProps;
  cardContainer: SxProps;
  cardsContainer: SxProps;
}

export const creatorPagetyles = (theme: Theme): CreatoPagetyles => ({
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },
  cardsContainer: {
    padding: theme.spacing(3),
    width: '33%',
  },

  cardContainer: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(3),
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(3),
    justifyContent: 'center',
  },
});
