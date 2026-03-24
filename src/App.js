// src/App.js
import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Calculator from './components/Calculator';
import PaywallModal from './components/PaywallModal';
import './App.css';

function AppContent() {
  const [showPaywall, setShowPaywall] = useState(false);

  return (
    <div className="app">
      {/* Background grid */}
      <div className="app__bg" aria-hidden="true">
        <div className="app__grid" />
        <div className="app__glow app__glow--1" />
        <div className="app__glow app__glow--2" />
      </div>

      <Header onUpgrade={() => setShowPaywall(true)} />

      <main className="app__main">
        <div className="app__hero">
          <h1 className="app__title">
            Pinaka Smart na Calculator<br />
            <span>By Alchris June Jamisola</span>
          </h1>
          <p className="app__desc">
            dle ka ma zero pag kani imo gamiton
          </p>
        </div>
        <Calculator />
      </main>

      <footer className="app__footer">
        <p>© 2025 CalcPro · <a href="#pricing">Pricing</a> · <a href="#privacy">Privacy</a></p>
      </footer>

      {showPaywall && <PaywallModal onClose={() => setShowPaywall(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
