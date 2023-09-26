import React, { createContext, ReactNode, useContext, useState } from "react";

import { api } from "@/utils/api";

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
  signUp: (
    username: string,
    password: string,
    avatar: string
  ) => Promise<ServerBaseResponse>;
  signIn: (username: string, password: string) => Promise<ServerBaseResponse>;
  signOut: () => void;
  drawWord: () => Promise<{ ok: boolean; data?: DrawnWord; error?: string }>;
  saveGame: (
    wordId: string,
    gameDuration: number,
    gameResult: 0 | 1
  ) => Promise<{
    ok: boolean;
    data?: {
      score: number;
    };
    error?: string;
  }>;
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

type ClearUserDataResponse = AuthenticationResponse;

type SaveGameResponse = ServerBaseResponse & {
  data: {
    updatedUserData: User;
    score: number;
  };
};

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  // UNCOMMENT TO USE MOCKED USER DATA
  const [user, setUser] = useState<User | null>(
    // {
    //   admin: true,
    //   avatar: "https://avatars.githubusercontent.com/u/43072438?v=4",
    //   createdAt: "2023-09-26T17:44:30.830Z",
    //   defeats: 0,
    //   wins: 42,
    //   games: 42,
    //   id: "902730123905109234123",
    //   playedWordsIds: [],
    //   score: 29512,
    //   username: "eduzrdo",
    // }
    null
  );
  const [loading, setLoading] = useState(false);

  const signUp = async (username: string, password: string, avatar: string) => {
    setLoading(true);

    const response = await api.post<AuthenticationResponse>("/user/sign-up", {
      username,
      password,
      avatar,
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

    setUser(response.data.data.updatedUserData);
    setLoading(false);
    return {
      ok: true,
      data: {
        score: response.data.data.score,
      },
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
