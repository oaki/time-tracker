import CircularProgress from "@material-ui/core/CircularProgress";
import React, {useReducer} from "react";
import "./css/App.css";
import logo from "./images/inteles_logo.svg";
import {LoginPage} from "./pages/loginPage";
import {MainPage} from "./pages/mainPage";
import {appReducer} from "./reducer";
import {VERSION} from "./version";


export const TOKEN_NAME = "jwt-inteles-token";

export function getUserToken() {
  return localStorage.getItem(TOKEN_NAME);
}

export function saveUserToken(token) {
  return localStorage.setItem(TOKEN_NAME, token);
}

const defaultAppState = {
  isLoading: false,
  error: undefined,
  token: getUserToken()
};

function App() {
  const [appState, dispatch] = useReducer(appReducer, defaultAppState);

  // const {isLoading, error, token} = useUserToken();
  return (
    <div className="App">
      <div>
        <img src={logo} className="logo" alt="Inteles logo"/>
      </div>
      <h2>Time tracker</h2>

      {appState.error && <div style={{color: "red"}}>{appState.error}</div>}
      {appState.isLoading && <CircularProgress size={24}/>}

      {appState.token && <MainPage/>}
      {!appState.isLoading && !appState.token && <LoginPage appDispatch={dispatch}/>}

      <div style={{
        position: "absolute",
        bottom: 0,
        color: "#888",
        fontSize: "0.8rem",
        padding: "0 1rem 1rem 1rem"
      }}>GPS Geo Localization version: {VERSION}
      </div>
    </div>
  );
}

export default App;
