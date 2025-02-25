import mongoose from 'mongoose';

import {logger} from './index.js';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    logger.info(`Connected to MongoDB...`);
  } catch (error) {
    logger.info('MongoDB connection error: ', error);
    process.exit(1);
  }
};

export default connectDB;
