import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import drac from './assets/colors.json';

const draculaTtheme = createTheme({
  palette: {
    background: drac.black,

    backgroundSecondary: drac.blackSecondary,

    common: {
      black: drac.black,
      white: drac.white
    },

    primary: {
      main: drac.purple,
      contrastText: drac.black
    },

    secondary: {
      main: drac.cyan,
      contrastText: drac.black
    },

    text: {
      primary: drac.white,
      secondary: drac.white,
      disabled: drac.red
    },

    others: {
      cyan: drac.cyan,
      green: drac.green,
      orange: drac.orange,
      pink: drac.pink,
      purple: drac.purple,
      red: drac.red,
      yellow: drac.yellow,
    },
  },
});


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ThemeProvider theme={draculaTtheme}>
    <App />
  </ ThemeProvider>
  // </React.StrictMode>,
);
