"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Box, Typography, Button, Card, CardMedia, Grid } from "@mui/material";
import { useCart } from "../../context/CartContext";
import { IProduct } from "../../types/Product";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<IProduct | null>(null);
  const [selectedImage, setSelectedImage] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      fetch(`/admin/api/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          if (data.images && data.images.length > 0) {
            setSelectedImage(data.images[0]);
          }
        })
        .catch((err) => {
          console.error("Error fetching product:", err);
          setProduct(null); // Ensure product is null on error
        });
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      alert(`"${product.name}" agregado al carrito 🛒`);
    }
  };

  if (!product) {
    return <Typography>Producto no encontrado</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={4}>
        <Grid sx={{ xs: 12, md: 6 }}>
          <Card>
            <CardMedia
              component="img"
              image={selectedImage}
              alt={product.name}
              sx={{ height: 400, objectFit: "contain" }}
            />
          </Card>
          <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
            {product.images?.map((image, index) => (
              <Card key={index} onClick={() => setSelectedImage(image)} sx={{ cursor: "pointer" }}>
                <CardMedia
                  component="img"
                  image={image}
                  alt={`${product.name} - thumbnail ${index}`}
                  sx={{ height: 80, width: 80, objectFit: "cover" }}
                />
              </Card>
            ))}
          </Box>
        </Grid>
        <Grid sx={{ xs: 12, md: 6 }}>
          <Typography variant="h4" gutterBottom>
            {product.name}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            ${product.price}
          </Typography>
          <Typography variant="body1" sx={{ my: 2 }}>
            {product.description}
          </Typography>
          <Button
            variant="contained"
            onClick={handleAddToCart}
            sx={{
              backgroundColor: "#F25EA3",
              "&:hover": { backgroundColor: "#d14b89" },
            }}
          >
            Agregar al carrito
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
