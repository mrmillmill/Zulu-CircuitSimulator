import React, { useEffect } from 'react';
import './App.css';

function App() {
  useEffect(() => {
    // Test API call to the backend
    fetch('/api/test')
      .then(response => response.json())
      .then(data => console.log(data));
  }, []);

  return (
    <div className="App">
      <h1>Simple Circuit Simulator</h1>
      <p>Welcome to the Circuit Simulator!</p>
    </div>
  );
}

export default App;
