import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [auth, setAuth] = useState(false);
  const [userName, setUserName] = useState("");
  const [oauthToken, setOauthToken] = useState("");
  return (
    <AuthContext.Provider
      value={{
        auth,
        userName,
        setAuth,
        setUserName,
        oauthToken,
        setOauthToken,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
