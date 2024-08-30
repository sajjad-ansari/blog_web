import express from 'express';
import dotenv from 'dotenv';
import db from './db.js';
import userRouter from './routers/user.route.js';
import blogRouter from './routers/blog.route.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';



//Get the directory name of the current module...
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);



const app = express();
dotenv.config();



// Define the directory path
const uploadDir = path.join(__dirname, '../uploads');

// Check if the directory exists
if (!fs.existsSync(uploadDir)) {
    // Create the directory if it does not exist
    fs.mkdirSync(uploadDir, { recursive: true });
}


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api', userRouter);
app.use('/api', blogRouter);

const port = process.env.port;
app.listen(port, ()=>{
    console.log(`Running Server on port ${port}`);
    
})