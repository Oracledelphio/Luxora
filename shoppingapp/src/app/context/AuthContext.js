"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    isLoggedIn: false,
    username: null,
    email: null,
  });

  // Load auth state from localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem("auth");
    console.log("Stored Auth from localStorage:", storedAuth); // 🔍 Debugging Line

    if (storedAuth) {
      setAuth(JSON.parse(storedAuth));
    }
  }, []);

  const login = (username, email) => {
    const newAuthState = {
      isLoggedIn: true,
      username,
      email,
    };
    setAuth(newAuthState);
    localStorage.setItem("auth", JSON.stringify(newAuthState)); // Save to localStorage
    console.log("User Logged In:", newAuthState); // 🔍 Debugging Line
  };

  const logout = () => {
    setAuth({
      isLoggedIn: false,
      username: null,
      email: null,
    });
    localStorage.removeItem("auth"); // Clear storage on logout
    console.log("User Logged Out"); // 🔍 Debugging Line
  };

  console.log("Current Auth State:", auth); // 🔍 Debugging Line

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
