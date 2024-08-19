import { SxProps } from '@mui/system';
import { Theme } from '@mui/material';

interface SettingsPageStyles {
  mainWrapper: SxProps;
  card: SxProps;
  title: SxProps;
  optionsWrapper: SxProps;
  avatarWrapper: SxProps;
  importAvatarWrapper: SxProps;
  divider: SxProps;
  passwordWrapper: SxProps;
  itemValidationWrapper: SxProps;
  validationPasswordWrapper: SxProps;
}

export const settingsPageStyles = (theme: Theme): SettingsPageStyles => ({
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
  },

  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    paddingBlock: theme.spacing(2),
  },

  title: {
    paddingInline: theme.spacing(2),
    textAlign: 'center',
  },

  optionsWrapper: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    [theme.breakpoints.down('md')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },

  avatarWrapper: {
    backgroundColor: theme.palette.background.paper,
    paddingInline: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },

  importAvatarWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(2),
    '& > img': {
      width: '150px',
      height: '150px',
      borderRadius: '50%',
      objectFit: 'cover',
    },
  },

  divider: {
    width: '100%',
    color: theme.palette.divider,
    marginBlock: theme.spacing(2),
  },

  passwordWrapper: {
    paddingInline: theme.spacing(2),
  },

  itemValidationWrapper: {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
  },

  validationPasswordWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
  },
});
