import { SxProps, Theme } from '@mui/material';

interface AppBarMenuStyles {
  navbarButton: SxProps;
  iconButton: SxProps;
  menuPadding: SxProps;
  menuContainer: SxProps;
  tooltipElements: SxProps;
}

export const appBarMenuStyles = (theme: Theme): AppBarMenuStyles => ({
  navbarButton: {
    padding: theme.spacing(0.5, 1),
    color: theme.palette.primary.contrastText,
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
    },
  },

  iconButton: {
    padding: 1,
    backgroundColor: theme.palette.success.main,
  },

  menuPadding: {
    paddingTop: theme.spacing(2),
    backgroundColor: theme.palette.primary.main,
  },

  menuContainer: {
    backgroundColor: theme.palette.primary.darkest,
    position: 'absolute',
    minWidth: '200px',
    borderEndStartRadius: theme.shape.borderRadius,
    borderEndEndRadius: theme.shape.borderRadius,
    zIndex: 0,
  },
  tooltipElements: {
    display: 'flex',
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(1),
    textAlign: 'center',
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    marginBottom: '10px',
  },
});
