"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  IconButton,
  TextField,
  Typography,
  Link as MuiLink,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import CartModal from "./CartModal";
import { useSession, signIn, signOut } from "next-auth/react";
import { Popover, Avatar, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import Image from "next/image";
import {usePathname} from "next/navigation";

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const { data: session } = useSession();
  const [anchorCarrito, setAnchorCarrito] = useState<HTMLElement | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:960px)");
  const isSmall = useMediaQuery("(max-width:600px)");
  const router = useRouter();
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin"); // detecta si estás en admin

  const handleRedirect = (ruta: string) => {
    setDrawerOpen(false);
    router.push(ruta);
  };

  const rutas: Record<string, string> = {
    GROWSHOP: "/growshop",
    SUSTRATOS: "/sustratos",
    FERTILIZANTES: "/fertilizantes",
    MEDICIÓN: "/medicion",
    MACETAS: "/macetas",
    ESQUEJES: "/esquejes",
    "CONTROL DE PLAGAS": "/control-de-plagas",
    RIEGO: "/riego",
    INDOOR: "/indoor",
    HIDROPONIA: "/hidroponia",
    PARAFERNALIA: "/paraf",
    SEMILLAS: "/semillas",
    COMBOS: "/combos",
    NOSOTROS: "/nosotros",
  };

  const secciones = Object.keys(rutas);

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    if (session) {
      setAnchorEl(event.currentTarget);
    } else {
      signIn("google");
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#000",
        borderBottom: "2px solid #00FF7F",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        boxShadow: "0 2px 10px rgba(0,0,0,0.7)",
      }}
    >
      {isAdmin? (
        <Box
              sx={{
                position: "relative",
                width: { xs: 120, sm: 180, md: 220 },
                height: { xs: 60, sm: 90, md: 120 },
                cursor: "pointer",
              }}
              onClick={() => handleRedirect("/")}
            >
              <Image src="/LOGO-16.png" alt="Munro Cultiva" fill style={{ objectFit: "contain" }} />
            </Box>
      ): (
        
      <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isMobile ? "0.6rem 1rem" : "0.8rem 2rem",
          gap: 2,
        }}
      >
        {/* Izquierda */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {isMobile ? (
            <IconButton onClick={() => setDrawerOpen(true)} sx={{ color: "#00FF7F" }}>
              <MenuIcon fontSize="large" />
            </IconButton>
          ) : (
            <Box
              sx={{
                position: "relative",
                width: { xs: 120, sm: 180, md: 220 },
                height: { xs: 60, sm: 90, md: 120 },
                cursor: "pointer",
              }}
              onClick={() => handleRedirect("/")}
            >
              <Image src="/LOGO-16.png" alt="Munro Cultiva" fill style={{ objectFit: "contain" }} />
            </Box>
          )}
        </Box>

        {/* Centro */}
        <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
          {isMobile ? (
            <Box
              sx={{
                position: "relative",
                width: { xs: 150, sm: 150 },
                height: { xs: 80, sm: 75 },
                cursor: "pointer",
              }}
              onClick={() => handleRedirect("/")}
            >
              <Image src="/LOGO-16.png" alt="Munro Cultiva" fill style={{ objectFit: "contain" }} />
            </Box>
          ) : (
            <TextField
              placeholder="¿Qué estás buscando?"
              variant="outlined"
              size="small"
              sx={{
                width: "70%",
                backgroundColor: "#111",
                borderRadius: "6px",
                input: { color: "#00FF7F" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#00FF7F" },
                  "&:hover fieldset": { borderColor: "#63D8F2" },
                  "&.Mui-focused fieldset": { borderColor: "#63D8F2" },
                },
                "& input::placeholder": { color: "#888" },
              }}
            />
          )}
        </Box>

        {/* Derecha: íconos */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: isSmall ? 0.5 : isMobile ? 1 : 2,
            minWidth: isSmall ? "auto" : 120,
          }}
        >
         
          <IconButton disableRipple sx={{ color: "white" }} onClick={handleProfileClick}>
            {session ? (
              <Avatar src={session.user?.image || undefined} />
            ) : (
              <PersonIcon fontSize="large" />
            )}
          </IconButton>
          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Button onClick={() => signOut()}>Cerrar sesión</Button>
          </Popover>

          {/* Carrito */}
          <Box>
            <IconButton disableRipple sx={{ color: "white" }} onClick={(e) => setAnchorCarrito(e.currentTarget)}>
              <ShoppingCartIcon fontSize="large" />
            </IconButton>
          </Box>

          <Popover
            open={Boolean(anchorCarrito)}
            anchorEl={anchorCarrito}
            onClose={() => setAnchorCarrito(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            disableRestoreFocus
          >
            <CartModal />
          </Popover>
        </Box>
      </Box>

    
      {isMobile && (
        <Box sx={{ width: "100%", px: 2, mb: 1 }}>
          <TextField
            placeholder="¿Qué estás buscando?"
            variant="outlined"
            size="small"
            fullWidth
            sx={{
              backgroundColor: "#111",
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#00FF7F" },
                "&:hover fieldset": { borderColor: "#63D8F2" },
                "&.Mui-focused fieldset": { borderColor: "#63D8F2" },
              },
              "& input::placeholder": { color: "#888" },
            }}
          />
        </Box>
      )}

      {/* Secciones desktop */}
      {!isMobile && (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            gap: 3,
            flexWrap: "wrap",
            py: 1,
            backgroundColor: "#0B0B0B",
            borderTop: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {secciones.map((sec) => (
            <Typography
              key={sec}
              onClick={() => handleRedirect(rutas[sec] || "/")}
              sx={{
                color: "white",
                fontSize: "0.9rem",
                cursor: "pointer",
                fontWeight: "bold",
                "&:hover": { color: "#00FF7F" },
              }}
            >
              {sec}
            </Typography>
          ))}
        </Box>
      )}

      {/* Drawer lateral */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#111",
            color: "#fff",
            width: "75%",
            p: 1,
          },
        }}
      >
        <List>
          {secciones.map((sec) => (
            <ListItem key={sec} disablePadding>
              <ListItemButton
                onClick={() => handleRedirect(rutas[sec] || "/")}
                sx={{
                  "&:hover": { backgroundColor: "#222" },
                  transition: "background-color 0.2s ease-in-out",
                }}
              >
                <ListItemText
                  primary={sec}
                  primaryTypographyProps={{
                    color: "#00FF7F",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      </>
            )}

    </Box>
  );
};

export default Navbar;
