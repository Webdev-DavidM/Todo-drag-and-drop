import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ThemeProvider, createTheme } from "@mui/material";
import { SnackBar } from "./components/SnackBar";
import "./index.css";

const theme = createTheme({
  palette: {
    primary: {
      light: "#f2f4f6",
      main: "#3f78b5",
      dark: "#002884",
      contrastText: "#fff",
    },

    secondary: {
      light: "#ff7961",
      main: "#ec4a3f",
      dark: "#ba000d",
      contrastText: "#fff",
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
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
