import { NextResponse } from "next/server";
import MercadoPagoConfig, { Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    const preference = new Preference(client);
    const body = {
      items,
      back_urls: {
        success: process.env.NODE_ENV === "production"
          ? `${process.env.NEXT_PUBLIC_URL}/success`
          : undefined,
        failure: process.env.NODE_ENV === "production"
          ? `${process.env.NEXT_PUBLIC_URL}/failure`
          : undefined,
        pending: process.env.NODE_ENV === "production"
          ? `${process.env.NEXT_PUBLIC_URL}/pending`
          : undefined,
      },
      ...(process.env.NODE_ENV === "production" && { auto_return: "approved" }),
    };

    const result = await preference.create({ body });
    return NextResponse.json({
      init_point:
        process.env.NODE_ENV === "production"
          ? result.init_point
          : result.sandbox_init_point,
    });
  } catch (error) {
    console.error("Error creando preferencia:", error);
    return NextResponse.json({ error: "Error al crear la preferencia" }, { status: 500 });
  }
}
