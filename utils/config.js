'use strict';
import env from 'dotenv';

env.config();
const PORT = process.env.PORT;
const HTTP_PORT = process.env.HTTP_PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const SECRET = process.env.SECRET;
const CLOUDINARY_NAME = process.env.CLOUDINARY_NAME;
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET;
const CLOUDINARY_URL = process.env.CLOUDINARY_URL;

export default {
  PORT,
  HTTP_PORT,
  MONGODB_URI,
  SECRET,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_NAME,
  CLOUDINARY_URL,
}
