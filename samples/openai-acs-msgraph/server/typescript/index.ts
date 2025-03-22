import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import apiRoutes from './apiRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to block specific file types
app.use((req: Request, res: Response, next: NextFunction): void => {
  const fileExtension = path.extname(req.url);
  if (fileExtension === '.schema') {
    res.status(403).send('Access to this file is forbidden.');
    return;
  }
  next();
});

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});