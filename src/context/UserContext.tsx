import React, { createContext, useState, useContext, useEffect, type ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import type { User } from "../type/type";

interface UserContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  logout: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  // Load user from AsyncStorage
  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("currentUser");
        if (storedUser) setCurrentUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to load user:", error);
      }
    };
    loadUser();
  }, []);

  // Persist user whenever it changes
  useEffect(() => {
    const saveUser = async () => {
      try {
        if (currentUser) {
          await AsyncStorage.setItem("currentUser", JSON.stringify(currentUser));
        } else {
          await AsyncStorage.removeItem("currentUser");
        }
      } catch (error) {
        console.error("Failed to save user:", error);
      }
    };
    saveUser();
  }, [currentUser]);

  // Logout user
  const logout = async () => {
    try {
      setCurrentUser(null);
      await AsyncStorage.removeItem("currentUser"); // ✅ clear storage
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  };

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
