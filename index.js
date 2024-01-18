import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import router from "./routes/index.js";

const app = express()
dotenv.config()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use('/api/v1',router)

mongoose.connect(process.env.MONGOURL).then(()=>console.log("database connected"))

app.listen(8000,()=>console.log("app is running on port 8000"))