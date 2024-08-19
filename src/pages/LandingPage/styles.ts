import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

interface LandingPageStyles {
  mainWrapper: SxProps;
  cardContainer: SxProps;
  title: SxProps;
  username: SxProps;
  infosContainer: SxProps;
  infosTitle: SxProps;
  infosText: SxProps;
  infosImage: SxProps;
  wrapper: SxProps;
  headerStyles: SxProps;
}

export const landingPageStyles = (theme: Theme): LandingPageStyles => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(4),
  },

  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },

  cardContainer: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(3),
    margin: '0 auto',
  },

  title: {
    fontWeight: 500,
    marginBlock: theme.spacing(3),
  },
  headerStyles: {
    color: 'red',
  },

  username: {
    fontWeight: 'bold',
    fontSize: '1em',
    color: theme.palette.primary.main,
  },

  infosContainer: {
    display: 'flex',
    gap: theme.spacing(3),
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  infosTitle: {
    fontWeight: 700,
    color: theme.palette.primary.main,
  },

  infosText: {
    '& p': {
      textAlign: 'justify',
    },
  },

  infosImage: {
    '& > img': {
      width: 200,
    },
  },
});
