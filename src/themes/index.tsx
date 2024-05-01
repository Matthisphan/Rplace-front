import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF4500',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
  },
});

export default theme;
