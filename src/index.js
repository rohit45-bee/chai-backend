//require ('dotenv').config({path: './env'})
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

// Create an instance of the Express application
const app = express();

// Load environment variables from the .env file
dotenv.config({
    path: './env'
});

// Connect to the MongoDB database
connectDB()
    .then(() => {
        // Start the Express server
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Server is running at port: ${process.env.PORT || 8000}`);
        });
    })
    .catch((err) => {
        // Handle database connection errors
        console.log("MongoDB connection failed:", err);
    });





/*
import express from "express";
const app = express()
( async () => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => {
            console.log("ERRR: ", error);
            throw error
        })
        app.listen(process.env.PORT,()=>{
            console.log(`App is listening on port $ {process.env.PORT}`);
        })
    }catch (error){
        console.error("ERROR:", error)
        throw err
    }
})()
*/