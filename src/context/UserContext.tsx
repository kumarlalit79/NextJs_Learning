"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";

type UserContextType = {
    user: userType | null | undefined,
    setUser: (user: userType) => void
};

type userType = {
  name: string;
  email: string;
  id: string;
  image?: string;
};

const userDataContext = React.createContext<UserContextType | undefined>(
  undefined,
);

const UserContext = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<userType | null>();


  useEffect(() => {
    async function getUser() {
      try {
        const result = await axios.get("/api/user");
        setUser(result.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, []);

  return (
    <userDataContext.Provider value={{user, setUser}}>
        {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
