import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const files = formData.getAll("file"); // 👈 debe coincidir con formData.append("file", f)

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No se recibió ningún archivo" }, { status: 400 });
    }

    const uploadResults = await Promise.all(
      files.map(async (file) => {
        const buffer = Buffer.from(await (file as Blob).arrayBuffer());
        const base64 = `data:${(file as File).type};base64,${buffer.toString("base64")}`;

        const res = await cloudinary.uploader.upload(base64, {
          folder: "powerlab", // 📁 o el nombre de tu proyecto
        });
        return res.secure_url;
      })
    );

    return NextResponse.json({ urls: uploadResults });
  } catch (error) {
    console.error("❌ Error al subir imágenes:", error);
    return NextResponse.json({ message: "Error al subir imágenes", error }, { status: 500 });
  }
}
