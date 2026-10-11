import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import issueRoutes from './routes/issueRoutes.js';
import userRoutes from './routes/userRoutes.js';

const app = express();
app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
}));
app.use(express.json());
app.use(cookieParser());
app.use('/api/issues' , issueRoutes);
app.use('/api/auth' , authRoutes)
app.use('/api/users' , userRoutes);

app.get('/health', (req,res)=>{
    res.json ({status : "OK"})
})

export default app;