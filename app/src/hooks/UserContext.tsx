import React, { createContext, ReactNode, useContext, useState } from "react";

import { api } from "@/utils/axios";

interface User {
  id: string;
  username: string;
  avatar: string | null;
  score: number;
  wins: number;
  defeats: number;
  admin: boolean;
}

interface UserContextData {
  user: User | null;
  signUp: (
    username: string,
    password: string
  ) => Promise<{ ok: boolean; error?: string }>;
  signIn: (
    username: string,
    password: string
  ) => Promise<{ ok: boolean; error?: string }>;
  signOut: () => void;
  loading: boolean;
}

const UserContext = createContext({} as UserContextData);

interface UserContextProviderProps {
  children: ReactNode;
}

type SignInResponse = {
  ok: boolean;
  error?: string;
  data?: User;
};

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signUp = async (username: string, password: string) => {
    setLoading(true);

    const response = await api.post<SignInResponse>("/user/signup", {
      username,
      password,
    });

    if (response.data.error) {
      setLoading(false);
      return {
        ok: false,
        error: response.data.error,
      };
    }

    if (response.data.data) {
      setUser(response.data.data);
    }
    setLoading(false);
    return {
      ok: true,
    };
  };

  const signIn = async (username: string, password: string) => {
    setLoading(true);

    const response = await api.post<SignInResponse>("/user/signin", {
      username,
      password,
    });

    if (response.data.error) {
      setLoading(false);
      return {
        ok: false,
        error: response.data.error,
      };
    }

    if (response.data.data) {
      setUser(response.data.data);
    }

    setLoading(false);
    return {
      ok: true,
    };
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        signUp,
        signIn,
        signOut,
        loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const value = useContext(UserContext);
  return value;
};
