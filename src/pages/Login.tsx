import React, { useState } from "react";
import {
  Box,
  TextField,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Container,
  Paper,
  Alert,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { getUserById, logoutUser } from "../services/firebaseAuth";
import { hashPassword, verifyPassword } from "../utils/CryptoUtils";
import { useUser } from "../context/userContext";
import { User } from "../interfaces/User";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginUserContext, logoutUserContext, user } = useUser();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const checkRequiredCredential = (): boolean => {
    if (!email) {
      setError("La mail è obbligatoria.");
      return false;
    }
    if (isAdmin && !password) {
      setError("La password è obbligatoria per gli amministratori.");
      return false;
    }
    return true;
  };

  const checkAdminPassword = (userPassword: string): boolean => {
    const hashedPassword = hashPassword(password);
    if (!verifyPassword(userPassword, hashedPassword)) {
      setError("Credenziali errate.");
      return false;
    }
    return true;
  };

  const checkUserRoleCredential = (userLogged: User): boolean => {
    if (!userLogged) {
      setError("Utente non trovato.");
      return false;
    }
    if (isAdmin && !userLogged.admin) {
      setError("Non sei un amministratore.");
      return false;
    }
    if (password === "" && userLogged.admin) {
      setError("Spunta la checkbox amministratore ed inserisci la password.");
      return false;
    }
    return true;
  };

  const handleSignIn = async () => {
    setError(null);

    if (!checkRequiredCredential()) return;

    try {
      const userLogged = await getUserById(email);
      const isStandardUser = !isAdmin && !userLogged.admin;

      if (isStandardUser) {
        loginUserContext(userLogged);
        navigate("/");
        return true;
      }

      if (!checkUserRoleCredential(userLogged)) return;
      if (!checkAdminPassword(userLogged.password)) return;
      if (userLogged !== null) {
        loginUserContext(userLogged);
      }
    } catch (error) {
      setError("Errore durante il login. Verifica le credenziali.");
    }

    navigate("/");
  };

  const handleLogout = async () => {
    logoutUserContext();
    await logoutUser();
  };

  return (
    <Container maxWidth="xs">
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          marginTop: 8,
          textAlign: "center",
          backgroundColor: "#1B1E1F",
          color: "#fff",
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: 3 }}>
          Gestione Autenticazione
        </Typography>

        <TextField
          fullWidth
          label="Nome utente"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          sx={{
            marginBottom: 2,
            "& .MuiOutlinedInput-root": {
              backgroundColor: "#121212",
              color: "#fff",
            },
          }}
          InputLabelProps={{
            style: { color: "#aaa" },
          }}
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              sx={{
                color: "#aaa",
                "&.Mui-checked": { color: "#007bff" },
              }}
            />
          }
          label="Sono un amministratore"
          sx={{ marginBottom: 2 }}
        />

        {isAdmin && (
          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            sx={{
              marginBottom: 2,
              "& .MuiOutlinedInput-root": {
                backgroundColor: "#121212",
                color: "#fff",
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    <FontAwesomeIcon
                      icon={showPassword ? faEyeSlash : faEye}
                      style={{ color: "#aaa" }}
                    />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            InputLabelProps={{
              style: { color: "#aaa" },
            }}
          />
        )}

        {error && (
          <Alert severity="error" sx={{ marginBottom: 2 }}>
            {error}
          </Alert>
        )}

        <Button
          variant="contained"
          fullWidth
          onClick={handleSignIn}
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
          onClick={handleLogout}
          sx={{
            backgroundColor: "#dc3545",
            "&:hover": { backgroundColor: "#a71d2a" },
          }}
        >
          Esci
        </Button>
      </Paper>
    </Container>
  );
};

export default LoginPage;
