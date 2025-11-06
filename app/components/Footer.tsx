import React from 'react'
import {  Box, Typography} from "@mui/material";
import MuiLink from "@mui/material/Link";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  return (

    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        gap: "1rem",
        backgroundColor: "black",
        
        boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.2)", // Sombra sutil para destacar
      }}
    >
     {/* Redes sociales */}
          <Box sx={{ mt: 3, display: "flex", justifyContent: "center", gap: 2 }}>
            <MuiLink
              href="https://wa.me/541112345678"
              target="_blank"
              sx={{ color: "#00FF7F" }}
            >
              <WhatsAppIcon />
            </MuiLink>
            <MuiLink
              href="https://www.instagram.com/munrocultiva.growshop/"
              target="_blank"
              sx={{ color: "#63D8F2" }}
            >
              <InstagramIcon />
            </MuiLink>
          </Box>
      <Typography variant="body1" sx={{ color: "#333" }}>
        {new Date().getFullYear()} © Todos los derechos reservados
      </Typography>

    </Box>
  )
}
