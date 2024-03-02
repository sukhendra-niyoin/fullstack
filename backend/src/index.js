import dotenv from 'dotenv';
import connectDB from "./db/index.js";
import { app } from './app.js';

dotenv.config({
    path: './env'
});

connectDB()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(` \n Server is running on port: ${process.env.PORT}\n`);
        })
        app.on('error', (error) => {
            console.log("ERROR", error);
            throw error;
        })
    })
    .catch((error) => {
        console.log('MONGODB Connection Failed', error);
    });