// 

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import userRouter from './routes/autRoutes.js';
import productRouter from './routes/productRoutes.js';
import './config/db.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// Routes
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

// Server
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server running at port ${port}`);
});
