import { useState, useCallback, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import Users from "./users/pages/Users";
import Authenticate from "./users/pages/Authenticate";
import Messages from "./messages/pages/Messages";
import MainNavigation from "./shared/components/navigation/MainNavigation";

import { AuthContext } from "./shared/components/context/auth-context";

import "./App.css";

const queryClient = new QueryClient();
let logoutTimer;

function App() {
  const [token, setToken] = useState(false);
  const [userId, setuser] = useState(false);
  const [username, setusername] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState(false);

  const login = useCallback((uid, token, username) => {
    setToken(token);
    setuser(uid);
    setusername(username);
    const tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60);
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem(
      "userData",
      JSON.stringify({userId: uid,
         token: token,
          username: username,
        expiration: tokenExpirationDate.toISOString()
      })
    )
  }, []);

useEffect(() => {
  const storedData = JSON.parse(localStorage.getItem('userData'));
  if (storedData && storedData.token) {
    login(storedData.userId, storedData.token);
  }
}, [login]);

  const logout = useCallback(() => {
    setToken(null);
    setuser(null);
    setusername("");
    setTokenExpirationDate(null);
    localStorage.removeItem("userData");
  }, []);

useEffect(() => {
  if (token && tokenExpirationDate) {
    const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
    logoutTimer = setTimeout(logout, remainingTime);
  } else {
    clearTimeout(logoutTimer);
  }
}, [token, logout, tokenExpirationDate]);

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Messages />
        </Route>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/users" exact>
          <Users />
        </Route>
        <Route path="/auth">
          <Authenticate />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
        username: username,
      }}
    >
      <QueryClientProvider client={queryClient}>
        <Router>
          <MainNavigation />
          <main>{routes}</main>
        </Router>
      </QueryClientProvider>
    </AuthContext.Provider>
  );
}

export default App;
