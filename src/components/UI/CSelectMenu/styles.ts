import { SxProps, Theme } from '@mui/material';

interface ProfileMenuStyles {
  icon: SxProps;
  textButton: SxProps;
  menuWrapper: SxProps;
  // eslint-disable-next-line no-unused-vars
  itemList: (isHighlighted: boolean) => SxProps;
}

export const cSelectMenuStyles = (theme: Theme): ProfileMenuStyles => ({
  icon: {
    color: 'inherit',
    '& img': {
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      objectFit: 'cover',
      border: `2px solid ${theme.palette.primary.dark}`,
    },
  },

  textButton: {
    color: 'inherit',
    textTransform: 'none',
  },

  menuWrapper: {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    minHeight: '40px',
  },

  itemList: (isHighlighted) => ({
    color: theme.palette.text.primary,
    borderTop: isHighlighted ? `1px solid ${theme.palette.divider}` : 'none',
    borderBottom: isHighlighted ? `1px solid ${theme.palette.divider}` : 'none',
    ':first-child': {
      borderTop: 'none',
    },
    ':last-child': {
      borderBottom: 'none',
    },
  }),
});
