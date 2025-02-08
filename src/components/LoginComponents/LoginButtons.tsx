import React from "react";
import { Button, Box } from "@mui/material";

interface Props {
  onLogin: () => void;
  onLogout: () => void;
}

const LoginButtons: React.FC<Props> = ({ onLogin, onLogout }) => {
  return (
    <Box>
      <Button
        variant="contained"
        fullWidth
        onClick={onLogin}
        sx={{
          backgroundColor: "#007bff",
          marginBottom: 2,
          "&:hover": { backgroundColor: "#0056b3" },
        }}
      >
        Accedi
      </Button>

      <Button
        variant="contained"
        fullWidth
        onClick={onLogout}
        sx={{
          backgroundColor: "#dc3545",
          "&:hover": { backgroundColor: "#a71d2a" },
        }}
      >
        Esci
      </Button>
    </Box>
  );
};

export default LoginButtons;
