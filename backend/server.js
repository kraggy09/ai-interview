import app from "./app.js";
import moment from "moment-timezone";

// Get the current date as a string in MM-DD-YYYY format for a specific timezone
const currentDate = moment().tz("America/New_York").format("DD-MM-YYYY");
console.log(currentDate);

app.get("/", (req, res) => {
  return res.status(200).json({
    msg: "Hello World!",
    success: true,
  });
});

app.listen(8000, () => {
  console.log("App is running at 8000");
});
