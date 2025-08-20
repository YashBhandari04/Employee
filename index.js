import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import allowanceRoutes from "./routes/allowanceRoutes.js"
import UserRouter from "./routes/userRoutes.js";


const app = express();

dotenv.config();
app.use(express.json());

connectDB();

app.use('/api/register', allowanceRoutes)
app.use('/api/user',UserRouter)

app.listen(process.env.PORT || 5000, ()=>{
    console.log("server is running on 5000");
});