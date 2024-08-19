import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface SimplePaletteColorOptions {
    lightest?: string;
    darkest?: string;
  }

  interface PaletteOptions {
    primary?: SimplePaletteColorOptions;
    secondary?: SimplePaletteColorOptions;
    // Ajoutez d'autres couleurs ici si nécessaire
  }

  interface Palette {
    primary: SimplePaletteColorOptions;
    secondary?: SimplePaletteColorOptions;
    // Ajoutez d'autres couleurs ici si nécessaire
  }

  interface PaletteColor {
    lightest: string;
    darkest: string;
  }
}
