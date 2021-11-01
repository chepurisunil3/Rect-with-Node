import "./App.css";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import configureStore from "./redux/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { getUser } from "./redux/actions/login-details";
import Routes from "./pages/routing/routes";
const store = configureStore();
const theme = createTheme({
  palette: {
    primary: {
      main: "#B980F0",
    },
  },
});
function App() {
  useEffect(() => {
    console.log(localStorage.token);
    if (localStorage.token) {
      store.dispatch(getUser());
    }

    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: "LOGOUT" });
    });
  }, []);
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <Routes />
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
