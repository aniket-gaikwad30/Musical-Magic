import express from "express";
// import { createServer } from "http";
// import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileupload from "express-fileupload";
import path from "path";
// import { connectDB } from "./lib/db.js";
// import { router } from "./routes.js";
// import { connect } from "./config/db.js";
// import { addSocketListeners } from "./socket.js";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songsRoutes from "./routes/songs.route.js";
import albumRoutes from "./routes/album.route.js";
import statsRoutes from "./routes/stats.route.js";
import { connectDB } from "./lib/db.js";



dotenv.config();
const __dirname = path.resolve();

// console.log("Mongo URI:", process.env.MONGODB_URI);

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


app.use(express.json()); // middleware to parse JSON data from req.body 

// Pass no parameters
app.use(clerkMiddleware()) /// this will add auth to req.user and req.token

app.use(fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "temp"),
    preservePath : true,
    limits: {
        fieldSize : 10 * 1024 * 1024 // 10mb max file size
    }
}));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songsRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);



//error handler
app.use((error,req, res, next)=>{
    res.status(500).json({message : process.env.NODE_ENV==="production" ? "Internal server error" : error.message})
})



app.listen(port, () => {
    console.log("Server is running on port 5000");
    connectDB();
});