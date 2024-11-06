import React, { useState } from 'react';
import './App.css';

function App() {
  const [voltage, setVoltage] = useState('');
  const [resistance, setResistance] = useState('');
  const [current, setCurrent] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ voltage: Number(voltage), resistance: Number(resistance) }),
      });
      const data = await response.json();
      if (response.ok) {
        setCurrent(data.current);
        setError(null);
      } else {
        setError(data.error);
        setCurrent(null);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setCurrent(null);
    }
  };

  return (
    <div className="App">
      <h1>Simple Circuit Simulator</h1>
      <p>Welcome to the Circuit Simulator!</p>
      <form onSubmit={handleSubmit}>
        <label>
          Voltage (V):
          <input type="number" value={voltage} onChange={(e) => setVoltage(e.target.value)} />
        </label>
        <br />
        <label>
          Resistance (Ω):
          <input type="number" value={resistance} onChange={(e) => setResistance(e.target.value)} />
        </label>
        <br />
        <button type="submit">Calculate Current</button>
      </form>

      {current !== null && <p>Current: {current} A</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}

export default App;
