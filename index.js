const app = require('./app');
const { connectToDb } = require('./db');

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await connectToDb();
  } catch (err) {
    console.error('Could not connect to PostgreSQL:', err.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

start();
