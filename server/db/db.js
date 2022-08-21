const { MongoClient } = require('mongodb');

async function DATABASE() {
  const client = new MongoClient(process.env.DATABASE_URI);
  await client.connect();
  return client;
}

module.exports = DATABASE
