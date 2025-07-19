import React, { createContext, useContext, useState } from "react";

type UserContextType = {
  name: string;
  isRegistered: boolean;
  isEmailVerified: boolean;
};

type UserContextValue = {
  user: UserContextType;
  setUser: React.Dispatch<React.SetStateAction<UserContextType>>;
};

const defaultUser: UserContextType = {
  name: "",
  isRegistered: false,
  isEmailVerified: false,
};

const UserContext = createContext<UserContextValue | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserContextType>(defaultUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
