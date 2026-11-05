const { Client } = require('pg');

let client = null;

// Без DB_HOST застосунок працює без бази (наприклад, у звичайному docker run)
async function connectToDb() {
  if (!process.env.DB_HOST) {
    console.log('DB_HOST is not set, starting without database');
    return;
  }

  const newClient = new Client({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  await newClient.connect();
  client = newClient;
  console.log('Connected to PostgreSQL');
}

async function getDbTime() {
  if (!client) {
    return null;
  }
  const result = await client.query('SELECT NOW() AS now');
  return result.rows[0].now;
}

module.exports = { connectToDb, getDbTime };
