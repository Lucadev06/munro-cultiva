import { NextResponse } from "next/server";
import MercadoPagoConfig, { Preference } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!, // solo server
});

export async function POST(req: Request) {
  try {
    const { items } = await req.json();

    const isProd = process.env.NODE_ENV === "production";
    // Base URL solo del lado servidor (no pública):
    const baseUrl =
      process.env.APP_URL ||
      process.env.NEXTAUTH_URL || // por si ya la tenés configurada
      (isProd ? "https://munrocultiva.netlify.app" : "http://localhost:3000");

    const preference = new Preference(client);

    const body = {
      items,
      ...(isProd && {
        back_urls: {
          success: `${baseUrl}/success`,
          failure: `${baseUrl}/failure`,
          pending: `${baseUrl}/pending`,
        },
        auto_return: "approved",
      }),
    };

    const result = await preference.create({ body });

    return NextResponse.json({
      init_point: isProd ? result.init_point : result.sandbox_init_point,
    });
  } catch (error) {
    console.error("Error creando preferencia:", error);
    return NextResponse.json(
      { error: "Error al crear la preferencia" },
      { status: 500 }
    );
  }
}
