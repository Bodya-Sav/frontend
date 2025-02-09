import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user_id, setId] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isauth, setIsAuth] = useState(false);
  const [isSuper, setIsSuper] = useState(false);

  return (
    <AuthContext.Provider
      value={{
        isAdmin,
        setIsAdmin,
        isauth,
        setIsAuth,
        isSuper,
        setIsSuper,
        user_id,
        setId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
