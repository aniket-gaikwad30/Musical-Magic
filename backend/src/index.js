import express from "express";
import { createServer } from "http";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileupload from "express-fileupload";
import path from "path";
import cron from "node-cron";
import fs from "fs";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songsRoutes from "./routes/songs.route.js";
import albumRoutes from "./routes/album.route.js";
import statsRoutes from "./routes/stats.route.js";

import { connectDB } from "./lib/db.js";
import { initializeSocket } from "./lib/socket.js";

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const __dirname = path.resolve();
const httpServer = createServer(app);

// Initialize WebSocket
initializeSocket(httpServer);

// CORS middleware
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// JSON body parser
app.use(express.json());

// Clerk authentication middleware
app.use(clerkMiddleware());

// File upload middleware
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "temp"),
    preservePath: true,
    limits: {
      fieldSize: 10 * 1024 * 1024, // 10 MB
    },
  })
);
const tempDir = path.join(__dirname, "tmp");

try {
  cron.schedule("0 * * * *", () => {
    console.log("Running cron cleanup at:", new Date());
    console.log("Temp directory path:", tempDir);

    if (fs.existsSync(tempDir)) {
      fs.readdir(tempDir, (err, files) => {
        if (err) {
          console.error("Error reading temp directory:", err);
          return;
        }

        for (const file of files) {
          const filePath = path.join(tempDir, file);
          fs.unlink(filePath, (err) => {
            if (err) console.error("Error deleting file:", filePath);
          });
        }
      });
    }
  });
} catch (err) {
  console.error("Cron job failed:", err);
}


// API routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songsRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statsRoutes);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// Global error handler
app.use((error, req, res, next) => {
  res.status(500).json({
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : error.message,
  });
});

// Start server
httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
  connectDB();
});
