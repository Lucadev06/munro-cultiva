import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Conectado a MongoDB");
  } catch (err) {
    console.error("Error al conectar MongoDB:", err);
  }
};
