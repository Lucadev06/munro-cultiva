import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import  Product from "@/app/models/Product";
import mongoose from "mongoose";

export async function GET(req: Request, context: { params: { id: string } }) {
  await connectDB();
  const { id } = context.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
  }

  try {
    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ message: "Error fetching product", error: error.message }, { status: 500 });
  }
}

export async function PUT(req: Request, context: { params: { id: string } }) {
  await connectDB();
  const { id } = context.params;
  const body = await req.json();
  console.log("PUT request received:");
  console.log("Full context:", context);
  console.log("Context params:", context.params);
  console.log("ID:", id);
  console.log("Body:", body);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error("Invalid product ID:", id);
    return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
  }

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, body, { new: true });
    if (!updatedProduct) {
      console.error("Product not found for ID:", id);
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Product updated", product: updatedProduct });
  } catch (error: any) {
    console.error("Error updating product:", error);
    return NextResponse.json({ message: "Error updating product", error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  await connectDB();
  const { id } = context.params;
  console.log("DELETE request received:");
  console.log("Full context:", context);
  console.log("Context params:", context.params);
  console.log("ID:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error("Invalid product ID for deletion:", id);
    return NextResponse.json({ message: "Invalid product ID" }, { status: 400 });
  }

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      console.error("Product not found for deletion with ID:", id);
      return NextResponse.json({ message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting product:", error);
    return NextResponse.json({ message: "Error deleting product", error: error.message }, { status: 500 });
  }
}
