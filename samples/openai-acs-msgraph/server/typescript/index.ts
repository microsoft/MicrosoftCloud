import path from 'path';
import express from 'express';
import cors from 'cors';
import apiRoutes from './apiRoutes';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRoutes);

app.use((req, res, next) => {
  // Simple example of blocking specific types of files from being served
  const fileExtension = path.extname(req.url);
  if (fileExtension === '.schema') {
    return res.status(403).send('Access to this file is forbidden.');
  }
  next();
});


app.listen(port, () => {
  console.log(`API listening at http://localhost:${port}`);
});
