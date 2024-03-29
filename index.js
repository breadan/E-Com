import categoryRouter from './src/routes/category.routes.js';
import './config/connection.js';
import 'dotenv/config';
import morgan from 'morgan';
import './config/connection.js';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { ApiError } from './utils/apiError.js';
import { globalError } from './src/middleware/err.Middleware.js';
import subCategoryRouter from './src/routes/subCategory.routes.js';

const port = process.env.PORT || 8000;
const mode = process.env.NODE_ENV;

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(categoryRouter);
app.use(subCategoryRouter);

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode: ${mode}`);
}

app.get('/', (req, res) => res.send(' World!'));

app.all('*', (req, res, next) => {
  next(new ApiError(`Cant find this rout: ${req.originalUrl}`, 400));
});

//[ ] : globalError2 Global error handler in Different work environments
app.use(globalError);

app.listen(port, () => {
  console.log(`Example app running on port ${port} mode: ${mode}! ^_^ `);
});
