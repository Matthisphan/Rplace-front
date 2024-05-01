import ReactDOM from 'react-dom/client';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import theme from './themes';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
