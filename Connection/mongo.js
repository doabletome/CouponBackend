import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDb() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connection to Db is Successful");
  } catch (error) {
    console.error(`❌ Error: ${error.message}`);
    process.exit(1); // Exit process with failure
  }
}
