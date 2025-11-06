"use client";

import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { TextFormInput } from "@/app/components/Text"; 
import SelectComponent from "@/app/components/Select";

export default function CheckoutForm() {
  const { cart } = useCart();

  // Estados de método y ubicación
  const [metodo, setMetodo] = useState("retiro");
  const [provSeleccionada, setProvSeleccionada] = useState<string>("");
  const [localidadSeleccionada, setLocalidadSeleccionada] = useState<string>("");

  // Estados de campos del form
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [direccion, setDireccion] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");
  const [aclaraciones, setAclaraciones] = useState("");

  // Reglas de habilitación
  const primerosTresOk =
    nombre.trim().length > 0 &&
    apellido.trim().length > 0 &&
    dni.trim().length > 0;

  const envioCamposOk =
    provSeleccionada.trim().length > 0 &&
    localidadSeleccionada.trim().length > 0 &&
    direccion.trim().length > 0 &&
    codigoPostal.trim().length > 0;

  const pagoHabilitado =
    primerosTresOk &&
    (metodo === "retiro" || envioCamposOk) &&
    cart.length > 0;

  const handleCheckout = async () => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart.map((item) => ({
            title: item.name,
            quantity: item.quantity,
            unit_price: item.price,
          })),
          // Si querés enviar datos de envío a tu backend, podés incluirlos acá:
          // shipping: {
          //   metodo,
          //   provincia: provSeleccionada,
          //   localidad: localidadSeleccionada,
          //   direccion,
          //   codigo_postal: codigoPostal,
          // }
        }),
      });

      const data = await res.json();
      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        alert("No se pudo iniciar el pago.");
      }
    } catch (error) {
      console.error("Error iniciando compra:", error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dirección de facturación y envío
      </Typography>

      {/* Datos personales */}
      <TextFormInput
        id="nombre"
        label="Nombre"
        required
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <TextFormInput
        id="apellido"
        label="Apellido"
        required
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
      />
      <TextFormInput
        id="dni"
        label="DNI / CUIT / CUIL"
        type="number"
        required
        maxLength={15}
        value={dni}
        onChange={(e) => setDni(e.target.value)}
      />

      {/* Método de entrega */}
      <Typography sx={{ mt: 4 }} variant="h5" gutterBottom>
        Método de entrega
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 2,
          mt: 1,
        }}
      >
        <Button
          variant={metodo === "retiro" ? "contained" : "outlined"}
          onClick={() => setMetodo("retiro")}
          disabled={!primerosTresOk}
        >
          Retiro en tienda
        </Button>

        <Button
          variant={metodo === "envio" ? "contained" : "outlined"}
          onClick={() => setMetodo("envio")}
          disabled={!primerosTresOk}
        >
          Envío a domicilio
        </Button>
      </Box>

      {/* Campos de envío */}
      {metodo === "envio" && (
        <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
          <SelectComponent
            label="Provincia"
            value={provSeleccionada}
            onChange={(val) => {
              setProvSeleccionada(val);
              setLocalidadSeleccionada("");
            }}
            endpoint="https://apis.datos.gob.ar/georef/api/provincias"
          />

          {provSeleccionada && (
            <SelectComponent
              label="Localidad"
              value={localidadSeleccionada}
              onChange={setLocalidadSeleccionada}
              endpoint={`https://apis.datos.gob.ar/georef/api/localidades?provincia=${encodeURIComponent(
                provSeleccionada
              )}&campos=id,nombre&max=1000`}
            />
          )}

          <TextFormInput
            id="direccion"
            label="Dirección"
            required
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
          />
          <TextFormInput
            id="codigo_postal"
            label="Código postal"
            required
            value={codigoPostal}
            onChange={(e) => setCodigoPostal(e.target.value)}
          />
          <TextFormInput
            id="aclaraciones"
            label="Aclaraciones"
            value={aclaraciones}
            onChange={(e) => setAclaraciones(e.target.value)}
          />
        </Box>
      )}

      {pagoHabilitado && (
        <Typography
  variant="body2"
  sx={{
    textAlign: "center",
    mt: 3,
    color: "#555",
    fontStyle: "italic",
  }}
>
  Serás redirigido a <strong>Mercado Pago</strong> para completar la compra.
  <br />
  Para una mejor gestión y confirmación del pago, envianos el comprobante por{" "}
  <a
    href="https://wa.me/5491122334455?text=Hola%20te%20env%C3%ADo%20el%20comprobante%20de%20mi%20compra"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: "#25D366",
      fontWeight: "bold",
      textDecoration: "none",
    }}
  >
    WhatsApp
  </a>.
</Typography>
      )}
      {/* Botón de pago */}
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5, mb: 2 }}>
        <Button
          variant="contained"
          onClick={handleCheckout}
          disabled={!pagoHabilitado}
          sx={{
            backgroundColor: "#F25EA3",
            "&:hover": { backgroundColor: "#d14b89" },
          }}
        >
          Ir a pagar
        </Button>
      </Box>
    </Container>
  );
}
