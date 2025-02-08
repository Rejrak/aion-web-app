import React from "react";
import { Alert } from "@mui/material";

interface Props {
  error: string | null;
}

const ErrorAlert: React.FC<Props> = ({ error }) => {
  if (!error) return null;

  return (
    <Alert severity="error" sx={{ marginBottom: 2 }}>
      {error}
    </Alert>
  );
};

export default ErrorAlert;
