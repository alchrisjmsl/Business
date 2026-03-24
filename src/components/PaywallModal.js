// src/components/PaywallModal.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './PaywallModal.css';

export default function PaywallModal({ onClose }) {
  const { user, plan, login, subscribe, PLANS } = useAuth();
  const [email, setEmail] = useState('');
  const [step, setStep] = useState('plans');
  const [selectedPlan, setSelectedPlan] = useState('monthly');
  const [cardNum, setCardNum] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [paid, setPaid] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim()) {
      login(email.trim());
      setStep('plans');
    }
  };

  const handlePay = (e) => {
    e.preventDefault();
    // Simulate payment success
    subscribe(selectedPlan);
    setPaid(true);
    setTimeout(() => onClose(), 1800);
  };

  const planOptions = [
    { key: 'monthly', label: 'Monthly', price: '₱11,349.99/mo', badge: null },
    { key: 'yearly', label: 'Yearly', price: '₱113,499.9/yr', badge: 'SAVE 33%' },
    { key: 'lifetime', label: 'Lifetime', price: '₱1,134,999', badge: 'BEST DEAL' },
  ];

  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button className="modal__close" onClick={onClose}>✕</button>

        {paid ? (
          <div className="modal__success">
            <div className="modal__success-icon">✓</div>
            <h2>You're in!</h2>
            <p>Unlocking your result…</p>
          </div>
        ) : step === 'login' ? (
          <>
            <div className="modal__badge">PRO ACCESS</div>
            <h2 className="modal__title">See Your Result Pag Bayad sa waa ka!!</h2>
            <p className="modal__sub">Sign in or create an account to continue</p>
            <form className="modal__form" onSubmit={handleLogin}>
              <label className="modal__label">Email address</label>
              <input
                className="modal__input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
              <button type="submit" className="modal__btn modal__btn--primary">
                Continue →
              </button>
            </form>
            <p className="modal__footer-note">Free accounts cannot view results. Upgrade to Pro.</p>
          </>
        ) : step === 'plans' ? (
          <>
            <div className="modal__badge">CHOOSE PLAN</div>
            <h2 className="modal__title">Pagbayad sa!!!</h2>
            <p className="modal__sub">Unlimited results, history & more</p>
            <div className="modal__plans">
              {planOptions.map((p) => (
                <button
                  key={p.key}
                  className={`plan-card ${selectedPlan === p.key ? 'plan-card--active' : ''}`}
                  onClick={() => setSelectedPlan(p.key)}
                >
                  {p.badge && <span className="plan-card__badge">{p.badge}</span>}
                  <span className="plan-card__name">{p.label}</span>
                  <span className="plan-card__price">{p.price}</span>
                </button>
              ))}
            </div>
            <ul className="modal__perks">
              <li>✦ Unlimited calculations</li>
              <li>✦ View all results instantly</li>
              <li>✦ Calculation history</li>
              <li>✦ maka uyab kag duha</li>
            </ul>
            <button className="modal__btn modal__btn--primary" onClick={() => setStep('payment')}>
              Get {PLANS[selectedPlan]?.name} →
            </button>
          </>
        ) : (
          <>
            <div className="modal__badge">PAYMENT</div>
            <h2 className="modal__title">{PLANS[selectedPlan]?.name}</h2>
            <p className="modal__sub">
              {selectedPlan === 'monthly' && '₱11,349.99 / month'}
              {selectedPlan === 'yearly' && '₱113,499.9 / year'}
              {selectedPlan === 'lifetime' && '₱1,134,999 one-time'}
            </p>
            <form className="modal__form" onSubmit={handlePay}>
              <label className="modal__label">Card number</label>
              <input
                className="modal__input"
                placeholder="1234 5678 9012 3456"
                value={cardNum}
                maxLength={19}
                onChange={(e) => setCardNum(e.target.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim())}
                required
              />
              <label className="modal__label">Name on card</label>
              <input
                className="modal__input"
                placeholder="Full name"
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                required
              />
              <div className="modal__row">
                <div>
                  <label className="modal__label">Expiry</label>
                  <input
                    className="modal__input"
                    placeholder="MM / YY"
                    value={expiry}
                    maxLength={7}
                    onChange={(e) => {
                      let v = e.target.value.replace(/\D/g,'');
                      if (v.length >= 3) v = v.slice(0,2) + ' / ' + v.slice(2,4);
                      setExpiry(v);
                    }}
                    required
                  />
                </div>
                <div>
                  <label className="modal__label">CVV</label>
                  <input
                    className="modal__input"
                    placeholder="123"
                    value={cvv}
                    maxLength={4}
                    onChange={(e) => setCvv(e.target.value.replace(/\D/g,''))}
                    required
                  />
                </div>
              </div>
              <p className="modal__secure">🔐 Secured with 256-bit SSL encryption</p>
              <button type="submit" className="modal__btn modal__btn--gold">
                Pay Now & Unlock
              </button>
            </form>
            <button className="modal__back" onClick={() => setStep('plans')}>← Back to plans</button>
          </>
        )}
      </div>
    </div>
  );
}
