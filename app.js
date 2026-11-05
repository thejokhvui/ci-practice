const express = require('express');
const { getDbTime } = require('./db');

const app = express();

app.get('/', (req, res) => {
  res.json({ message: 'Hello from CI/CD!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/db', async (req, res) => {
  try {
    const time = await getDbTime();
    if (!time) {
      return res.status(503).json({ database: 'not connected' });
    }
    res.json({ database: 'connected', time });
  } catch (err) {
    console.error('Database query failed:', err.message);
    res.status(503).json({ database: 'error' });
  }
});

module.exports = app;
