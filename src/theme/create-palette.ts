import { alpha } from '@mui/material/styles';
import {
  error,
  info,
  neutral,
  success,
  warning,
  freeRed,
  errorDark,
  warningDark,
  infoDark,
  successDark,
  priorityColors,
  secondary,
} from './colors';
import { PriorityColor } from './Color';

declare module '@mui/material/styles' {
  interface Palette {
    priorityColors: PriorityColor;
  }
  interface PaletteOptions {
    priorityColors: PriorityColor;
  }
}

export function createPalette(mode: 'light' | 'dark') {
  return {
    action:
      mode === 'light'
        ? {
            active: neutral[500],
            disabled: alpha(neutral[900], 0.38),
            disabledBackground: alpha(neutral[900], 0.12),
            focus: alpha(neutral[900], 0.16),
            hover: alpha(neutral[900], 0.04),
            selected: alpha(neutral[900], 0.12),
          }
        : {
            active: neutral[200],
            disabled: alpha(neutral[50], 0.38),
            disabledBackground: alpha(neutral[50], 0.12),
            focus: alpha(neutral[50], 0.16),
            hover: alpha(neutral[50], 0.04),
            selected: alpha(neutral[50], 0.12),
          },
    background:
      mode === 'light'
        ? {
            default: '#fff',
            paper: '#f5f5f5',
          }
        : {
            default: '#121212',
            paper: '#2A2A2A',
          },
    divider: mode === 'light' ? '#D5D5D5' : '#474747',
    error: mode === 'light' ? error : errorDark,
    info: mode === 'light' ? info : infoDark,
    mode: mode,
    neutral,
    primary: freeRed,
    secondary: secondary,
    priorityColors: priorityColors, // Ajout ici de la palette de couleurs de prio
    success: mode === 'light' ? success : successDark,
    text:
      mode === 'light'
        ? {
            primary: neutral[900],
            secondary: neutral[500],
            disabled: alpha(neutral[900], 0.38),
          }
        : {
            primary: neutral[50],
            secondary: neutral[300],
            disabled: alpha(neutral[50], 0.38),
          },
    warning: mode === 'light' ? warning : warningDark,
  };
}
