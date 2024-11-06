const express = require('express');
const app = express();
const PORT = 5000;

// Middleware to parse JSON
app.use(express.json());

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Simulation route
app.post('/api/simulate', (req, res) => {
  const { voltage, resistance } = req.body;
  if (voltage == null || resistance == null || resistance === 0) {
    return res.status(400).json({ error: 'Please provide valid voltage and resistance values.' });
  }

  const current = voltage / resistance;
  res.json({ voltage, resistance, current });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Copy paste following into address bar http://localhost:5000/api/test`);
});
