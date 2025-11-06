"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Modal,
} from "@mui/material";
import { useCart } from "../context/CartContext";
import { IProduct } from "../types/Product";

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCardBuy({ product }: ProductCardProps) {
  const [open, setOpen] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    alert(`"${product.name}" agregado al carrito 🛒`);
  };
  

  return (
    <>
      {/* 🔹 Tarjeta del producto */}
      <Card
        sx={{
          backgroundColor: "#0B0B0B",
          color: "white",
          border: "1px solid #222",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          position: "relative",
          transition: "transform 0.25s ease, box-shadow 0.25s ease",
          "&:hover": {
            transform: "scale(1.03)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
          },
          "&:hover .overlay": { opacity: 1, visibility: "visible" },
        }}
      >
        {product.images?.[0] && (
          <CardMedia
            component="img"
            height="200"
            image={product.images[0]}
            alt={product.name}
            sx={{ objectFit: "cover" }}
          />
        )}

        {/* Info básica */}
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            {product.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "#aaa" }}>
            ${product.price}
          </Typography>
        </CardContent>



        {/* Overlay (hover) */}
        <Box
          className="overlay"
          sx={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            backgroundColor: "rgba(0,0,0,0.7)",
            opacity: 0,
            visibility: "hidden",
            transition: "opacity 0.3s ease, visibility 0.3s ease",
          }}
        >
          <Button
            variant="contained"
            onClick={handleAddToCart}
            sx={{
              backgroundColor: "#F25EA3",
              width: "60%",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#d14b89" },
            }}
          >
            Comprar
          </Button>

          <Link href={`/products/${product._id}`} passHref>
            <Button
              variant="outlined"
              sx={{
                borderColor: "#F25EA3",
                color: "#F25EA3",
                width: "100%",
                fontWeight: "bold",
                "&:hover": { borderColor: "#d14b89", color: "#d14b89" },
              }}
            >
              Ver
            </Button>
          </Link>
        </Box>
      </Card>
    </>
  );
}
