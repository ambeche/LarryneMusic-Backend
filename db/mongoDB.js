'use strict';
import config from '../utils/config.js';
import mongoose from 'mongoose';

(async () => {
  try {
    await mongoose.connect(config.MONGODB_URI, {
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
