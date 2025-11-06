import { Box, Typography } from "@mui/material";
import Image from "next/image";

const Nostros = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
        padding: "3rem 1rem",
      }}
    >
      {/* Título */}
      <Typography
        variant="h3"
        sx={{
          color: "#008000",
          fontWeight: "bold",
          marginBottom: "2rem",
          letterSpacing: 1,
        }}
      >
        Dónde estamos
      </Typography>

      {/* Imagen */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: { xs: "90%", sm: "80%", md: "70%" },
          maxWidth: "1000px",
          borderRadius: "1rem",
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        <Image
          src="/foto-nosotros.png"
          alt="Ubicación"
          width={1000}
          height={600}
          style={{
            width: "100%",
            height: "50%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Dirección y horario */}
         {/* Dirección */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Typography
          variant="h6"
          sx={{
            color: "#333",
            fontWeight: 500,
            lineHeight: 1.6,
          }}
        >
          Av. Bartolomé Mitre 2348, Munro 📍
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            color: "#555",
            fontWeight: 400,
          }}
        >
          Lunes a sábados de 10:00 a 20:00 🕙
        </Typography>
        </Box>
    </Box>
  );
};

export default Nostros;
