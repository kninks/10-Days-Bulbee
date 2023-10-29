// import { createContext, useState } from 'react'

// const AuthContext = createContext({})


// export const AuthProvider({{children}}) {
//   const [auth, setAuth] = useState({});

//   return (
//     <AuthContext.Provider value={{auth, setAuth}}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export default AuthContext;

import React, { createContext, useState, ReactNode, SetStateAction, Dispatch } from 'react';

type AuthType = {
  // Define your auth type here
  // For example: token: string | null;
  // authenticated: false,

};

type AuthContextType = {
  auth: AuthType;
  setAuth: Dispatch<SetStateAction<AuthType>>;
};

const AuthContext = createContext<AuthContextType>({
  auth: {},
  setAuth: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [auth, setAuth] = useState<AuthType>({});

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
