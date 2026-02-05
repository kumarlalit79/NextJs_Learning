import { connect } from "mongoose";

const mongodbURL = process.env.MONGODB_URL;
if (!mongodbURL) {
  throw new Error("Mongodb url is not found");
}

let cached = global.mongoose;
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // if connection pehle se hi hai
  if (cached.conn) {
    console.log("DB connected!");
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = connect(mongodbURL).then((c) => c.connection);
  }

  try {
    cached.conn = await cached.promise;
    console.log("DB connected!");
  } catch (error) {
    throw error;
  }

  return cached.conn;
};

export default connectDB;
