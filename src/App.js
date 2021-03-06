import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import TopBar from "./components/TopBar/TopBar";
import axios from "axios";
import AuthContextProvider from "./contexts/authContext";
import StatsContextProvider from "./contexts/statsContext";
import Login from "./pages/Login";
import Sidebar from "./components/SIdebar/Sidebar";
import PrivateRoute from "./components/PrivateRoute.js/PrivateRoute";
import Admin from "./pages/Admin";
import QuizPages from "./pages/QuizPages";
axios.defaults.baseURL = process.env.REACT_APP_API_PATH;
axios.defaults.withCredentials = true;

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <StatsContextProvider>
            <Router basename="/">
              <TopBar />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
              </Switch>
            </Router>
            <Router basename="/admin">
              <Sidebar />
              <Switch>
                <Route path="/login">
                  <Login />
                </Route>
                <PrivateRoute exact path="/quiz/today">
                  <Admin />
                </PrivateRoute>
                <PrivateRoute path="/add-quiz">
                  <QuizPages add />
                </PrivateRoute>
              </Switch>
            </Router>
          </StatsContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
