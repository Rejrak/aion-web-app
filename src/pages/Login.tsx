import React, { useEffect, useReducer } from "react";
import { Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getUserById, logoutUser } from "../services/firebaseAuth";
import { hashPassword, verifyPassword } from "../utils/CryptoUtils";
import { useUser } from "../context/userContext";
import EmailInput from "../components/LoginComponents/EmailInput";
import AdminCheckbox from "../components/LoginComponents/AdminCheckbox";
import PasswordInput from "../components/LoginComponents/PasswordInput";
import ErrorAlert from "../components/LoginComponents/ErrorAlert";
import LoginButtons from "../components/LoginComponents/LoginButtons";

// Definizione dello stato iniziale
interface State {
  email: string;
  password: string;
  isAdmin: boolean;
  showPassword: boolean;
  error: string | null;
}

const initialState: State = {
  email: "",
  password: "",
  isAdmin: false,
  showPassword: false,
  error: null,
};

const reducer = (state: State, action: { type: string; payload?: any }) => {
  switch (action.type) {
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "SET_PASSWORD":
      return { ...state, password: action.payload };
    case "TOGGLE_ADMIN":
      return { ...state, isAdmin: !state.isAdmin };
    case "TOGGLE_PASSWORD_VISIBILITY":
      return { ...state, showPassword: !state.showPassword };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { loginUserContext, logoutUserContext } = useUser();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (state.error) {
      const timer = setTimeout(() => dispatch({ type: "CLEAR_ERROR" }), 3000);
      return () => clearTimeout(timer);
    }
  }, [state.error]);

  const handleSignIn = async () => {
    dispatch({ type: "CLEAR_ERROR" });

    if (!state.email) {
      dispatch({ type: "SET_ERROR", payload: "La mail è obbligatoria." });
      return;
    }
    if (state.isAdmin && !state.password) {
      dispatch({
        type: "SET_ERROR",
        payload: "La password è obbligatoria per gli amministratori.",
      });
      return;
    }

    try {
      const userLogged = await getUserById(state.email);
      if (!userLogged) {
        dispatch({ type: "SET_ERROR", payload: "Utente non trovato." });
        return;
      }

      if (state.isAdmin && !userLogged.admin) {
        dispatch({ type: "SET_ERROR", payload: "Non sei un amministratore." });
        return;
      }

      if (state.isAdmin) {
        const hashedPassword = hashPassword(state.password);
        if (!verifyPassword(userLogged.password, hashedPassword)) {
          dispatch({ type: "SET_ERROR", payload: "Credenziali errate." });
          return;
        }
      }

      loginUserContext(userLogged);
      navigate("/");
    } catch (error) {
      dispatch({
        type: "SET_ERROR",
        payload: "Errore durante il login. Verifica le credenziali.",
      });
    }
  };

  const handleLogout = async () => {
    logoutUserContext();
    await logoutUser();
  };

  return (
    <Container maxWidth="xs">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 8, textAlign: "center", backgroundColor: "#1B1E1F", color: "#fff" }}>
        <Typography variant="h5" sx={{ marginBottom: 3 }}>Gestione Autenticazione</Typography>
        
        <EmailInput value={state.email} onChange={(value) => dispatch({ type: "SET_EMAIL", payload: value })} />
        <AdminCheckbox checked={state.isAdmin} onChange={() => dispatch({ type: "TOGGLE_ADMIN" })} />

        {state.isAdmin && (
          <PasswordInput
            value={state.password}
            showPassword={state.showPassword}
            onChange={(value) => dispatch({ type: "SET_PASSWORD", payload: value })}
            toggleVisibility={() => dispatch({ type: "TOGGLE_PASSWORD_VISIBILITY" })}
          />
        )}

        <ErrorAlert error={state.error} />
        <LoginButtons onLogin={handleSignIn} onLogout={handleLogout} />
      </Paper>
    </Container>
  );
};

export default LoginForm;
