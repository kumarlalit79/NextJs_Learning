"use client"
import axios from "axios";
import { useSession } from "next-auth/react";
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

export const userDataContext = React.createContext<UserContextType | undefined>(
  undefined,
);

const UserContext = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<userType | null>();
  const session = useSession()

  useEffect(() => {
    async function getUser() {
      try {
        const result = await axios.get("/api/user");
        setUser(result.data.user);
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [session]);

  return (
    <userDataContext.Provider value={{user, setUser}}>
        {children}
    </userDataContext.Provider>
  );
};

export default UserContext;
