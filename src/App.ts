import * as dotenv from 'dotenv';
import express from 'express';
import routes from './Routes';
import cors from 'cors';
import path from 'path';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors({ origin: 'https://questionapp-frontend.herokuapp.com/' }));
app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')),
);
app.use(routes);

export default app;
