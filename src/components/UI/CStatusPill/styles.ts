/* eslint-disable no-unused-vars */
import { SxProps, Theme } from '@mui/material';

interface CLongtextBoxStyles {
  pill: (
    // eslint-disable-next-line prettier/prettier
    severity: 'primary' | 'secondary' | 'error' | 'info' | 'warning' | 'success'
  ) => SxProps;
}

export const cStatusPillStyles = (theme: Theme): CLongtextBoxStyles => ({
  pill: (severity) => ({
    alignItems: 'center',
    backgroundColor: theme.palette[severity].lightest,
    borderRadius: 12,
    color: theme.palette[severity].main,
    cursor: 'default',
    display: 'inline-flex',
    flexGrow: 0,
    flexShrink: 0,
    fontFamily: theme.typography.fontFamily,
    fontSize: theme.typography.pxToRem(12),
    lineHeight: 2,
    fontWeight: 600,
    justifyContent: 'center',
    letterSpacing: 0.5,
    minWidth: 20,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
  }),
});
