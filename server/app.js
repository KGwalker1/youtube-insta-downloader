const express = require("express");
const { spawn } = require("child_process");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // For parsing application/json

// Serve static files from the "downloads" directory
app.use("/downloads", express.static(path.join(__dirname, "downloads")));

// YouTube download route
app.post("/api/youtube-download", (req, res) => {
  const { url } = req.body;
  const fileName = `${Date.now()}.mp4`; // Create a unique filename based on timestamp

  const ydlProcess = spawn("python", ["download.py", url]);

  ydlProcess.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  ydlProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  ydlProcess.on("close", (code) => {
    if (code === 0) {
      res.json({
        success: true,
        message: `Video downloaded successfully`,
        filePath: `/downloads/${fileName}`, // Send relative URL
      });
    } else {
      res.status(500).json({ error: "Failed to download the video" });
    }
  });
});

// Instagram download route
app.post("/api/instagram-download", (req, res) => {
  const { url } = req.body;
  const fileName = `${Date.now()}.mp4`; // Create a unique filename based on timestamp

  const instaDownloadProcess = spawn("python", ["insta.py", url]);

  instaDownloadProcess.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  instaDownloadProcess.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });

  instaDownloadProcess.on("close", (code) => {
    if (code === 0) {
      res.json({
        success: true,
        message: `Instagram video downloaded successfully`,
        filePath: `/downloads/${fileName}`, // Send relative URL
      });
    } else {
      res.status(500).json({ error: "Failed to download the Instagram video" });
    }
  });
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
