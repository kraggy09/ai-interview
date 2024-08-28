import app from "./app.js";

app.get("/hello", (req, res) => {
  return res.status(200).json({
    success: true,
    msg: "Hello and welcome to the world of AI Intervue",
  });
});

app.listen(8000, () => {
  console.log("App is running at 8000");
});
