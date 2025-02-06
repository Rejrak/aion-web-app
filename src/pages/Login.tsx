import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { getUserById, logoutUser } from "../services/firebaseAuth";
import { hashPassword, verifyPassword } from "../utils/CryptoUtils";
import { useUser } from "../context/userContext";
import { User } from "../interfaces/User";
import Card from "../components/LoginComponents/CardContainer";
import FormContainer from "../components/LoginComponents/FormContainer";
import InputEmail from "../components/LoginComponents/InputEmail";
import InputPassword from "../components/LoginComponents/InputPassword";
import Checkbox from "../components/LoginComponents/AdminCheckBox";
import Button from "../components/LoginComponents/ButtonForm";
import { CustomThemeProvider } from "../context/ThemeContext";

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { loginUserContext, logoutUserContext } = useUser();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const checkRequiredCredential = useMemo(() => {
    return (): boolean => {
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
  }, [email, password, isAdmin]);

  const checkAdminPassword = useMemo(() => {
    return (userPassword: string): boolean => {
      const hashedPassword = hashPassword(password);
      if (!verifyPassword(userPassword, hashedPassword)) {
        setError("Credenziali errate.");
        return false;
      }
      return true;
    };
  }, [password]);

  const checkUserRoleCredential = useMemo(() => {
    return (userLogged: User): boolean => {
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
  }, [isAdmin, password]);

  const handleSignIn = async () => {
    setError(null);

    if (!checkRequiredCredential()) return;

    try {
      const userLogged = await getUserById(email);
      const isStandardUser = !isAdmin && !userLogged.admin;

      if (isStandardUser) {
        loginUserContext(userLogged);
        navigate("/");
        return;
      }

      if (!checkUserRoleCredential(userLogged)) return;
      if (!checkAdminPassword(userLogged.password)) return;

      loginUserContext(userLogged);
      navigate("/");
    } catch (error) {
      setError("Errore durante il login. Verifica le credenziali.");
    }
  };

  const handleLogout = async () => {
    logoutUserContext();
    await logoutUser();
  };

  const memoizedEmailInput = useMemo(
    () => <InputEmail value={email} onChange={setEmail} />,
    [email]
  );

  const memoizedCheckbox = useMemo(
    () => <Checkbox checked={isAdmin} onChange={setIsAdmin} />,
    [isAdmin]
  );

  const memoizedPasswordInput = useMemo(() => {
    return isAdmin ? <InputPassword value={password} onChange={setPassword} /> : null;
  }, [isAdmin, password]);

  return (
    <CustomThemeProvider>
      <Card>
        <FormContainer title="Gestione Autenticazione">
          {memoizedEmailInput}
          {memoizedCheckbox}
          {memoizedPasswordInput}

          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

          <Button primary onClick={handleSignIn}>Accedi</Button>
          <Button primary={false} onClick={handleLogout}>Esci</Button>
        </FormContainer>
      </Card>
    </CustomThemeProvider>
  );
};

export default AuthPage;
