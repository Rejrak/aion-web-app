import React from "react";
import { TextField, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

interface Props {
    value: string;
    showPassword: boolean;
    onChange: (value: string) => void;
    toggleVisibility: () => void;
}

const PasswordInput: React.FC<Props> = ({ value, showPassword, onChange, toggleVisibility }) => (
    <TextField
        fullWidth
        label="Password"
        type={showPassword ? "text" : "password"}
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
            inputLabel:{ style: { color: "#aaa" } },
            input: {
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton onClick={toggleVisibility}>{showPassword ? <VisibilityOff /> : <Visibility />}</IconButton>
                    </InputAdornment>
                )
            }
        }}
    />
);

export default PasswordInput;
