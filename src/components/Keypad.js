// src/components/Keypad.js
import React from 'react';
import './Keypad.css';

const BUTTONS = [
  { label: 'AC', type: 'fn', wide: false },
  { label: '+/-', type: 'fn' },
  { label: '%', type: 'fn' },
  { label: '÷', type: 'op', value: '/' },

  { label: '7', type: 'num' },
  { label: '8', type: 'num' },
  { label: '9', type: 'num' },
  { label: '×', type: 'op', value: '*' },

  { label: '4', type: 'num' },
  { label: '5', type: 'num' },
  { label: '6', type: 'num' },
  { label: '-', type: 'op' },

  { label: '1', type: 'num' },
  { label: '2', type: 'num' },
  { label: '3', type: 'num' },
  { label: '+', type: 'op' },

  { label: '0', type: 'num', wide: true },
  { label: '.', type: 'num' },
  { label: '=', type: 'eq' },
];

export default function Keypad({ onButton }) {
  return (
    <div className="keypad">
      {BUTTONS.map((btn, i) => (
        <button
          key={i}
          className={`key key--${btn.type} ${btn.wide ? 'key--wide' : ''}`}
          onClick={() => onButton(btn)}
          aria-label={btn.label}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
}
