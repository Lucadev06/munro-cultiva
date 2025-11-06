"use client";
import { useState, useEffect } from "react";
import { Box, Fade, useMediaQuery } from "@mui/material";
import ProductCardBuy from "./components/ProductCardBuy";
import Image from "next/image";

import { IProduct } from "./types/Product";

const BannerRotativo = () => {
  const images = [
    "/foto-portada.png",
    "/foto-portada-2.jpg",
    "/foto-portada-3.jpg",
  ];
  const [index, setIndex] = useState(0);
  const [products, setProducts] = useState<IProduct[]>([]);

  // Cambio de imagen
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Obtener productos
  useEffect(() => {
    fetch("/admin/api/products")
      .then((res) => res.json())
      .then((data: IProduct[]) => setProducts(data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  return (
    <>
      {/* Banner rotativo */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {images.map((src, i) => (
          <Fade in={i === index} timeout={1000} key={i}>
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
              }}
            >
              <Image
                src={src}
                alt={`Foto portada ${i + 1}`}
                fill
                priority={i === 0}
                style={{
                  objectFit: "cover",
                }}
              />
            </Box>
          </Fade>
        ))}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.35)",
          }}
        />
      </Box>

      {/* Renderizado de productos */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
          padding: 4,
          backgroundColor: "#f8f8f8",
        }}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCardBuy key={product._id} product={product} />
          ))
        ) : (
          <p>Cargando productos...</p>
        )}
      </Box>
    </>
  );
};

export default BannerRotativo;
