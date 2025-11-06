import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
    description: { type: String },
    category: { type: String },
    images: [{ type: String }],
  },
  { timestamps: true }
);

// ✅ forma compatible con Mongoose 7 y Next.js hot reload
export default models?.Product || model("Product", ProductSchema);
