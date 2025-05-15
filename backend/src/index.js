import express from "express";
import { createServer } from "http";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileupload from "express-fileupload";
import path from "path";
import fs from "fs";
import cron from "node-cron";

import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import adminRoutes from "./routes/admin.route.js";
import songsRoutes from "./routes/songs.route.js";
import albumRoutes from "./routes/album.route.js";
import statsRoutes from "./routes/stats.route.js";
import { connectDB } from "./lib/db.js";
import { initializeSocket } from "./lib/socket.js";

dotenv.config();
const __dirname = path.resolve();

const app = express();
const port = process.env.PORT || 5000;

const httpServer = createServer(app);
initializeSocket(httpServer);

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

// Add Clerk middleware
app.use(clerkMiddleware());

// File upload configuration
app.use(
  fileupload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "temp"),
    preservePath: true,
    limits: {
      fieldSize: 10 * 1024 * 1024, // 10MB
    },
  })
);

// ✅ Cron job to delete files in "tmp" directory every hour
const tempDir = path.join(process.cwd(), "tmp");
try {
  cron.schedule("0 * * * *", () => {
    console.log(
      "Running cron job to clean tmp directory at",
      new Date().toISOString()
    );

    if (!fs.existsSync(tempDir)) {
      console.warn(`Directory does not exist: ${tempDir}`);
      return;
    }

    fs.readdir(tempDir, (err, files) => {
      if (err) {
        console.error("Error reading tmp directory:", err);
        return;
      }

      files.forEach((file) => {
        const filePath = path.join(tempDir, file);
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error(`Error deleting file ${file}:`, unlinkErr);
          } else {
            console.log(`Deleted file: ${file}`);
          }
        });
      });
    });
  });
} catch (error) {
  console.error("Failed to schedule cron job:", error);
}

// Routes
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

// Error handler middleware
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
