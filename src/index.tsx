import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ThemeProvider, createTheme } from '@mui/material';
import { SnackBar } from './components/SnackBar';
import './index.css';

import type { PaletteColorOptions } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      light: '#f2f4f6',
      main: '#6794c5',
      dark: '#002884',
      contrastText: '#fff',
      text: '#565656',
      background: '#f6f6f6',
      heading: '#fdfdfd',
    } as PaletteColorOptions,

    secondary: {
      light: '#ff7961',
      main: '#e6665d',
      dark: '#ba000d',
      contrastText: '#fff',
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <SnackBar>
        <App />
      </SnackBar>
    </ThemeProvider>
  </Provider>
);
