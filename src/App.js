import React, {useState} from "react";
import "./App.css";
import logo from "./inteles_logo.svg";
import {LoginPage} from "./loginPage";
import {MainPage} from "./mainPage";


function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="App">
      <div>
        <img src={logo} className="logo" alt="Inteles logo" />
      </div>

      {isLogin && <MainPage />}
      {!isLogin && <LoginPage setIsLogin={setIsLogin}/>}
    </div>
  );
}

export default App;
