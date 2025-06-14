import React, { createContext, useEffect, useState } from "react";
import Myroutes from "./Myroutes";
import "./App.css";
import { getUser, isAuthenticated } from "./api/userApi";
import { Provider } from "react-redux";
import { store } from "./Components/redux/store";

export const userContext = createContext();
const App = () => {
  let [user, setUser] = useState({});

  let { token } = isAuthenticated() || {};
  useEffect(() => {
    if (token) {
      getUser(token).then((data) => {
        if (data.error) {
          console.log(data.error);
          setUser(null);
        } else {
          setUser(data.user);
        }
      });
    }
  }, [token]);
  return (
    <>
      <userContext.Provider value={{ user, setUser }}>
        <Provider store={store}>
          <Myroutes />
        </Provider>
      </userContext.Provider>
    </>
  );
};

export default App;
