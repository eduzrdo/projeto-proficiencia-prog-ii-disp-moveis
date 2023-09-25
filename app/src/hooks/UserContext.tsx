import React, { createContext, ReactNode, useContext, useState } from "react";

import { api } from "@/utils/axios";

export interface User {
  id: string;
  username: string;
  avatar: string | null;
  score: number;
  wins: number;
  defeats: number;
  games: number;
  admin: boolean;
  playedWordsIds: string[];
  createdAt: string;
}

export interface DrawnWord {
  id: string;
  word: string;
  normalizedWord: string;
  tip: string;
  language: string;
}

// RESPONSE FOR CLIENT ACTIONS THAT DON'T RETURN ANYTHING BUT BASE RESPONSE
// RETURNED DATA ARE USED WITHIN CONTEXT ONLY
type ServerBaseResponse = {
  ok: boolean;
  error?: string;
};

interface UserContextData {
  user: User | null;
  signUp: (username: string, password: string) => Promise<ServerBaseResponse>;
  signIn: (username: string, password: string) => Promise<ServerBaseResponse>;
  signOut: () => void;
  drawWord: () => Promise<{ ok: boolean; data?: DrawnWord; error?: string }>;
  saveGame: (
    wordId: string,
    gameDuration: number,
    gameResult: 0 | 1
  ) => Promise<ServerBaseResponse>;
  clearUserData: (
    targetUserId: string
  ) => Promise<{ ok: boolean; data?: User; error?: string }>;
  loading: boolean;
}

const UserContext = createContext({} as UserContextData);

interface UserContextProviderProps {
  children: ReactNode;
}

type AuthenticationResponse = ServerBaseResponse & {
  data: User;
};

type DrawWordResponse = ServerBaseResponse & {
  data: DrawnWord;
};

type SaveGameResponse = AuthenticationResponse;
type ClearUserDataResponse = AuthenticationResponse;

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  const signUp = async (username: string, password: string) => {
    setLoading(true);

    const response = await api.post<AuthenticationResponse>("/user/sign-up", {
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

    setUser(response.data.data);
    setLoading(false);
    return {
      ok: true,
    };
  };

  const signIn = async (username: string, password: string) => {
    setLoading(true);

    const response = await api.post<AuthenticationResponse>("/user/sign-in", {
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

    setUser(response.data.data);
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

  const saveGame = async (
    wordId: string,
    gameDuration: number,
    gameResult: 0 | 1
  ) => {
    const response = await api.post<SaveGameResponse>("/user/save-game", {
      userId: user?.id,
      wordId,
      gameDuration,
      gameResult,
    });

    if (response.data.error) {
      setLoading(false);
      return {
        ok: false,
        error: response.data.error,
      };
    }

    setUser(response.data.data);
    setLoading(false);
    return {
      ok: true,
    };
  };

  const clearUserData = async (targetUserId: string) => {
    setLoading(true);

    const response = await api.post<ClearUserDataResponse>(
      "/user/clear-user-data",
      {
        adminId: user?.id,
        targetUserId,
      }
    );

    if (response.data.error) {
      setLoading(false);
      return {
        ok: false,
        error: response.data.error,
      };
    }

    if (response.data.data.id === user?.id) {
      setUser(response.data.data);
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
        saveGame,
        clearUserData,
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
