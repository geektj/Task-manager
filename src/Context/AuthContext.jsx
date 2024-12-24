import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => localStorage.getItem('user'));

  const login = (username) => {
    setUser(username);
    localStorage.setItem('user', username);
  };

  const register = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    if (users[username]) {
      throw new Error('User already exists');
    }
    users[username] = password;
    localStorage.setItem('users', JSON.stringify(users));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const validateLogin = (username, password) => {
    const users = JSON.parse(localStorage.getItem('users')) || {};
    return users[username] === password;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, validateLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);