import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL_MONGODB);
    console.log("Connected to MongoDB.");
  } catch (error) {
    throw error;
  }
};

mongoose.connection.on("disconnected", () =>
  console.log("MongoDB Disconnected!")
);
mongoose.connection.on("connected", () => console.log("MongoDB Connected!"));

export default connectDB;
