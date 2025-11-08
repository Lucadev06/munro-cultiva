import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

export async function connectDB() {
  if (!MONGODB_URI) {
    console.error("❌ No se encontró MONGODB_URI en el entorno");
    throw new Error("Falta la variable MONGODB_URI");
  }

  // evita reconexiones múltiples
  if (mongoose.connection.readyState >= 1) {
    console.log("⚡ Conexión existente reutilizada");
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Conectado a MongoDB");
  } catch (err) {
    console.error("❌ Error al conectar MongoDB:", err);
    throw err;
  }
}
