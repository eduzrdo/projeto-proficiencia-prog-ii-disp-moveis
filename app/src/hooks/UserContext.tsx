import React, { createContext, ReactNode, useContext, useState } from "react";

import { api } from "@/utils/axios";

interface User {
  id: string;
  username: string;
  avatar: string | null;
  score: number;
  wins: number;
  defeats: number;
  games: number;
  admin: boolean;
  playedWordsIds: string[];
}

export interface DrawnWord {
  id: string;
  word: string;
  tip: string;
  language: string;
}

interface ServerBaseResponse {
  ok: boolean;
  error?: string;
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
  drawWord: () => Promise<{ ok: boolean; data?: DrawnWord; error?: string }>;
  loading: boolean;
}

const UserContext = createContext({} as UserContextData);

interface UserContextProviderProps {
  children: ReactNode;
}

type AuthenticationResponse = ServerBaseResponse & {
  data?: User;
};

type DrawWordResponse = ServerBaseResponse & {
  data: DrawnWord;
};

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signUp = async (username: string, password: string) => {
    setLoading(true);

    const response = await api.post<AuthenticationResponse>("/user/signup", {
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

    const response = await api.post<AuthenticationResponse>("/user/signin", {
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

  const drawWord = async () => {
    setLoading(true);

    const response = await api.post<DrawWordResponse>("/word/draw", {
      userId: user?.id,
    });

    if (response.data.error) {
      setLoading(false);
      return {
        ok: false,
        error: response.data.error,
      };
    }

    setLoading(false);
    return {
      ok: true,
      data: response.data.data,
    };
  };

  return (
    <UserContext.Provider
      value={{
        user,
        signUp,
        signIn,
        signOut,
        drawWord,
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
