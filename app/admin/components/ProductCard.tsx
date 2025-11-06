"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  TextField,
  Button,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { IProduct } from "../../types/Product";

interface ProductCardProps {
  product: IProduct;
  onEdit: (product: IProduct) => void;
  onDelete: (productId: string) => void;
}

export default function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedProduct, setEditedProduct] = useState<IProduct>({
    ...product,
    name: product.name ?? '',
    price: product.price ?? 0,
    quantity: product.quantity ?? 0,
    description: product.description ?? '',
    category: product.category ?? '',
    images: product.images ?? [],
  });
  const [files, setFiles] = useState<FileList | null>(null);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleDelete = () => {
    if (product._id) {
      onDelete(product._id);
    }
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedProduct((prev: IProduct) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = async () => {
    const productToUpdate = { ...editedProduct };

    if (files && files.length > 0) {
      const formData = new FormData();
      Array.from(files).forEach((f) => formData.append("file", f));
      const res = await fetch("/admin/api/products/upload", { method: "POST", body: formData });
      const data = await res.json();
      productToUpdate.images = data.urls;
    }

    onEdit(productToUpdate);
    handleModalClose();
  };

  return (
    <>
      <Card
        sx={{
          backgroundColor: "#0B0B0B",
          color: "white",
          border: "1px solid #222",
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
          position: "relative",
          "&:hover .product-actions": {
            opacity: 1,
          },
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
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
            {product.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "#aaa", mb: 1 }}>
            ${product.price}
          </Typography>
          <Typography variant="body2" sx={{ color: "#aaa", mb: 1 }}>
            Stock: {product.quantity}
          </Typography>
          <Typography variant="body2" sx={{ color: "#63D8F2", mb: 1 }}>
            Categoría: {product.category}
          </Typography>
        
        </CardContent>
        <Box
          className="product-actions"
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            display: "flex",
            gap: 1,
            opacity: 0,
            transition: "opacity 0.2s",
          }}
        >
          <IconButton
            aria-label="edit"
            onClick={handleEdit}
            sx={{ color: "white" }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={handleDelete}
            sx={{ color: "white" }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Card>

      <Modal open={isEditModalOpen} onClose={handleModalClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2">
            Editar Producto
          </Typography>
          <TextField
            label="Nombre"
            name="name"
            value={editedProduct.name ?? ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Precio"
            name="price"
            type="number"
            value={editedProduct.price ?? ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Cantidad"
            name="quantity"
            type="number"
            value={editedProduct.quantity ?? ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descripción"
            name="description"
            value={editedProduct.description ?? ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />
          <TextField
            select
            label="Categoría"
            name="category"
            value={editedProduct.category ?? ''}
            onChange={handleInputChange}
            fullWidth
            margin="normal"
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
            fullWidth
            sx={{ mt: 2, mb: 1 }}
          >
            Cambiar imágenes (máx. 3)
            <input
              type="file"
              hidden
              accept="image/*"
              multiple
              onChange={(e) => setFiles(e.target.files)}
            />
          </Button>
          {editedProduct.images && editedProduct.images.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              fullWidth
              onClick={() => setEditedProduct((prev) => ({ ...prev, images: [] }))}
              sx={{ mb: 2 }}
            >
              Eliminar Imágenes
            </Button>
          )}
          <Button onClick={handleSaveChanges} variant="contained">
            Guardar Cambios
          </Button>
        </Box>
      </Modal>
    </>
  );
}
