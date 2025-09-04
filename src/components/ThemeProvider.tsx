'use client';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2563eb',
    },
    secondary: {
      main: '#64748b',
    },
  },
  typography: {
    fontFamily: 'var(--font-geist-sans), system-ui, sans-serif',
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: 'white',
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          marginBottom: '16px',
        },
      },
    },
  },
});

export default function AppThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}