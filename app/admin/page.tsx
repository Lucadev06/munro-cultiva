"use client";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Alert,
  MenuItem,
  Select,
} from "@mui/material";

import ProductCard from "./components/ProductCard";

export interface IProduct {
  _id?: string;
  name: string;
  price: number;
  quantity?: number;
  description?: string;
  images?: string[];
  category?: string;
}

export default function AdminPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [files, setFiles] = useState<FileList | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Obtener productos
  useEffect(() => {
    fetch("/admin/api/products")
      .then((res) => res.json())
      .then((data: IProduct[]) => setProducts(data));
  }, []);

  // Guardar producto
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    // Validación imágenes
    if (!files || files.length === 0) {
      setError("Debe subir al menos una imagen.");
      return;
    }
    if (files.length > 3) {
      setError("Solo puede subir hasta 3 imágenes.");
      return;
    }

    // Subida de imágenes
    let imageUrls: string[] = [];
    const formData = new FormData();
    Array.from(files).forEach((f) => formData.append("file", f));
    const res = await fetch("/admin/api/products/upload", { method: "POST", body: formData });
    const data = await res.json();
    imageUrls = data.urls;

    // Guardar producto
    console.log("Category value before sending:", category);
    const productData = {
      name,
      price: Number(price),
      quantity: Number(quantity),
      description,
      category,
      images: imageUrls,
    };
    console.log("Sending product data (JSON stringified):");
    console.log(JSON.stringify(productData));
    await fetch("/admin/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(productData),
    });

    // Resetear campos
    setName("");
    setPrice("");
    setQuantity("");
    setDescription("");
    setCategory("");
    setFiles(null);

    // Actualizar lista
    const updated = await fetch("/admin/api/products").then((r) => r.json());
    setProducts((prevProducts: IProduct[]) => updated);
  };

  const handleEditProduct = async (updatedProduct: IProduct) => {
    try {
      console.log("Sending updated product data (PUT):");
      console.log(JSON.stringify(updatedProduct));
      const res = await fetch(`/admin/api/products/${updatedProduct._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });
      if (!res.ok) throw new Error("Failed to update product");
      const updated = await fetch("/admin/api/products").then((r) => r.json());
      setProducts((prevProducts: IProduct[]) => updated);
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Error al actualizar el producto.");
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    try {
      const res = await fetch(`/admin/api/products/${productId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete product");
      const updated = await fetch("/admin/api/products").then((r) => r.json());
      setProducts((prevProducts: IProduct[]) => updated);
    } catch (error) {
      console.error("Error deleting product:", error);
      setError("Error al eliminar el producto.");
    }
  };

  return (
    <Box
      sx={{
        maxWidth: "1000px",
        mx: "auto",
        p: { xs: 2, sm: 4 },
        fontFamily: "Roboto, sans-serif",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        sx={{ fontWeight: "bold", mb: 3, color: "#00FF7F" }}
      >
        Panel de Administración
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: "#111",
          color: "white",
          borderRadius: 2,
          p: 3,
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          mb: 4,
        }}
      >
        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Nombre del producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          sx={{
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#00FF7F" },
              "&:hover fieldset": { borderColor: "#63D8F2" },
            },
          }}
        />

        <TextField
          label="Precio"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          fullWidth
          sx={{
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#00FF7F" },
              "&:hover fieldset": { borderColor: "#63D8F2" },
            },
          }}
        />

        <TextField
          label="Cantidad"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          required
          fullWidth
          sx={{
            input: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#00FF7F" },
              "&:hover fieldset": { borderColor: "#63D8F2" },
            },
          }}
        />

        <TextField
          label="Descripción"
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Breve descripción del producto..."
          fullWidth
          sx={{
            textarea: { color: "white" },
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#00FF7F" },
              "&:hover fieldset": { borderColor: "#63D8F2" },
            },
          }}
        />

        <TextField
          select
          label="Categoría"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          fullWidth
          required
          sx={{
            "& .MuiOutlinedInput-root": {
              "& fieldset": { borderColor: "#00FF7F" },
              "&:hover fieldset": { borderColor: "#63D8F2" },
            },
            "& .MuiSelect-select": { color: "white" },
            "& .MuiInputLabel-root": { color: "#00FF7F" },
          }}
        >
          {[
            "GROWSHOP",
            "SUSTRATOS",
            "FERTILIZANTES",
            "MEDICIÓN",
            "MACETAS",
            "ESQUEJES",
            "CONTROL DE PLAGAS",
            "RIEGO",
            "INDOOR",
            "HIDROPONIA",
            "PARAFERNALIA",
            "SEMILLAS",
            "COMBOS",
          ].map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="outlined"
          component="label"
          sx={{
            color: "#00FF7F",
            borderColor: "#00FF7F",
            "&:hover": { borderColor: "#63D8F2", color: "#63D8F2" },
          }}
        >
          Subir imágenes (máx. 3)
          <input
            type="file"
            hidden
            accept="image/*"
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />
        </Button>

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#00FF7F",
            color: "#000",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#63D8F2" },
          }}
        >
          Guardar producto
        </Button>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2, color: "#00FF7F" }}>
        Productos cargados
      </Typography>

      <Grid container spacing={2}>
        {products.map((p) => (
          <Grid item xs={12} sm={6} md={4} key={p._id}>
            <ProductCard
              key={p._id}
              product={p}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
