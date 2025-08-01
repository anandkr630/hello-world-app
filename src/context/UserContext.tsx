// context/UserContext.tsx
import React, { createContext, useContext, useState } from "react";

interface User {
  name: string;
  email: string;
  password: string;
  isRegistered: boolean;
  isEmailVerified: boolean;
  isLoggedIn: boolean;
  bio?: string;
  skills?: string[];
  links?: {
    linkedin?: string;
    github?: string;
  };
  mentorship?: {
    gurus?: string[];
    shishyas?: string[];
  };
  payments?: {
    paid?: string;
    received?: string;
    lastPaymentDate?: string;
  };
}

interface UserContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const defaultUser: User = {
  name: "",
  email: "",
  password: "",
  isRegistered: false,
  isEmailVerified: false,
  isLoggedIn: false,
};

const UserContext = createContext<UserContextType>({
  user: defaultUser,
  setUser: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(defaultUser);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
