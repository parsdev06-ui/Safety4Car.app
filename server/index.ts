import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Determine the correct static path based on environment
  let staticPath: string;

  if (process.env.NODE_ENV === "production") {
    // In production (Vercel), static files are in dist/public
    staticPath = path.resolve(__dirname, "public");
  } else {
    // In development, static files are in dist/public
    staticPath = path.resolve(__dirname, "..", "dist", "public");
  }

  // Verify the static path exists
  if (!fs.existsSync(staticPath)) {
    console.warn(`⚠️  Static path does not exist: ${staticPath}`);
    console.log(`Available directories in ${path.dirname(staticPath)}:`);
    try {
      const parent = path.dirname(staticPath);
      if (fs.existsSync(parent)) {
        fs.readdirSync(parent).forEach((file) => {
          console.log(`  - ${file}`);
        });
      }
    } catch (e) {
      console.error(`Could not list directory: ${e}`);
    }
  }

  // Middleware to set proper cache headers
  app.use((req, res, next) => {
    // Cache static assets for 1 year
    if (req.path.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/)) {
      res.set("Cache-Control", "public, max-age=31536000, immutable");
    } else {
      // Don't cache HTML files
      res.set("Cache-Control", "no-cache, no-store, must-revalidate");
    }
    next();
  });

  // Serve static files from the determined path
  app.use(express.static(staticPath, { maxAge: "1y", etag: false }));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (req, res) => {
    const indexPath = path.join(staticPath, "index.html");

    // Check if index.html exists
    if (!fs.existsSync(indexPath)) {
      console.error(`index.html not found at: ${indexPath}`);
      return res.status(404).send("index.html not found");
    }

    res.set("Cache-Control", "no-cache, no-store, must-revalidate");
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error(`Error sending index.html: ${err.message}`);
        res.status(500).send("Internal Server Error");
      }
    });
  });

  const port = process.env.PORT || 3000;

  server.listen(Number(port), "0.0.0.0", () => {
    console.log(`✅ Server running on http://0.0.0.0:${port}/`);
    console.log(`📁 Static files served from: ${staticPath}`);
  });

  // Handle graceful shutdown
  process.on("SIGTERM", () => {
    console.log("SIGTERM received, shutting down gracefully");
    server.close(() => {
      console.log("Server closed");
      process.exit(0);
    });
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
