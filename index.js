import app from "./backend/app.js";

app.get("/hello", (req, res) => {
  return res.status(200).json({
    success: true,
    msg: "Hello and welcome to the world of AI Intervue",
  });
});

app.get("/", (req, res) => {
  return res.status(200).json({
    success: true,
    msg: "hello from expressjs",
  });
});

app.listen(8000, () => {
  console.log("App is running at 8000");
});
