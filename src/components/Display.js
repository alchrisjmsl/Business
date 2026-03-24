// src/components/Display.js
import React from 'react';
import './Display.css';

export default function Display({ expression, input, blurred }) {
  return (
    <div className="display">
      <div className="display__expression">{expression || '\u00A0'}</div>
      <div className={`display__input ${blurred ? 'blurred' : ''}`}>
        {blurred ? '••••••' : (input || '0')}
        {blurred && <span className="display__lock">🔒</span>}
      </div>
    </div>
  );
}
