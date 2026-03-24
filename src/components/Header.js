// src/components/Header.js
import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Header.css';

export default function Header({ onUpgrade }) {
  const { user, plan, logout, canSeeResult } = useAuth();

  return (
    <header className="header">
      <div className="header__logo">
        <span className="header__logo-icon">⬡</span>
        CalcPro
      </div>
      <div className="header__right">
        {user ? (
          <>
            {!canSeeResult && (
              <button className="header__upgrade" onClick={onUpgrade}>
                ✦ Upgrade
              </button>
            )}
            {canSeeResult && (
              <span className="header__pro-badge">PRO</span>
            )}
            <button className="header__logout" onClick={logout} title={`Signed in as ${user.email}`}>
              {user.email.slice(0, 2).toUpperCase()}
            </button>
          </>
        ) : (
          <button className="header__upgrade" onClick={onUpgrade}>
            Sign In
          </button>
        )}
      </div>
    </header>
  );
}
