// import React, { createContext, useState } from "react";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user_id, setId] = useState("");
//   const [isAdmin, setIsAdmin] = useState(false);
//   const [isauth, setIsAuth] = useState(false);
//   const [isSuper, setIsSuper] = useState(false);

//   return (
//     <AuthContext.Provider
//       value={{
//         isAdmin,
//         setIsAdmin,
//         isauth,
//         setIsAuth,
//         isSuper,
//         setIsSuper,
//         user_id,
//         setId,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// };

import create from "zustand";

export const useAuthStore = create((set) => ({
  user_id: "",
  isAdmin: false,
  isAuth: false,
  isSuper: false,
  setId: (id) => set({ user_id: id }),
  setIsAdmin: (value) => set({ isAdmin: value }),
  setIsAuth: (value) => set({ isAuth: value }),
  setIsSuper: (value) => set({ isSuper: value }),
}));
