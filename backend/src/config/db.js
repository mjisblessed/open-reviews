import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(process.env.MONGO_URL);
    console.log('MongoDB connected successfully')
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1); // Exit process with failure
  }
}