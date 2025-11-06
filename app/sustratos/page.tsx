"use client";
import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import ProductCardBuy from "../components/ProductCardBuy";
import { IProduct } from "../admin/page";

const Sustratos = () => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Obtener productos
  useEffect(() => {
    fetch("/admin/api/products")
      .then((res) => res.json())
      .then((data: IProduct[]) => {
        // Filtramos solo los productos de la categoría "SUSTRATOS"
        const filtrados = data.filter(
          (product) => product.category?.toUpperCase() === "SUSTRATOS"
        );
        setProducts(filtrados);
      })
      .catch((err) => console.error("Error al cargar productos:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
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
      {loading ? (
        <p>Cargando productos...</p>
      ) : products.length > 0 ? (
        products.map((product) => (
          <ProductCardBuy key={product._id} product={product} />
        ))
      ) : (
        <p>No hay productos de esta categoría.</p>
      )}
    </Box>
  );
};

export default Sustratos;
