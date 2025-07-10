import React, { createContext, useContext } from "react";

type UserContextType = {
  name: string;
  isRegistered: boolean;
  isEmailVerified: boolean;
};

const dummyUser = {
  name: "Anand",
  isRegistered: true,
  isEmailVerified: true,
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <UserContext.Provider value={dummyUser}>{children}</UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
