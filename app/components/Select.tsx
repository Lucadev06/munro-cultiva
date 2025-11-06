"use client";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, Select, MenuItem, CircularProgress } from "@mui/material";

interface Option {
  id: string;
  nombre: string;
}

interface SelectComponentProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  endpoint: string; // URL a la API (provincias o localidades)
  disabled?: boolean;
}

export default function SelectComponent({
  label,
  value,
  onChange,
  endpoint,
  disabled = false,
}: SelectComponentProps) {
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await fetch(endpoint);
        const data = await res.json();

        if (data.provincias) setOptions(data.provincias);
        else if (data.localidades) setOptions(data.localidades);
      } catch (err) {
        console.error(`Error al cargar ${label}:`, err);
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, [endpoint]);

  return (
    <FormControl fullWidth size="small" disabled={disabled || loading}>
      <InputLabel>{label}</InputLabel>
      {loading ? (
        <CircularProgress size={24} sx={{ mx: "auto", mt: 1 }} />
      ) : (
        <Select
          value={value}
          label={label}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((opt) => (
            <MenuItem key={opt.id} value={opt.nombre}>
              {opt.nombre}
            </MenuItem>
          ))}
        </Select>
      )}
    </FormControl>
  );
}
