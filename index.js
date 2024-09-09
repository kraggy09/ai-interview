import http from "http";
import app from "./backend/app.js";

// Create an HTTP server instance
const server = http.createServer(app);

// Set the server timeout (e.g., 5 minutes)
server.setTimeout(300000); // 5 minutes in milliseconds

// Define your routes
app.get("/hello", (req, res) => {
  return res.status(200).json({
    success: true,
    msg: "Hello and welcome to the world of AI Intervue",
  });
});

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    msg: "Hello from Express.js",
  });
});

// Start the server
server.listen(8000, () => {
  console.log("App is running at 8000");
});
