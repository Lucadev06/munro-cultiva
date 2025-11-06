"use client";
import { useRouter } from "next/navigation";
import { useCart } from "../context/CartContext";
import {
  Box,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
  CardMedia,
} from "@mui/material";
import { ArrowUpward, ArrowDownward, Delete } from "@mui/icons-material";

export default function CartModal() {
  const { cart, total, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const router = useRouter();

  const handleGoToCheckout = () => {
    router.push("/checkout");
  };

  return (
    <Box sx={{ width: 350, p: 2, bgcolor: "background.paper", boxShadow: 24 }}>
      <Typography variant="h6" gutterBottom>
        Carrito de Compras
      </Typography>
      <Divider />
      {cart.length === 0 ? (
        <Typography sx={{ mt: 2 }}>Tu carrito está vacío.</Typography>
      ) : (
        <List>
          {cart.map((item) => (
            <ListItem key={item._id} disableGutters sx={{ display: "flex", alignItems: "center" }}>
              {item.images && item.images.length > 0 && (
                <CardMedia
                  component="img"
                  image={item.images[0]}
                  alt={item.name}
                  sx={{ width: 60, height: 60, mr: 2, objectFit: "cover", borderRadius: 1 }}
                />
              )}
              <ListItemText primary={item.name} secondary={`$${item.price}`} />
              <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                <IconButton size="small" onClick={() => decreaseQuantity(item._id!)}>
                  <ArrowDownward fontSize="inherit" />
                </IconButton>
                <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                <IconButton size="small" onClick={() => increaseQuantity(item._id!)}>
                  <ArrowUpward fontSize="inherit" />
                </IconButton>
                <IconButton size="small" onClick={() => removeFromCart(item._id!)} sx={{ ml: 1 }}>
                  <Delete fontSize="inherit" />
                </IconButton>
              </Box>
            </ListItem>
          ))}
          <Divider sx={{ my: 2 }} />
          <ListItem disableGutters>
            <ListItemText primary="Total" />
            <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
              ${total.toFixed(2)}
            </Typography>
          </ListItem>
        </List>
      )}
      <Button
        variant="contained"
        fullWidth
        sx={{
          mt: 2,
          backgroundColor: "#F25EA3",
          "&:hover": { backgroundColor: "#d14b89" },
        }}
        onClick={handleGoToCheckout}
        disabled={cart.length === 0}
      >
        Iniciar Compra
      </Button>
    </Box>
  );
}
