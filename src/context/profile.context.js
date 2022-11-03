import React, { createContext, useContext, useState } from "react";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [location, setLocation] = useState();
  const [notify, setNotify] = useState({ flag: false, message: null });
  return (
    <ProfileContext.Provider
      value={{ user, setUser, location, setLocation, notify, setNotify }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
