import React, { createContext, ReactNode, useEffect, useState } from "react";

interface IAuthContextData {
  user: User;
}

interface User {
  id: string,
  name: string,
  email: string,
  photo?: string
}

export const AuthContext = createContext({} as IAuthContextData);
     
export function AuthProvider({ children }: ChildrenContextProps) {

  const [user, setUser] = useState<User>({} as User);


  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}