import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/milan_clothing_db';

  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000 // Quick timeout so server doesn't hang if Mongo isn't running yet
    });

    isConnected = true;
    console.log(`✓ MongoDB Connected Successfully: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    isConnected = false;
    console.warn(`! MongoDB Connection Notice: Could not connect to MongoDB at "${mongoURI}".`);
    console.warn(`! Reason: ${error.message}`);
    console.warn(`! Tip: You can configure your local MongoDB or MongoDB Atlas URI in backend/.env whenever you are ready!`);
    console.warn(`! Note: The backend will continue running and serve mock/in-memory data seamlessly.`);
  }
};

export const isDbConnected = () => isConnected;
