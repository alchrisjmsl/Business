// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const PLANS = {
  free: { name: 'Free', price: 0, canSeeResult: false },
  monthly: { name: 'Pro Monthly', price: 4.99, canSeeResult: true },
  yearly: { name: 'Pro Yearly', price: 39.99, canSeeResult: true },
  lifetime: { name: 'Lifetime', price: 99.99, canSeeResult: true },
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // null = not logged in
  const [plan, setPlan] = useState('free');

  const login = (email) => {
    setUser({ email, joinedAt: new Date() });
  };

  const logout = () => {
    setUser(null);
    setPlan('free');
  };

  const subscribe = (planKey) => {
    setPlan(planKey);
  };

  const canSeeResult = PLANS[plan]?.canSeeResult ?? false;

  return (
    <AuthContext.Provider value={{ user, plan, login, logout, subscribe, canSeeResult, PLANS }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
