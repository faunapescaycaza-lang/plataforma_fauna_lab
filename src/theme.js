import { createTheme } from '@mui/material/styles';

const theme = (mode) => createTheme({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#26a69a', // A modern teal green
          },
          secondary: {
            main: '#d32f2f',
          },
        }
      : {
          // palette values for dark mode
          primary: {
            main: '#26a69a', // Using the same modern teal green for dark mode
          },
          secondary: {
            main: '#f44336',
          },
          background: {
            default: '#121212',
            paper: '#1e1e1e',
          },
        }),
  },
});

export default theme;
