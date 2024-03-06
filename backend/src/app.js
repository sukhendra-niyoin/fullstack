import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// for cor policy settings 
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

// for getting data in json and from url 
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
// save images and pdf in public folder 
app.use(express.static("public"));

// for access cookie from user browser and set cookies 
app.use(cookieParser());

// import routes from routes folder
import userRouter from './routes/user.routes.js';

// routes declration
// we use middleware here beacuse file is seprate 
app.use("/api/v1/users", userRouter);

export { app };