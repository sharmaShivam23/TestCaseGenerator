const mongoose = require('mongoose');

const database = async () => {
  const options = {
    maxPoolSize: 15,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
  };

  try {
    await mongoose.connect(process.env.MONGO_URI, options);
    console.log('Successfully connected to database');
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');
  });
};

module.exports = database;
