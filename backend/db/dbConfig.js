import mongoose from "mongoose";

const connection = async (url) => {
  try {
    url = String(url);
    mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      family: 4,
    });
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDb connected successfully");
    });

    connection.on("error", (err) => {
      console.log("There was an error while connecting in mongodb", err);
    });
  } catch (error) {
    console.log("Something went wrong", error.message);
  }
};

export default connection;
