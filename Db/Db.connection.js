import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
const connectDB = async () => {
  const connectWithRetry = async (retries = 5) => {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      if (retries === 0) {
        console.error("Failed to connect to MongoDB, exiting...");
        process.exit(1);
      } else {
        console.error(`Error connecting to MongoDB. Retrying (${retries} attempts left)...`);
        setTimeout(() => connectWithRetry(retries - 1), 5000); // Retry after 5 seconds
      }
    }
  };

  connectWithRetry();

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
  });

  mongoose.connection.on('error', (err) => {
    console.error(`Mongoose connection error: ${err}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB');
  });

  // Graceful shutdown on server termination
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose connection closed due to application termination');
    process.exit(0);
  });
};

export default connectDB;
