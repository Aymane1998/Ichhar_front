export interface Color {
  lightest: string;
  light: string;
  main: string;
  dark: string;
  darkest: string;
  contrastText: string;
}

export interface ColorWithAlpha extends Color {
  alpha4: string;
  alpha8: string;
  alpha12: string;
  alpha30: string;
  alpha50: string;
}

export interface PriorityColor {
  priority1: string;
  priority2: string;
  priority3: string;
  priority4: string;
  priority5: string;
}
