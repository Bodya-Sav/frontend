import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isauth, setIsAuth] = useState(false);
  const [chatid, setChatId] = useState("");

  return (
    <AuthContext.Provider
      value={{ isAdmin, setIsAdmin, isauth, setIsAuth, chatid, setChatId }}
    >
      {children}
    </AuthContext.Provider>
  );
};
