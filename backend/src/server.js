import express from 'express';
import notesRoutes from './routes/notesRoutes.js'; 
import { connectDB } from './config/db.js'; 
import dotenv from 'dotenv';
// import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors'
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware 
app.use(cors({
  origin: 'http://localhost:5173', // Adjust this to your frontend URL
}));
app.use(express.json()); // to get body data in JSON format
// app.use(rateLimiter)
// app.use((req, res, next) => {
//   console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
//   next();
// }); 


app.use("/api/notes", notesRoutes); 

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});