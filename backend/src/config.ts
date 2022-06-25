import { NextFunction, Request, Response } from "express";
import { Express } from "express-serve-static-core";
import mongoose from "mongoose";
// env
const PORT_DB = "27017"
const MONGO_URI = `mongodb://localhost:${PORT_DB}/my421;`

// mongodb connection
export const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
          console.log(`Mongo connecton port ${PORT_DB}`);
        
    } catch (error) {
        console.log(error)
    }  
};
export const CORS = { origin: "*" };
