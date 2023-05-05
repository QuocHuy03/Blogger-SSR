import mongoose from "mongoose";

export async function mongooseConnect() {
  try {
    if (mongoose.connection.readyState === 1) {
      return mongoose.connection;
    } else {
      const uri = process.env.MONGODB_URI;
      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
      return await mongoose.connect(uri, options).then(() => {
        console.log("Connected to MongoDB!");
        return mongoose.connection;
      });
    }
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
}
