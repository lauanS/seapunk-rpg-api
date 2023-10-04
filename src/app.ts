import dotenv from 'dotenv';
import path from 'path';

const envPath = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`);

dotenv.config({
  path: envPath
});

import express from 'express';
import dbConnect from './config/dbConnect';
import routes from './routes/index';

const PORT = process.env.API_PORT;

dbConnect();

const app = express();
routes(app);


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
