// src/components/Calculator.js
import React, { useState, useCallback } from 'react';
import Display from './Display';
import Keypad from './Keypad';
import PaywallModal from './PaywallModal';
import { useAuth } from '../context/AuthContext';
import './Calculator.css';

function safeEval(expr) {
  try {
    // eslint-disable-next-line no-new-func
    const result = Function('"use strict"; return (' + expr + ')')();
    if (!isFinite(result)) return 'Error';
    // Round to avoid floating point weirdness
    return parseFloat(result.toPrecision(12)).toString();
  } catch {
    return 'Error';
  }
}

export default function Calculator() {
  const { canSeeResult } = useAuth();
  const [input, setInput] = useState('0');
  const [expression, setExpression] = useState('');
  const [showPaywall, setShowPaywall] = useState(false);
  const [resultBlurred, setResultBlurred] = useState(false);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const handleButton = useCallback((btn) => {
    const { label, type, value } = btn;
    const actualValue = value || label;

    if (type === 'fn') {
      if (label === 'AC') {
        setInput('0');
        setExpression('');
        setResultBlurred(false);
        setWaitingForOperand(false);
        return;
      }
      if (label === '+/-') {
        setInput((prev) => prev.startsWith('-') ? prev.slice(1) : '-' + prev);
        return;
      }
      if (label === '%') {
        setInput((prev) => String(parseFloat(prev) / 100));
        return;
      }
    }

    if (type === 'num') {
      if (waitingForOperand) {
        setInput(label === '.' ? '0.' : label);
        setWaitingForOperand(false);
      } else {
        setInput((prev) => {
          if (label === '.') {
            return prev.includes('.') ? prev : prev + '.';
          }
          return prev === '0' ? label : prev + label;
        });
      }
      setResultBlurred(false);
      return;
    }

    if (type === 'op') {
      setExpression(input + ' ' + label + ' ');
      setWaitingForOperand(true);
      return;
    }

    if (type === 'eq') {
      const fullExpr = expression + input;
      const result = safeEval(fullExpr.replace(/×/g,'*').replace(/÷/g,'/'));
      setExpression(fullExpr + ' =');

      if (!canSeeResult) {
        setInput(result); // store internally but blur
        setResultBlurred(true);
        setShowPaywall(true);
      } else {
        setInput(result);
        setResultBlurred(false);
      }
      setWaitingForOperand(true);
      return;
    }
  }, [input, expression, canSeeResult, waitingForOperand]);

  return (
    <div className="calculator-wrap">
      <div className="calculator">
        <Display
          expression={expression}
          input={input}
          blurred={resultBlurred && !canSeeResult}
        />
        <Keypad onButton={handleButton} />
      </div>

      {resultBlurred && !canSeeResult && (
        <div className="unlock-hint" onClick={() => setShowPaywall(true)}>
          <span>🔒 Result hidden — </span>
          <strong>Unlock with Pro</strong>
        </div>
      )}

      {showPaywall && (
        <PaywallModal onClose={() => setShowPaywall(false)} />
      )}
    </div>
  );
}
