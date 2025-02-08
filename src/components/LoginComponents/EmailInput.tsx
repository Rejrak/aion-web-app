import React from "react";
import { InputLabel, TextField } from "@mui/material";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const EmailInput: React.FC<Props> = ({ value, onChange }) => (
  <TextField
    fullWidth
    label="Nome utente"
    variant="outlined"
    value={value}
    onChange={(e) => onChange(e.target.value)}
    required
    sx={{
      marginBottom: 2,
      "& .MuiOutlinedInput-root": {
        backgroundColor: "#121212",
        color: "#fff",
      },
    }}
    slotProps={{
        inputLabel:{ style: { color: "#aaa" } }
    }}
  />
);

export default EmailInput;
