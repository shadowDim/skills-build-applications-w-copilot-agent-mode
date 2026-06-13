import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 8000;
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit';

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', backendPort: PORT, frontendPort: 5173, mongodbPort: 27017 });
});

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log(`Connected to MongoDB at ${MONGODB_URI}`);
    app.listen(PORT, () => {
      console.log(`OctoFit Tracker backend running on http://localhost:${PORT}`);
      console.log('Frontend should run on port 5173 and MongoDB on port 27017');
    });
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });
