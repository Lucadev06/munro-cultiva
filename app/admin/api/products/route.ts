import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import Product from "@/app/models/Product";

export async function GET() {
  await connectDB();
  const products = await Product.find()
    .select("_id name price quantity description images category")
    .sort({ createdAt: -1 });
  console.log("Products fetched from DB:", products);
  return NextResponse.json(products);
}

export async function POST(req: Request) {
  await connectDB();
  const body = await req.json();
  console.log("POST recibido:", body);

  // ✅ Crear explícitamente el documento (así Mongoose no omite campos)
  const newProduct = new Product({
    name: body.name,
    price: body.price,
    quantity: body.quantity,
    description: body.description,
    category: body.category, // 👈 importante
    images: body.images || [],
  });

  await newProduct.save();
  console.log("✅ Producto guardado correctamente:", newProduct);

  return NextResponse.json(newProduct);
}
