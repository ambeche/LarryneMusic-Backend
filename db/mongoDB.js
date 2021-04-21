'use strict';
import env from 'dotenv';
import mongoose from 'mongoose';

env.config();

(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    });
    console.log('DB connected successfully');
  } catch (e) {
    console.error('Connection to db failed', e);
  }
})();

export default mongoose.connection;
