"use client";
import { useState, ChangeEvent, useEffect } from "react";
import { TextField } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface Props {
  id: string;
  label: string;
  required?: boolean;
  type?: "text" | "number";
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  maxLength?: number;
}

export const TextFormInput = ({
  id,
  label,
  required = false,
  type = "text",
  value = "",
  onChange,
  maxLength,
}: Props) => {
  const [inputValue, setInputValue] = useState(value);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  const validateInput = (val: string) => {
    if (required && !val.trim()) return "Campo obligatorio";

    // Validación nombre/apellido: solo letras
    if ((id === "nombre" || id === "apellido") && !/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(val))
      return "Solo letras válidas";

    // Validación DNI (solo números, 7-8 dígitos)
    if (id === "dni" && !/^\d{7,8}$/.test(val))
      return "DNI inválido";

    // Validación CUIT (11 dígitos)
    if (id === "cuit" && !/^\d{11}$/.test(val))
      return "CUIT inválido";

    return null;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    // si es numérico (dni o cuit), solo dígitos
    if (type === "number" || id === "dni" || id === "cuit") {
      newValue = newValue.replace(/\D/g, "");
      if (maxLength && newValue.length > maxLength)
        newValue = newValue.slice(0, maxLength);
    }

    setInputValue(newValue);
    onChange?.(e);
  };

  const handleBlur = () => {
    setTouched(true);
    setError(validateInput(inputValue));
  };

  return (
    <TextField
      id={id}
      label={label}
      variant="outlined"
      size="small"
      required={required}
      value={inputValue}
      type={type}
      error={!!error && touched}
      helperText={
        touched && error && (
          <span style={{ display: "flex", alignItems: "center", gap: ".4rem" }}>
            <ErrorOutlineIcon sx={{ fontSize: "14px" }} /> {error}
          </span>
        )
      }
      onChange={handleChange}
      onBlur={handleBlur}
      inputProps={{
        maxLength,
        inputMode: id === "dni" || id === "cuit" ? "numeric" : "text",
      }}
      sx={{
        width: "100%",
        marginBottom: "1rem",
        input: { "&::placeholder": { color: "#666" } },
      }}
    />
  );
};
