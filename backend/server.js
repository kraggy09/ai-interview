import app from "./app.js";
import connection from "./db/dbConfig.js";
const uri = process.env.MONGO_URI;

connection(uri);

app.listen(8000, () => {
  console.log("App is running at 8000");
});
